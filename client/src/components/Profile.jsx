import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { User, Mail, Camera, Store, Plus, Trash2, Save, Upload, Info } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { signInSuccess } from '../redux/user/userSlice'

// Yup validation schema based on user model
const profileSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  profilePicture: yup.mixed(),
  storeSlug: yup.string().required('Store address is required').min(3, 'Store address must be at least 3 characters'),
  socialMedia: yup.array().of(
    yup.object({
      platform: yup.string().oneOf(['whatsapp', 'instagram', 'facebook', 'twitter', 'linkedin'], 'Invalid platform').required('Platform is required'),
      url: yup.string().url('Must be a valid URL').required('URL is required')
    })
  )
})

const Profile = () => {
  const currentUser = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const { getToken } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const fileInputRef = useRef(null)

  console.log('Current user:', currentUser)
console.log("currentUser?.profilePicture", currentUser?.profilePicture)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      profilePicture: currentUser?.profilePicture ,
      storeSlug: currentUser?.storeSlug || '',
      socialMedia: currentUser?.socialMedia || []
    }
  })

  const watchedSocialMedia = watch('socialMedia')
  const watchedName = watch('name')

  // Update form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || '',
        email: currentUser.email || '',
        profilePicture: currentUser?.profilePicture || '',
        storeSlug: currentUser.storeSlug || '',
        socialMedia: currentUser.socialMedia || []
      })
      setImagePreview(currentUser.profilePicture)
    }
  }, [currentUser, reset])

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)

      // Set form value
      setValue('profilePicture', file)
    }
  }

  // Auto-generate store slug from name
  useEffect(() => {
    if (isEditing && watchedName) {
      const slug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')

      if (slug && slug !== watch('storeSlug')) {
        setValue('storeSlug', slug)
      }
    }
  }, [watchedName, isEditing, setValue, watch])

  // Add social media link
  const addSocialMedia = () => {
    const currentSocialMedia = watch('socialMedia')
    setValue('socialMedia', [...currentSocialMedia, { platform: 'whatsapp', url: '' }])
  }

  // Remove social media link
  const removeSocialMedia = (index) => {
    const currentSocialMedia = watch('socialMedia')
    const updatedSocialMedia = currentSocialMedia.filter((_, i) => i !== index)
    setValue('socialMedia', updatedSocialMedia)
  }

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      console.log('Profile data to update:', data)

      // Get authentication token
      const token = await getToken()
      if (!token) {
        throw new Error('Authentication token not available')
      }
      const formData = new FormData()
      formData.append('profilePicture', data.profilePicture)
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('storeSlug', data.storeSlug)
      formData.append('socialMedia', JSON.stringify(data.socialMedia))

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      )

      console.log('Profile update response:', response.data)

      // Update Redux store with new user data
      dispatch(signInSuccess(response.data.user))
      setSuccess('Profile updated successfully!')
      setIsEditing(false)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
      //   }

    } catch (error) {
      console.error('Error updating profile:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile'
      setError(errorMessage)

      // Clear error message after 5 seconds
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="w-[85%] px-8 h-screen py-10 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className='text-4xl font-bold text-gray-900'>Profile Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Picture Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative group">
                  <div className="relative">
                    <img
                      src={imagePreview || currentUser?.profilePicture || 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg group-hover:border-blue-300 transition-all duration-200"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Profile Picture</h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </button>
                      <p className="text-sm text-gray-500">
                        Click on the image or button above to upload a new profile picture
                      </p>
                      {errors.profilePicture && (
                        <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600">Your profile picture is displayed to customers</p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <User className="inline w-4 h-4 mr-2 text-blue-600" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{watch('name')}</p>
                  )}
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="inline w-4 h-4 mr-2 text-blue-600" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{watch('email')}</p>
                  )}
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Store Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Store className="inline w-4 h-4 mr-2 text-blue-600" />
                    Store Address
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        {...register('storeSlug')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="your-store-name"
                      />
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <Info className="w-4 h-4 mr-1" />
                        This will be your store's web address (e.g., snapStore.com/store-name)
                      </p>
                    </div>
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{watch('storeSlug')}</p>
                  )}
                  {errors.storeSlug && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      {errors.storeSlug.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Social Media Links</h3>
                  <p className="text-gray-600 mt-1">Connect your social media accounts</p>
                </div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={addSocialMedia}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </button>
                )}
              </div>

              {(!watchedSocialMedia || watchedSocialMedia.length === 0) ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No social media links added yet</p>
                  {isEditing && (
                    <p className="text-sm text-gray-400 mt-1">Click "Add Link" to get started</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {watchedSocialMedia.map((social, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      {isEditing ? (
                        <>
                          <select
                            {...register(`socialMedia.${index}.platform`)}
                            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          >
                            <option value="whatsapp">WhatsApp</option>
                            <option value="instagram">Instagram</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter</option>
                            <option value="linkedin">LinkedIn</option>
                          </select>
                          <input
                            type="url"
                            {...register(`socialMedia.${index}.url`)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="https://example.com/your-profile"
                          />
                          <button
                            type="button"
                            onClick={() => removeSocialMedia(index)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-semibold capitalize">
                            {social.platform}
                          </span>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-blue-600 hover:underline font-medium"
                          >
                            {social.url}
                          </a>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {errors.socialMedia && (
                <p className="text-red-500 text-sm mt-3 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  {errors.socialMedia.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isLoading ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  )
}

export default Profile