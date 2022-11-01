import Preloader from "./Preloader";
import ProductCard from "./ProductCard/ProductCard";
import CategoryList from "../Components/CategoryList/CategoryList";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

export default function Catalog(props: any){
  const [products, setProducts] = useState <any[]>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(6)
  const [loadMoreButtonActive, setLoadMoreButton] = useState(true)
  const [chosenCategory, setChosenCategory] = useState('All')

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:7070/api/items")
    .then(response => response.json())
    .then(data => {setProducts(data);setLoading(false)})
  }, [])

  function chooseCategory(id:string){
    setChosenCategory(id)
    setOffset(6)
    setLoadMoreButton(true)
    if (id === "All"){
      setLoading(true)
      fetch("http://localhost:7070/api/items")
      .then(response => response.json())
      .then(data => {setProducts(data);setLoading(false)})
    }
    else{
      setLoading(true)
      fetch("http://localhost:7070/api/items?categoryId="+id)
      .then(response => response.json())
      .then(data => {setProducts(data);setLoading(false)})
    }
  }

  function loadMore(){
    if (chosenCategory !== "All"){
      setLoading(true)
      fetch("http://localhost:7070/api/items?categoryId="+chosenCategory+"&offset="+offset)
      .then(response => response.json())
      .then(data => 
        {setProducts([...products,...data]);
          console.log(data)
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
    else{
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
          <CategoryList chooseCategory = {chooseCategory}/>
          <Routes>
            <Route path = {chosenCategory} element = 
            {<div className="row">
              {products.map((data) => 
                <ProductCard 
                  key={data.id}
                  id={data.id}
                  price={data.price} 
                  title = {data.title} 
                  img = {data.images[0]}
                />
                )
              }
            </div>
            }/>
          </Routes>
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