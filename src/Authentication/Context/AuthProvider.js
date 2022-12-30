import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../Firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, isLoading] = useState(true);

    const googleSign = () => {
        isLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const emailSignIn = (email, password) => {
        isLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const emailSignUp = (email, password) => {
        isLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateName = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('current user:', currentUser);
           setUser(currentUser);
           isLoading(false);
       })
        return () => {
            unsubscribe();
        }
    },[])

    const authInfo = {user,loading,googleSign,logOut,emailSignIn,emailSignUp,updateName}

    return (
        <AuthContext.Provider value={authInfo}>
           { children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;