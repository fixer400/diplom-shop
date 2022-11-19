import { useState } from "react";
import { useDispatch } from "react-redux";
import Catalog from "../../Components/Catalog";
import { setSearchRequest } from "../../store/reducers/CatalogReducer";

export default function CatalogPage(){

  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  function findItem(event:any){
    event.preventDefault()
    dispatch(setSearchRequest(searchValue))
  }

  return(
    <Catalog>
      <form onSubmit={findItem} className="catalog-search-form form-inline">
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="form-control" placeholder="Поиск"/>
      </form>
    </Catalog>
  )
}