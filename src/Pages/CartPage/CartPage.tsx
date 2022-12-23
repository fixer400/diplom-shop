import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CartElement from "../../Components/CartElement"
import OrderSection from "../../Components/OrderSection"
import { setAccess } from "../../store/reducers/CartAccessReducer"
import { sumOfProducts } from "../../store/reducers/ProductReducer"
import { RootState } from "../../store/store"

export default function CartPage(){
  const navigate = useNavigate()
  const access = useSelector((state: RootState) => state.access.value)
  const products = useSelector((state: RootState) => state.product.value)
  const sum = useSelector(sumOfProducts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (access === false){
      navigate('/')
    }
    return() => {
      dispatch(setAccess(false))
    }
  }, [])

  return(
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((element:any, index:number) => <CartElement key = {[element.id, element.size]} index = {index}  data = {element}/>)}
            <tr>
              <td colSpan= {5} className="text-right">Общая стоимость</td>
              <td>{sum} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <OrderSection items = {products}/>
    </>
  )
}