import { createContext, useState, useContext, useEffect } from 'react';
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';
import Cookie from 'js-cookie';
import Cookies from 'js-cookie';

export const AurhContext = createContext();

export const useAuth = () =>{
 const context = useContext (AurhContext);
 if (!context){
    throw new Error("useAuth must be used within an AuthProvider")
 }
 return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setloading] = useState(true);


    const singup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data); 
            setIsAuthenticated(true);
        } catch (error) {
//            console.log(error.response);
          setErrors(error.response.data);
        }
    }
    const singin = async (user) =>{
        try {
            const res = await loginRequest(user);
            console.log(res.data);
            setIsAuthenticated(true);
            setUser(res.data); 
           
        } catch (error) {

            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }

       
     }

     const logout = () =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
     }

     useEffect(()=>{
        if(errors.length > 0) {
            const timer = setTimeout(()=>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
        
     },[errors])



      useEffect(() =>{
        async function checkLogin(){
            const cookies = Cookies.get();
          if (!cookies.token){
            setIsAuthenticated(false)
            setloading(false);
            return setUser(null)
        }
        try {
            const res = await verifyTokenRequest(cookies.token);
            if(!res.data) {
                setIsAuthenticated(false);
                 setloading(false);
                 
                 return;
            }
            setIsAuthenticated(true)
            setUser(res.data)
            setloading(false);
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setloading(false);
        }
        }
        checkLogin()
      },[])


    return (
        <AurhContext.Provider value={{
            singup, singin , logout, user, isAuthenticated,errors,loading
        }}>
            {children}
        </AurhContext.Provider>
    )
}