import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Preloader from "../../Components/Preloader";
import { setAccess } from "../../store/reducers/CartAccessReducer";
import { setProductCart } from "../../store/reducers/ProductReducer";

export default function CatalogPageItem() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>();
  const [selectedSize, setSize] = useState("");
  const [itemCount, setCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:7070/api/items/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  function increment() {
    if (itemCount < 10) {
      setCount(itemCount + 1);
    }
  }

  function decrement() {
    if (itemCount > 1) {
      setCount(itemCount - 1);
    }
  }

  function sendItemInCart() {
    if (selectedSize !== "") {
      dispatch(
        setProductCart({ ...product, size: selectedSize, amount: itemCount })
      );
      dispatch(setAccess(true));
      navigate("/cart");
    }
  }

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <section className="catalog-item">
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={product.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{product.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{product.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{product.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{product.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{product.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {product.sizes.map(
                    (data: { size: string; avalible: boolean }) =>
                      data.avalible && (
                        <span
                          key={data.size}
                          className={
                            selectedSize === data.size
                              ? "catalog-item-size selected"
                              : "cataloga-item-size"
                          }
                          onClick={() => setSize(data.size)}
                        >
                          {data.size}
                        </span>
                      )
                  )}
                </p>
                <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary" onClick={decrement}>
                      -
                    </button>
                    <span className="btn btn-outline-primary">{itemCount}</span>
                    <button className="btn btn-secondary" onClick={increment}>
                      +
                    </button>
                  </span>
                </p>
              </div>
              <button
                onClick={sendItemInCart}
                className={
                  selectedSize !== ""
                    ? "btn btn-danger btn-block btn-lg"
                    : "btn btn-danger btn-block btn-lg disabled"
                }
              >
                В корзину
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
