import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deleteProductCart, getSum } from "../store/reducers/ProductReducer"

export default function CartElement(props:any){
  const dispatch = useDispatch()
  const data = props.data


  function deleteThis(){
    dispatch(deleteProductCart(data))
    dispatch(getSum())
  }

  return(
      <tr>
        <td scope="row">{props.index + 1}</td>
        <td><Link to={"/catalog/" + data.id}>{data.title}</Link></td>
        <td>{data.size}</td>
        <td>{data.amount}</td>
        <td>{data.price} руб.</td>
        <td>{data.price * data.amount} руб.</td>
        <td><button onClick={deleteThis} className="btn btn-outline-danger btn-sm">Удалить</button></td>
      </tr>
  )
}