import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { useAtomValue } from "jotai";
//import { JWTAtom } from "../../stores/user";
import Post from "../../components/Post";
import { useSelector } from "react-redux";

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  //const JWT = useAtomValue(JWTAtom);
//--------------------------
const JWT = useSelector((state) => state.JWT);
//--------------------------

  useEffect(
    () => {
      fetch(`http://localhost:1337/users/${username}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${JWT}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setUser(response);
    })
    }, []
  )

  const ShowPost = () =>{
    fetch(`http://localhost:1337/posts?user.id=${user.id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${JWT}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setPosts(response);
    })
  }


  return(
    <>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Description: {user.description}</p>

      <button onClick={ShowPost}> Voir ses Posts</button>
      <p>{posts.map(post => <Post data={post} key={post.id}/>)}</p>
    </>
  )

}

export default User;