import React from 'react';
import ReactDOM from 'react-dom';
import Authentification from './pages/Authentification';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profil from './pages/Profil';
import Connexion from './pages/Connexion';
import Header from './components/Header';
import User from './pages/User';
import './style.scss';
import { Provider } from 'react-redux';
import store from './stores/user';

const App = () =>{
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Authentification/>}/>
          <Route path='/profil' element={<Profil/>}/>
          <Route path='/login' element={<Connexion/>}/>
          <Route path='/user/:username' element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"));