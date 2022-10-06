import{ BrowserRouter} from'react-router-dom';
import Header from './Components/Header/Header';
import Main from './Components/Main';
import Footer from './Components/Footer/Footer';
import {Provider} from 'react-redux'
import { store } from './store/store'
import './App.css';


function App() {
  

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header/>
          <Main/>
          <Footer/>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
