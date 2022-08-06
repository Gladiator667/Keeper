import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, db} from "../firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {doc,collection,setDoc,addDoc} from 'firebase/firestore';

const AuthContext = createContext();

export function useUserAuth(){
  return useContext(AuthContext);
}

export default function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState({});
  const [global, setGlobal] = useState(true);
  

  async function signUp(email, password, name){
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", response.user.uid),{
      name: name,
      email: response.user.email,
    });

    await addDoc(collection(db, "users", response.user.uid, "notes"), {
      title: "Sample Doc 1",
      body: "This is Sample Document 1 for testing purpose"
    })
  }


  async function login(email, password){
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logOut(){
    await signOut(auth);
  }

  

  useEffect(() => {
    console.log("useeffect ruuning");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setGlobal(false);
     });
    return () => {
      unsubscribe();
    }
  }, [])


  if(global){
    return <div><p>
      Loading.....
    </p></div>
  }

  return (
    <AuthContext.Provider value={{currentUser, signUp, login, logOut}}>
        {children}
    </AuthContext.Provider>
  )
}


