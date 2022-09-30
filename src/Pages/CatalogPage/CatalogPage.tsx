import Catalog from "../../Components/Catalog";
import CategoryList from "../../Components/CategoryList/CategoryList";

export default function CatalogPage(){

  return(
      <Catalog>
        <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск"/>
        </form>
      </Catalog>
  )
}