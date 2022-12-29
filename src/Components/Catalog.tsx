import Preloader from "./Preloader";
import ProductCard from "./ProductCard/ProductCard";
import CategoryList from "../Components/CategoryList/CategoryList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCatalog,
  selectCatalogSearch,
  setCatalog,
} from "../store/reducers/CatalogReducer";

export default function Catalog(props: any) {
  const fetchUrl = "http://localhost:7070/api/items";
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(6);
  const [currentUrl, setUrl] = useState(fetchUrl);
  const [loadMoreButtonActive, setLoadMoreButton] = useState(true);
  const [chosenCategory, setChosenCategory] = useState("All");
  const products = useSelector(selectCatalog);
  const searchRequest = useSelector(selectCatalogSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    let url = new URL(fetchUrl);
    const requestOptions = [
      {
        name: "categoryId",
        option: chosenCategory,
        defaultOption: "All",
      },
      {
        name: "offset",
        option: offset,
        defaultOption: 6,
      },
      {
        name: "q",
        option: searchRequest,
        defaultOption: "",
      },
    ];
    requestOptions.forEach((e) => {
      if (e.option !== e.defaultOption) {
        url.searchParams.set(e.name, e.option.toString());
      }
    });
    fetchProduct(url.toString());
    setUrl(url.toString());
  }, [chosenCategory, searchRequest]);

  function setProducts(data: Array<object>) {
    dispatch(setCatalog(data));
  }

  function fetchProduct(url: string) {
    setLoading(true);
    if (url.indexOf("offset") !== -1) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProducts([...products, ...data]);
          if (data.length < 6) {
            setLoadMoreButton(false);
          } else {
            setOffset(offset + 6);
          }
          setLoading(false);
        });
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
          if (data.length < 6) {
            setLoadMoreButton(false);
          }
        });
    }
  }

  function chooseCategory(id: string) {
    setChosenCategory(id);
    setLoadMoreButton(true);
    setOffset(6);
  }

  function loadMore() {
    const dataUrl = currentUrl;
    fetchProduct(dataUrl + "&offset=" + offset);
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {props.children}
      {loading ? (
        <Preloader />
      ) : (
        <>
          <CategoryList
            chosenCategory={chosenCategory}
            chooseCategory={chooseCategory}
          />
          <div className="row">
            {products.map((data: any) => (
              <ProductCard
                key={data.id}
                id={data.id}
                price={data.price}
                title={data.title}
                img={data.images[0]}
              />
            ))}
          </div>
          {loadMoreButtonActive && (
            <div className="text-center">
              <button onClick={loadMore} className="btn btn-outline-primary">
                Загрузить ещё
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
