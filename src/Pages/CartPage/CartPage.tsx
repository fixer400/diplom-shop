import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CartElement from "../../Components/CartElement"
import { setAccess } from "../../store/reducers/CartAccessReducer"
import { getSum } from "../../store/reducers/ProductReducer"
import { RootState } from "../../store/store"

export default function CartPage(){
  const navigate = useNavigate()
  const access = useSelector((state: RootState) => state.access.value)
  const products = useSelector((state: RootState) => state.product.value)
  const sum = useSelector((state:RootState) => state.product.sum)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getSum())
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
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style= {{maxWidth : "30rem", margin: "0 auto"}}>
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" id="phone" placeholder="Ваш телефон"/>
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" id="address" placeholder="Адрес доставки"/>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement"/>
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      </section>
    </>
  )
}