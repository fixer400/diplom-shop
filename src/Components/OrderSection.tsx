import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProductCart } from "../store/reducers/ProductReducer";
import Preloader from "./Preloader";

export default function OrderSection(props: { items: Array<object> }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAdress] = useState("");
  const [acceptOrderRules, setAcceptOrderRules] = useState(false);
  const dispatch = useDispatch();
  const items = props.items.map((e: any) => {
    return { id: e.id, price: e.price, count: e.amount };
  });

  function sendOrder(e: any) {
    e.preventDefault();
    if (acceptOrderRules && phone && address) {
      const fetchRequest = {
        owner: {
          phone: phone,
          address: address,
        },
        items: items,
      };
      setLoading(true);
      fetch("http://localhost:7070/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fetchRequest),
      }).then((response) => {
        if (response.ok) {
          alert("Все прошло успешно");
          dispatch(setProductCart([]));
          localStorage.clear();
        } else {
          alert("Ошибка");
        }
        setLoading(false);
      });
    }
  }

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
            <form onSubmit={sendOrder} className="card-body">
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  onChange={(e: any) => setPhone(e.target.value)}
                  value={phone}
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  onChange={(e: any) => setAdress(e.target.value)}
                  value={address}
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                />
              </div>
              <div className="form-group form-check">
                <input
                  onChange={() => setAcceptOrderRules(!acceptOrderRules)}
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button
                onClick={sendOrder}
                type="submit"
                className="btn btn-outline-secondary"
              >
                Оформить
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
