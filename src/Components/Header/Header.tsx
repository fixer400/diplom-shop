import "./Header.css"
import logo from "../../img/header-logo.png"
import { NavLink } from "react-router-dom"
import NavList from "../NavList/NavList"

export default function Header(){
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
                  <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
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