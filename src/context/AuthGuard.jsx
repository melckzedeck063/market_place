import {useState} from "react";
import { decryptData } from "../store/utils_encryption";


export default  function AuthGuard() {


    const getToken = () => {
        const tokenString = sessionStorage.getItem("food_recipe");

        if (tokenString) {
            const decrypted = decryptData(tokenString);
            const { data } = JSON.parse(decrypted);
            return data;
        }

        return null; // or handle the absence of a token in a way that makes sense for your application
    }


    const [token, setToken] = useState(getToken());

    const saveToken =  userToken =>  {
        sessionStorage.getItem("food_recipe", JSON.stringify(userToken));
        setToken(userToken.token);
    }

      return {
        setToken : saveToken,
          token
      }
}