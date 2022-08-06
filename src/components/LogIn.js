import React, {useState} from 'react'
import {Card, Container, Form, Button, Alert} from 'react-bootstrap'
import {Link,  useNavigate} from "react-router-dom";
import { useUserAuth } from '../context/authContext';

export default function LogIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useUserAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            setError("");
            await login(email, password);
            navigate("/home");
        } catch(error){
            setError(error.message);
        }
    }
    
  return (
    <Container className="d-flex mt-3 justify-content-center" style={{minHeight: "100vh"}}>
    <div className="w-100" style={{maxWidth: "400px"}}>
    <Card style={{boxShadow: "0 1px 5px rgb(138, 137, 137)"}}>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder='Email ID' onChange={(e) => {setEmail(e.target.value)}} required/>
                </Form.Group>
                <Form.Group className="mb-4" id='password'>
                    <Form.Label>PassWord</Form.Label>
                    <Form.Control type="password" placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} required />
                </Form.Group>
                <Button className="w-100" type="submit">Log In</Button> 
            </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-3">
           Don't have an account?  <Link to="/signup">Sign Up</Link>
        </div>
    </Card>
    </div>
    </Container>
  )
}
