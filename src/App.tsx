import{ BrowserRouter} from'react-router-dom';
import Header from './Components/Header/Header';
import Main from './Components/Main';
import Footer from './Components/Footer/Footer';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import  store , {persistor} from './store/store'
import './App.css';


function App() {
  

  return (
    <BrowserRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Header/>
          <Main/>
          <Footer/>
        </div>
      </PersistGate>
        
      </Provider>
    </BrowserRouter>
  );
}

export default App;
