import React, { useEffect, useState } from "react";
//import { useAtomValue, useAtom } from 'jotai';
//import { JWTAtom, usernameAtom, emailAtom, descriptionAtom } from '../../stores/user';
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Profil = () =>{

//------------------------
  const JWT = useSelector((state) => state.JWT);
//------------------------

  const [emailapp, setEmail] = useState("");
  const [usernameapp, setUsername] = useState("");
  const [descriptionapp, setDescription] = useState("");


  useEffect(
    () => {
      fetch('http://localhost:1337/users/me', {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${JWT}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {return response.json()})
      .then((response) => {
        setEmail(response.email);
        setUsername(response.username);
        setDescription(response.description);
        console.log(response)
        //Cookies.set('token', `${response.jwt}`, {
        //  sameSite: 'lax',
        //  secure: true
        //});
      })
    }, []    
  )

  function changeInformation(e){
    e.preventDefault();
    setUsername(document.getElementById("username").value);
    setEmail(document.getElementById("email").value);
    setDescription(document.getElementById("description").value);
    
    const data = {
      username: document.getElementById("username").value,
      email:document.getElementById("email").value,
      description: document.getElementById("description").value,
    };

    fetch(`http://localhost:1337/users/me`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${JWT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {return response.json()})
    .then((response) => {
      console.log(response);
      //Cookies.set('token', `${response.jwt}`, {
      //  sameSite: 'lax',
      //  secure: true
      //});
    })
  }

  return(
    <>
      <h2>Vos informations :</h2>

      <p>{emailapp}</p>
      <p>{usernameapp}</p>
      <p>{descriptionapp}</p>

      <h2>Modifiez vos informations :</h2>
      <form onSubmit={changeInformation}>
        <input type='text' placeholder='nouveau email' id='email' value={emailapp} onChange={(e) => setEmail(e.target.value)}></input>
        <input type='text' placeholder='nouveau username' id='username' value={usernameapp} onChange={(e) => setUsername(e.target.value)}></input>
        <input type='area' placeholder='nouvelle decription' id='description' value={descriptionapp} onChange={(e) => setDescription(e.target.value)}></input>
        <button type="submit">Modifier</button>
        <p><em>Pensez a appuiyez sur modifier pour sauvegarder vos changements</em></p>
      </form>
      

    </>
  )
}

export default Profil;