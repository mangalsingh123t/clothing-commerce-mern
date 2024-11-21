import Product_Cart_icon from '../../assets/Product_Cart.svg';
import Product_list_icon from '../../assets/Product_list_icon.svg'
import { Link } from 'react-router-dom'
export const Sidebar = () => {
    return (
        <>
            <div className='container-fluid flex items-center justify-around md:flex-col md:justify-start w-full md:w-56  gap-4 h-20  md:h-screen shadow-custom-box-shadow bg-white'>

                <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                    <div className='s:w-60 md:w-48  py-2 mx-auto flex gap-4 md:mt-5 place-content-center bg-gray-100'>
                        <img src={Product_Cart_icon} alt="Product_Cart_icon" />
                        <div>Add Product</div>
                    </div>
                </Link>
                <Link to={'/products'} style={{ textDecoration: "none" }}>
                    <div className='sm:w-60 md:w-48  py-2 mx-auto flex gap-4 place-content-center bg-gray-100'>
                        <img src={Product_list_icon} alt="Product_list_icon" />
                        <div>Product List</div>
                    </div>
                </Link>
            </div>
        </>
    )
}
