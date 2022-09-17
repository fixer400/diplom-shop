import { NavLink } from "react-router-dom";

export default function CategoryList(){

  return(
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <NavLink className="nav-link" to="#">Все</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">Женская обувь</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">Мужская обувь</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">Обувь унисекс</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="#">Детская обувь</NavLink>
      </li>
    </ul>
  )
}