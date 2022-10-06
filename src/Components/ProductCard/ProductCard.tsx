import { Link } from "react-router-dom";

interface cardProps{
  price:number,
  title:string,
  img:string,
  id:number,
}

export default function ProductCard({price,title,img,id}: cardProps){

  return(
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={img} className="card-img-top img-fluid" alt={title}/>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price} руб.</p>
          <Link to={"/catalog/"+id} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}