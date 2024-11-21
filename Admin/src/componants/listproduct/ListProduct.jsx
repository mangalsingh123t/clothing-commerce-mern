import { useDeleteProductMutation, useGetAllProductsQuery } from "../../services/Product"
import cross_icon from "../../assets/cross_icon.png"
export const ListProduct = () => {
  const { data, isLoading, isError ,refetch} = useGetAllProductsQuery();
  const[deleteProduct,{isLoading:isDelete,isError:isDeleteError}]=useDeleteProductMutation()


  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error in product display</div>;
  }
  if (isDelete) {
    return <div>Loading products...</div>;
  }

  if (isDeleteError) {
    return <div>Error in Deleting the product</div>;
  }

  if (data) {
    console.log(data)
  }

  const deleteProductById =async (product_id) =>{
    try {
      let result = await deleteProduct(product_id).unwrap()
      console.log(result)
      console.log("The product is deleted succesfully")
      refetch()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container sm:mx-auto w-full bg-white sm:w-3/4 mt-5 rounded-md">
        <div className="md:text-4xl text-2xl font-bold text-center py-5">
          All Products List
        </div>

        <div className="grid grid-cols-6 sm:gap-4 text-center font-semibold">
          <div className="text-xs md:text-base">Products</div>
          <div className="text-xs md:text-base">Title</div>
          <div className="text-xs md:text-base">Category</div>
          <div className="text-xs md:text-base">Old Price</div>
          <div className="text-xs md:text-base">New Price</div>
          <div className="text-xs md:text-base">Remove</div>
        </div>

        <hr className="my-4" />
        {data.products?.map(product => (
          <div
            key={product._id}
            className="grid grid-cols-6 sm:gap-4  text-center items-center mb-4"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover mx-auto rounded"
              />
            </div>
            <div className="text-sm md:text-base">{product.name}</div>
            <div className="text-sm md:text-base">
              {product.category}
            </div>
            <div className="text-sm md:text-base">₹{product.old_price}</div>
            <div className="text-sm md:text-base">₹{product.new_price}</div> {/* Quantity placeholder */}
            <div className="flex justify-center">
              {/* <button className="bg-red-500 text-white px-3 py-1 rounded">
                Remove
              </button> */}
              <img onClick={()=>deleteProductById(product.id)} className="cursor-pointer text-white px-3  rounded" src={cross_icon} alt="cross-icon" />
            </div>
          </div>
        ))}

      </div>
    </>
  );
}
