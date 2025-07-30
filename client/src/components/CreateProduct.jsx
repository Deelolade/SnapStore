import React from 'react'

const CreateProduct = () => {
  return (
    <>
      <main className=" w-[85%] px-8 h-screen py-10 max-h-screen overflow-y-auto ">
        <h1 className='text-4xl font-semibold'>Create Product</h1>
        <section className='mt-6 '>
        <form className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto flex flex-col gap-6">
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="title">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue"
              placeholder="Enter product title"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue"
              placeholder="Enter product category"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg font-medium mb-2" htmlFor="price">Price<span className="text-red-500">*</span></label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue"
                placeholder="0.00"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium mb-2" htmlFor="discountedPrice">Discounted Price</label>
              <input
                // {...register("discountedPrice", {
                //   valueAsNumber: true,
                // })}
                type="number"
                id="discountedPrice"
                name="discountedPrice"
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="image">Images</label>
            <input
              type="file"
              id="image"
              name="image"
              multiple
              accept="image/*"
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">You can upload multiple images.</p>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue hover:bg-blue/90 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create Product
          </button>
        </form>
        </section>
      </main>
    </>
  )
}

export default CreateProduct