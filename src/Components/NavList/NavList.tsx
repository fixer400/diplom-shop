import { NavLink } from "react-router-dom"

export default function NavList(){

  return(
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" end = {true}>Главная</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/catalog">Каталог</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">О магазине</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={"/contacts"}>Контакты</NavLink>
      </li>
    </ul>
  )
}