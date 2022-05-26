import { atom } from 'jotai';
import { legacy_createStore as createStore } from 'redux';
import Cookies from 'js-cookie';

const initialState = {
  JWT : Cookies.get('token')? Cookies.get('token'): "",
  id : Cookies.get('id')? Cookies.get('id'): ""
}
const reducerFN = (state = initialState, action) => {

  if(action.type === 'LOGIN'){
    return {
      ...state,
      JWT: action.token,
      id: action.id
    }
  }

  return state;
}

const store = createStore(reducerFN);
export default store;

export let JWTAtom = atom(Cookies.get('token')? Cookies.get('token'): "");
export let idAtom = atom(Cookies.get('id')? Cookies.get('id'): "");

