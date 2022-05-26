import React, { useState } from 'react';
//import { useSetAtom } from 'jotai';
//import { JWTAtom, idAtom } from '../../stores/user';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../stores/action';


const Form = () => {

  const [usernameapp, setUsername] = useState("");
  const [emailapp, setEmail] = useState("");
  //const setId = useSetAtom(idAtom);
  const [passwordapp, setPassword] = useState("");
  //const setJWT = useSetAtom(JWTAtom);
  const navigate = useNavigate();

  //-----------------------------

  const dispatch = useDispatch();

//--------------------------------

  function FetchData(e){
    e.preventDefault();
    setUsername(document.getElementById("username").value);
    setEmail(document.getElementById("email").value);
    setPassword(document.getElementById("password").value);
 
    const data = {
      username: document.getElementById("username").value,
      email:document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    fetch('http://localhost:1337/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {return response.json()})
    .then((response) => {
      //-------------------
        dispatch(userLogin(response.jwt, response.user.id))
      //--------------------
     // setJWT(response.jwt);
      //setId(response.user.id)
      console.log(response.jwt);
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
        <input type="text" placeholder='username' id="username"></input>
        <input type="text" placeholder='email' id="email"></input>
        <input type="text" placeholder='password' id="password"></input>
        <button type='submit' >Envoyer</button>

      </form>
    </>
    
  )
}

export default Form;