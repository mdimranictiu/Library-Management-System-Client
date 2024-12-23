import React, { createContext, useState } from 'react';
import { auth } from '../Firebase/Firebase.init';
import { useEffect } from 'react';
import {signInWithPopup, createUserWithEmailAndPassword,GoogleAuthProvider,onAuthStateChanged, signInWithEmailAndPassword,signOut } from 'firebase/auth';
export const AuthContext= createContext(null);
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
      const [user,setUser]=useState(null)
      const [loading,setLoading]=useState(true)

      const newUserCreate=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
      }

      const loginUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
      }

      // Google SignIn/SignUp
       const signInwithGoogle=()=>{
        return signInWithPopup(auth,provider)
       }

      // logout
      const logOut=()=>{
        setLoading(true)
        return signOut(auth);
      }
     
      useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{
             console.log('Current User', currentUser);
             setUser(currentUser);
             setLoading(false)
         })
         return ()=>{ 
             unSubscribe()
         }
     },[]) 

      const authInfo={
        newUserCreate,
        user,loading,loginUser,logOut,
        signInwithGoogle
      }


    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;