import Preloader from "./Preloader";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";

export default function TopSales() {
  const [topSales, setTopSales] = useState <any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:7070/api/top-sales")
    .then(response => response.json())
    .then(data => {setTopSales(data); setLoading(false)})
  },[])

  return(
    <>
      {loading ?        
        <Preloader/>
        :
        <>
          {topSales.length === 0 ? 
            null
            :
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <div className="row">
                {topSales.map((data) => 
                <ProductCard 
                  key = {data.id} 
                  price = {data.price} 
                  title = {data.title} 
                  img = {data.images[0]}
                />)}
              </div>
            </section>
          }
        </>
      }
    </>
  )
}