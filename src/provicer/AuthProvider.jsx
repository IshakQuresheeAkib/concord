import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";
import { SnackbarProvider  } from "notistack";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import {QueryClient, QueryClientProvider } from "@tanstack/react-query";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const helmetContext = {};

const queryClient = new QueryClient()

const AuthProvider = ({children}) => {

    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const setProfile = (displayName,photoURL) =>{
        return updateProfile(auth.currentUser,{displayName,photoURL})
    }

    const logIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const googleLogIn = () => {
        return signInWithPopup(auth,googleProvider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            const userEmail = currentUser?.email ||  user?.email;
            const loggedUser = {email:userEmail}
            console.log(currentUser);
            setUser(currentUser)
            if (currentUser) {
                axios.post('https://assignment-12-server-delta-ruddy.vercel.app/jwt',loggedUser,{ withCredentials:true })
                .then(()=>{
                    setLoading(false)
                })
            }
            else{
                axios.post('https://assignment-12-server-delta-ruddy.vercel.app/logout',loggedUser,{withCredentials:true})
                .then(result=>{
                    setLoading(false)
                    console.log(result.data)
                })
            }
            
        })
        return () => unSubscribe();
    },[user?.email])

    const authInfo = {
        loading,
        user,
        createUser,
        logIn,
        logOut,
        googleLogIn,
        setProfile
    }

    return (
    <AuthContext.Provider value={authInfo}>
        <SnackbarProvider autoHideDuration={2000} anchorOrigin={{horizontal:'center',vertical:'top'}} style={{fontWeight:'600',fontSize:'16px'}} preventDuplicate={true}>
        <HelmetProvider context={helmetContext}>
           <QueryClientProvider client={queryClient}>
           {children}
           </QueryClientProvider>
        </HelmetProvider>                               
        </SnackbarProvider>
    </AuthContext.Provider>
    );
};

export default AuthProvider;