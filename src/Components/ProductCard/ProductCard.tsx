import "./ProductCard.css"

interface cardProps{
  price:number,
  title:string,
  img:string
}

export default function ProducCard({price,title,img}: cardProps){
  return(
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={img} className="card-img-top img-fluid" alt={title}/>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
        </div>
      </div>
    </div>
  )
}