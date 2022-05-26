import React from "react";
import { Link } from "react-router-dom";
//import { useAtom } from "jotai";
//import { idAtom, JWTAtom } from "../../stores/user";
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../stores/action";

const Header = () => {
//----------------------
  const JWT = useSelector((state) => state.JWT);
  const id = useSelector((state) => state.id);

  const dispatch = useDispatch();

//---------------------

//  const [JWT, setJWT] = useAtom(JWTAtom);
//  const [id, setId] = useAtom(idAtom)

  function Logout(){
    Cookies.remove('token', {
        sameSite: 'none',
        secure: true
      });
    Cookies.remove('id', {
      sameSite: 'none',
      secure: true
    });

    dispatch(userLogin("", ""))


    //setJWT("");
    //setId("")
  }

  return(
    <header>
      <h1><Link to='/'>FollowMe</Link></h1>
      <ul>
        <li><Link to='/'>Home</Link></li>

        {JWT!==""? 
        <>
          <li><Link to='/profil'>Mon Porfil</Link></li>
          <li><Link to='/' onClick={Logout}>Se Déconnecter</Link></li>
        </>
        : 
        <>
          {/*console.log(Cookies.get('token'))*/}
          <li><Link to='/register'>S'inscrire</Link></li>
          <li><Link to='/login'>Se Connecter</Link></li>
        </>
        }   
      </ul>
    </header>
  )
}

export default Header;