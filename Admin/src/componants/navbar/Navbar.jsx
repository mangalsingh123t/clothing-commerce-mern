import nav_logo from '../../assets/nav-logo.svg';
// import nav_profile from '../../assets/nav-profile.svg'
export const Navbar = () => {
  return (
    <>
      <div className='container-fluid w-full flex items-center justify-between shadow-custom-box-shadow px-8 py-3'>
        <div>
          <img src={nav_logo} className='w-40 sm:w-52 md:w-60' alt="logo" />
        </div>
        {/* <div>
          <img src={nav_profile} className='w-14 sm:w-16 md:24' alt="nav_profile" />
        </div> */}
      </div>
    </>
  )
}
