import React from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { logOut } from '@/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useClerk } from '@clerk/clerk-react'




const LogOutModal = ({isOpen, onClose}) => {
  const { signOut } = useClerk()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut()
    onClose()
    dispatch(logOut())
    navigate("/")
  }
  return (
    <div>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/70 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/40 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl font-semibold text-white">
                Log Out?
              </DialogTitle>
              <p className="mt-2 text-lg/6 text-white">Are you sure you want to log out of your account?
              </p>
              <div className="mt-6 flex justify-end gap-3">
              <Button
                className="p-2 px-4 font-semibold rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-red hover:bg-red/90 p-2 px-4 font-semibold rounded-lg text-white cursor-progress"
                onClick={handleLogout}
              >
                Yes, Log out
              </Button>
            </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>

    </div>
  )
}

export default LogOutModal