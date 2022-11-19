import { useEffect, useState } from "react";

export default function CategoryList(props:{chooseCategory:Function,chosenCategory:string}){
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetch("http://localhost:7070/api/categories")
    .then(response => response.json())
    .then(data => setCategories(data))
  }, [])

  return(
    <ul className="catalog-categories nav justify-content-center">
      
      <li onClick={() => props.chooseCategory('All')} className="nav-item">
        <a href="#" className={props.chosenCategory === 'All'?"nav-link  active":"nav-link"}>Все</a>
      </li>

      {categories.map((data) => 
        <li onClick={() => props.chooseCategory(data.id)} key={data.id} className="nav-item">
          <a href="#" className={props.chosenCategory === data.id?"nav-link  active":"nav-link"}>{data.title}</a>
        </li>
      )}

    </ul>
  )
}