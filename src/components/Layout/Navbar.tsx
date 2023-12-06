import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/app/hooks"
import AccountMenu from "./AccountMenu"
import ChangeSite from "./ChangeSite/ChangeSite"
import getDistanceList from "../../utils/accurateDistance/getDistanceList"

const Navbar = () => {

  const constructionSite = useAppSelector(state => state.construction.constructionSite)

  const userData = useAppSelector(state => state.ui.userData)
  const navigate = useNavigate()

  const loginClick = () => {
    navigate('/login')
  }


  const clickHandler = () => {
    getDistanceList(constructionSite);
  }


  return (
    // <div className="mb-4 ">
    <div className="z-50 h-[8vh] navbar bg-base-100">
      {/* <div className="z-50 h-8 navbar bg-[#38b2ac] text-black"> */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
              <a className="justify-between bg-base-100">
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
              </a>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <Link to="/" className="text-xl normal-case btn btn-ghost">Home</Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li><a>Budowa:</a></li>
          <li>
            <ChangeSite site={constructionSite.adress} />
          </li>
          <li>
            <button onClick={clickHandler}>
              Aktualizuj odległości
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end ">
        <p>
          {userData.login ? userData.login : (<button onClick={loginClick}>Login</button>)}
        </p>
        <AccountMenu />
      </div>
    </div>
    // </div>
  )
}

export default Navbar