import logo from "../../img/header-logo.png"
import { NavLink, useNavigate } from "react-router-dom"
import NavList from "../NavList/NavList"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { setAccess } from "../../store/reducers/CartAccessReducer"

export default function Header(){
  const productsCount = useSelector((state: RootState) => state.product.value).length
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function cartRedirect(){
    dispatch(setAccess(true))
    navigate("/cart")
  }

  return(
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to = {"/"}>
              <img src={logo} alt="Bosa Noga"/>
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <NavList/>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <div onClick={cartRedirect} className="header-controls-pic header-controls-cart">
                    {productsCount > 0 && 
                      <div className="header-controls-cart-full">
                        {productsCount}
                      </div>
                    }
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск"/>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}