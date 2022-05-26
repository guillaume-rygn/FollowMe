import React, {useEffect, useState} from "react";
//import { useAtomValue } from "jotai";
//import { idAtom, JWTAtom } from "../../stores/user";
import { Link, useNavigate } from "react-router-dom";
import Post from "../../components/Post";


import { useSelector } from 'react-redux';


const Home = () =>{

//-----------------------------
  const JWT = useSelector((state) => state.JWT);
  const id = useSelector((state) => state.id);
//-----------------------------

  //const JWT = useAtomValue(JWTAtom);
  //const id = useAtomValue(idAtom);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);


  useEffect(
    () => {
      PostLoad();
    }, []
  )

  function CreatePost(e) {
    const data = {
      text: JWT !== ""? document.getElementById("content").value : null ,
      user: id
    }
    e.preventDefault();
    fetch(`http://localhost:1337/posts`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${JWT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById("content").value = "";
      PostLoad();
        });
  }

  const PostLoad = () => {
    fetch('http://localhost:1337/posts?_sort=created_at:desc', {
      method: 'get',
      headers: {
       'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setPosts(response)
    })
  }

  return(
    <>
      <h1>Bienvenue sur FollowMe</h1>
      {JWT !== ''?
        <>
          <p>Partagez avec nous votre premier post !</p>
          <form onSubmit={CreatePost}>
            <input type="text" placehorder="votre post" id="content"></input>  
            <button type="submit">Envoyer</button>
          </form>
        </>
        
      :
      <>
        <Link to="/register">S'inscrire</Link><br></br>
        <Link to="/login">Se connecter</Link> 
      </>
      }
      <p>{posts.map(post => <Post data={post} key={post.id}/>)}</p>
    </>
  )
}

export default Home;