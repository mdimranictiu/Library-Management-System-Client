import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase.init';
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import UseAxiosPublic from '../hook/UseAxiosPublic/UseAxiosPublic';

export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic();

    const newUserCreate = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google SignIn/SignUp
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Handle JWT Token when user is authenticated
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                const userEmail = { email: currentUser.email };

                try {
                    const res = await axiosPublic.post('/jwt', userEmail);
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    } else {
                        localStorage.removeItem('access-token');
                    }
                } catch (error) {
                    console.error("JWT Request Failed:", error);
                    localStorage.removeItem('access-token');
                }
            } else {
                localStorage.removeItem('access-token');
            }
        });

        return () => unSubscribe();
    }, [axiosPublic]);

    const authInfo = {
        newUserCreate,
        user,
        loading,
        loginUser,
        logOut,
        signInWithGoogle,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
