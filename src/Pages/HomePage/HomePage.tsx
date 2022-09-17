import { useEffect, useState } from "react";
import CategoryList from "../../Components/CategoryList/CategoryList";
import ProducCard from "../../Components/ProductCard/ProductCard";
import './HomePage.css'

export default function HomePage(){
  const [topSales, setTopSales] = useState <any[]>([])
  const [products, setProducts] = useState <any[]>([])

  useEffect(() => {
    fetch("http://localhost:7070/api/top-sales")
    .then(response => response.json())
    .then(data => setTopSales(data))

    fetch("http://localhost:7070/api/items")
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])

  return(
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {topSales.map((data) => <ProducCard price={data.price} title = {data.title} img = {data.images[0]}/>)}
        </div>
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <CategoryList/>
        <div className="row">
          {products.map((data) => <ProducCard price={data.price} title = {data.title} img = {data.images[0]}/>)}
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary">Загрузить ещё</button>
        </div>
      </section>
    </>
  )
}