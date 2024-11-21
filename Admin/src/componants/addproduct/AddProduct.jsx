import { useState } from 'react';
import upload_area from '../../assets/upload_area.svg'
import { useAddProductMutation } from '../../services/Product'

export const AddProduct = () => {
   const [formData, setFormData] = useState({
      name: '',
      old_price: '',
      new_price: '',
      category: 'men',
   });
   const [image, setImage] = useState(null);
   const [addProduct, { isLoading, isError, isSuccess, error }] = useAddProductMutation();

   const imageHandler = (e) => {
      setImage(e.target.files[0]);
   };

   if (isError) {
      console.log(error)
   }
   if (isSuccess) {
      console.log("The product is added succesfully")
   }
   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const submitHandler = async (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append('name', formData.name);
      data.append('old_price', formData.old_price);
      data.append('new_price', formData.new_price);
      data.append('category', formData.category);
      if (image) {
         data.append('productImage', image);
      }

      try {
         await addProduct(data).unwrap();
         // Reset the form
         setFormData({
            name: '',
            old_price: '',
            new_price: '',
            category: 'men',
         });
         setImage(null);

         // You can also show a success message here if needed
         console.log("The product is added successfully");
         // Handle success (e.g., show a success message or reset the form)
      } catch (error) {
         // Handle error (e.g., show an error message)
         console.error(error);
      }
   };

   return (
      <div className="container mx-auto bg-white w-full md:w-3/4 lg:w-1/2 mt-5 p-5 rounded-md">
         <form onSubmit={submitHandler}>
            <div className="w-full">
               <div className="mt-5">
                  <label>Product Title</label><br />
                  <input
                     className="outline-none p-2 border border-gray-200 w-full mt-2"
                     type="text"
                     placeholder="Enter title"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                  />
               </div>
               <div className="flex flex-col md:flex-row gap-6 mt-5">
                  <div className="flex-1">
                     <label>Price</label><br />
                     <input
                        className="outline-none p-2 border border-gray-200 w-full mt-2"
                        type="text"
                        placeholder="Enter price"
                        name="old_price"
                        value={formData.old_price}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="flex-1">
                     <label>Offer Price</label><br />
                     <input
                        className="outline-none p-2 border border-gray-200 w-full mt-2"
                        type="text"
                        placeholder="Enter offer price"
                        name="new_price"
                        value={formData.new_price}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className="mt-5">
                  <label htmlFor="category">Product Category</label><br />
                  <select
                     className="w-full px-2 py-2 border border-gray-200 mt-2"
                     name="category"
                     id="category"
                     value={formData.category}
                     onChange={handleChange}
                  >
                     <option value="men">Men</option>
                     <option value="women">Women</option>
                     <option value="kid">Kid</option>
                  </select>
               </div>
               <div className="mt-5">
                  <label htmlFor="file-input">
                     <img className='w-28' src={image ? URL.createObjectURL(image) : upload_area} alt="product_image" />
                  </label>
                  <input onChange={imageHandler} type="file" id='file-input' name="productImage" hidden />
               </div>
               <button
                  className="bg-blue-600 text-white px-8 py-2 rounded-md mt-5 w-full md:w-auto"
                  type="submit"
                  disabled={isLoading}
               >ADD
               </button>
            </div>
         </form>
      </div>
   );
}
