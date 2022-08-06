import React, {useState } from "react";
import {Card, Form, Container, Button} from "react-bootstrap";
import { useUserAuth } from '../context/authContext';
import {db} from "../firebaseConfig";
import { collection , addDoc} from "firebase/firestore";


const CreateNote = (props) => {
  const [heading, setTitle] = useState("");
  const [content, setBody] = useState("");
  const {currentUser} = useUserAuth();

  
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(heading);
    try{
    await addDoc(collection(db, "users", currentUser.uid, "notes"), {
      title: heading,
      body: content
    });
    props.onAdd();
    }
    catch(err){
      console.log(err);
    }

    setTitle("");
    setBody("");
  }

    return(    
    <Container className="d-flex justify-content-center mt-3">
    <Card style={{borderColor: "#f58413",
                  minWidth: "500px",
                  }}>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" id='name'>
          <Form.Control type="text" placeholder='Title' onChange={(e) => {setTitle(e.target.value)}} required />
        </Form.Group>
        <Form.Group className="mb-4" id='name'>
          <Form.Control as="textarea" placeholder='Body' onChange={(e) => {setBody(e.target.value)}} required style={{ height: '100px' }}/>
        </Form.Group>
          <Button style={{float: "right", backgroundColor: "#f58413", borderColor: "#f58413"}} type="submit">Add</Button>
        </Form>
    </Card.Body>
    </Card>
    </Container>
    );
}

export default CreateNote;