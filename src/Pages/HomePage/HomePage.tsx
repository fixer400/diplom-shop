import { useDispatch } from "react-redux";
import Catalog from "../../Components/Catalog";
import TopSales from "../../Components/TopSales";
import { setSearchRequest } from "../../store/reducers/CatalogReducer";
import "./HomePage.css";

export default function HomePage() {
  const dispatch = useDispatch();
  dispatch(setSearchRequest(""));

  return (
    <>
      <TopSales />
      <Catalog />
    </>
  );
}
