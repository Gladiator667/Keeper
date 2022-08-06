import { useEffect, useState } from 'react';
import { useUserAuth } from '../context/authContext';
import CreateNote from "./CreateNote";
import Note from "./Note";
import {collection, deleteDoc, getDocs, doc} from 'firebase/firestore';
import {db} from "../firebaseConfig";

const Home = () => {

    
    const [notes, setNotes] = useState([]);
    const {currentUser} = useUserAuth();

    useEffect(() => {
      fetchData();  
    },[]);

    const fetchData = async() =>{
      if (!currentUser) return;
      console.log(currentUser.uid);
      const docSnap = await getDocs(collection(db, "users", currentUser.uid, "notes"));
      setNotes([]);
      let list = [];
      docSnap.forEach((doc) => {
        list.push({...doc.data(), id:doc.id});
      });
      setNotes(list);
      console.log(notes);
    };
  
    

   async function deleteNote(id) {
      await deleteDoc(doc(db, "users", currentUser.uid, "notes", id));
      fetchData();
    }

    async function addNote() {
      fetchData();
    }




    return (
        <div>
            <CreateNote onAdd={addNote}/>
            {notes.map((note, index) => {
            return (
            <Note
                key={index}
                id={note.id}
                title={note.title}
                content={note.body}
                onDelete={deleteNote}
            />
            );
            })} 
        </div>
    );
    
}

export default Home;