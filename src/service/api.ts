import axios from "axios";
import { LOGIN_API, AUTH_API, TODO_API } from "@env"
import EncryptedStorage from 'react-native-encrypted-storage';


export const login = async (username: any, password: any) => {
  try {
    const res = await axios.post(
      LOGIN_API,
      {
        username,
        password,
        expiresInMins: 60,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(res.data)
    console.log('user access token ===============+>>>>>>>>>>>',res.data.accessToken)
    const userToken = res.data.accessToken
   const token =  await EncryptedStorage.setItem("user_token", userToken)
    console.log('user token=========>>>>>>>Storage>>>>>>>>>>', token)
    return res.data;
  } catch (error) {
    console.error("Login failed=======>>>>>>", error);
    throw error;
  }
};

export const user = async () => {
const accessToken = await EncryptedStorage.getItem("user_token")
    try {
        const res = await axios.get(AUTH_API,      {
        headers: { "Authorization": accessToken },
        withCredentials: true,
      } )
      return res.data
    } catch (error) {
        
    }
}

export const getTodo = async () => {
    try {
        const res = await axios.get(TODO_API)
        console.log('todo=========>>>>>>>>', res.data)
        return res.data.todos
    } catch (error) {
        throw error;
    }
}
