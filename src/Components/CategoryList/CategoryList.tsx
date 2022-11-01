import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function CategoryList(props:{chooseCategory:Function}){
  const [categories, setCategories] = useState<any[]>([])
  const [chosenCategoryId, setChosen] = useState("")

  useEffect(() => {
    fetch("http://localhost:7070/api/categories")
    .then(response => response.json())
    .then(data => setCategories(data))
  }, [])

  return(
    <ul className="catalog-categories nav justify-content-center">
      
      <li className="nav-item">
        <NavLink to = "/" className="nav-link">Все</NavLink>
      </li>

      {categories.map((data) => 
        <li key={data.id} className="nav-item">
          <NavLink className="nav-link" to = {data.id}>{data.title}</NavLink>
        </li>
      )}

    </ul>
  )
}