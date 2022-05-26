import React from "react";
import  { Link } from "react-router-dom";
//import { useAtomValue } from "jotai";
//import { JWTAtom, idAtom } from "../../stores/user";
import { useSelector } from "react-redux";


const Post = (props) => {

  //const JWT = useAtomValue(JWTAtom);
  //const id = useAtomValue(idAtom);

  //------------------------------

  const JWT = useSelector((state) => state.JWT);
  const id = useSelector((state) => state.id);

  //------------------------------

  const DeletePost = () => {
    fetch(`http://localhost:1337/posts/${props.data.id}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${JWT}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {return response.json()})
      .then((response) => {
        console.log(response)
      })
  }


  const Like = () => {

    const data = {
      like: props.data.like + 1,
      users_likes: props.data.users_likes.concat(id)
    };

    fetch(`http://localhost:1337/posts/${props.data.id}`, {
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
      console.log(id)
    })
  }


  const unLike = () => {

    const data = {
      like: props.data.like - 1,
      users_likes: props.data.users_likes.filter(element => element.id != id)

    };

    fetch(`http://localhost:1337/posts/${props.data.id}`, {
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
    })
  }

  return(
    <>
      <p><em>{props.data.text}</em></p>
      <p>de {JWT!== ''?
        <Link to={`/user/${props.data.user.id}`}>{props.data.user.username}</Link>
      :
        <>
          {props.data.user.username}
        </>
      }</p>
      <p>likes: <span id="like">{props.data.like}</span></p>
      <p>{JWT === "" ? null :  props.data.users_likes.filter(element => element.id == id).length > 0? <button  onClick={unLike}>unLike</button> :
      <button  onClick={Like}>Like</button>
      }</p>

      {id == props.data.user.id ? <button onClick={DeletePost}>Supprimer</button> : null}
      <p>----------------------------------</p>
    </>
  )
}

export default Post;