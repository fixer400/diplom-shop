import { Route, Routes } from "react-router-dom"
import banner from "../img/banner.jpg"
// import { useDispatch, useSelector } from "react-redux"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import CatalogPage from "../Pages/CatalogPage/CatalogPage"
import HomePage from "../Pages/HomePage/HomePage"
import ContactsPage from "../Pages/ContactsPage/ContactsPage"
import AboutPage from "../Pages/AboutPage/AboutPage"
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage"


export default function Main(){
  const count = useSelector((state: RootState) => state.reducer.value)
  //const dispatch = useDispatch()
  console.log(count)

  return(
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <Routes>
            <Route path="/catalog" element = {<CatalogPage/>}/>
            <Route path="/contacts" element = {<ContactsPage/>}/>
            <Route path="/about" element = {<AboutPage/>}/>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="*" element = {<NotFoundPage/>}/>
          </Routes>
        </div>
      </div>
    </main>
  )
}