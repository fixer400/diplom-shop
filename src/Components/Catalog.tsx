import Preloader from "./Preloader";
import ProducCard from "./ProductCard/ProductCard";
import CategoryList from "../Components/CategoryList/CategoryList";
import { useEffect, useState } from "react";

export default function Catalog(props: any){
  const [products, setProducts] = useState <any[]>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(6)
  const [loadMoreButtonActive, setLoadMoreButton] = useState(true)

  useEffect(() => {
    setLoading(true)
     fetch("http://localhost:7070/api/items")
    .then(response => response.json())
    .then(data => setProducts(data))
    setLoading(false)
  }, [])

  function loadMore(){
    setLoading(true)
    fetch("http://localhost:7070/api/items?offset="+offset)
    .then(response => response.json())
    .then(data => 
      {setProducts([...products,...data]);
        if(data.length < 6){
          setLoadMoreButton(false)
        }
        else{
          setOffset(offset + 6)
        }
        setLoading(false);
      }
    )
  }

  return(
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.children}
      {loading 
        ? 
        <Preloader/>
        :
        <>
          <CategoryList/>
          <div className="row">
            {products.map((data) => 
              <ProducCard 
                key={data.id} 
                price={data.price} 
                title = {data.title} 
                img = {data.images[0]}
              />
              )
            }
          </div>
          {loadMoreButtonActive && 
            <div className="text-center">
              <button onClick={loadMore} className="btn btn-outline-primary">Загрузить ещё</button>
            </div>
          }
        </>
      }
    </section>
  )
}