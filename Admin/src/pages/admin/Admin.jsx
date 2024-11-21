import { Sidebar } from "../../componants/sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import {AddProduct} from "../../componants/addproduct/AddProduct";
import { ListProduct } from "../../componants/listproduct/ListProduct";
export const Admin = () => {
  return (
    <>
    <div className="flex md:flex-row flex-col bg-gray-100">
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/products' element={<ListProduct/>}/>
      </Routes>
    </div>
    </>
  )
}
