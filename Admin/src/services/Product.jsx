// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9090/' }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url:'addproduct',
        method:'post',
        body:newProduct
      })
    }),
      getAllProducts: builder.query({
        query: () => 'products', 
      }),
    deleteProduct : builder.mutation({
      query : (product_id) =>({
       url : `/products/${product_id}`,
       method:'DELETE'
      })
    })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddProductMutation ,useGetAllProductsQuery ,useDeleteProductMutation} = productApi

