import React, { useState } from "react";
//import {  useSetAtom } from 'jotai';
//import { idAtom, JWTAtom } from '../../stores/user';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from '../../stores/action';


const Connexion = () =>{
  const [usernameapp, setUsername] = useState("");
  //const [emailapp, setEmail] = useAtom(emailAtom);
  const [passwordapp, setPassword] = useState("");
  


  //----------------------/

  const dispatch = useDispatch();


  //-------------------------/
  //const setId = useSetAtom(idAtom);
  //const setJWT = useSetAtom(JWTAtom);
  const navigate = useNavigate();

  function FetchData(e){
    e.preventDefault();
    setUsername(document.getElementById("username").value);
    setPassword(document.getElementById("password").value);
 
    const data = {
      identifier: document.getElementById("username").value,
      password: document.getElementById("password").value
    };

    fetch('http://localhost:1337/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {return response.json()})
    .then((response) => {
      console.log(response);
      console.log(response.user.id);

      //----------------------------

      dispatch(userLogin(response.jwt, response.user.id))

      //----------------------------

      //setJWT(response.jwt);
      //setId(response.user.id)
      Cookies.set('token', `${response.jwt}`, {
        sameSite: 'none',
        secure: true
      });
      Cookies.set('id', `${response.user.id}`, {
        sameSite: 'none',
        secure: true
      });
      navigate('/');
    })
  }

  return(
    <>
      <form onSubmit={FetchData}>
        <input type="text" placeholder='username or mail' id="username"></input>
        <input type="password" placeholder='password' id="password"></input>
        <button type='submit' >Se connecter</button>

      </form>
    </>
   
  )
}

export default Connexion;