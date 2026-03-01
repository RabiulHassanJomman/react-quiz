import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  //signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    //update profile
    await updateProfile(userCredential.currentUser, { displayName: username });
    const user = userCredential.currentUser;
    setCurrentUser({ ...user });
  }

  //login function
  async function login(email, password) {
    const auth = getAuth();

    return await signInWithEmailAndPassword(auth, email, password);
  }

  //logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
