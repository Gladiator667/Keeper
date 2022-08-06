import React, {useState} from 'react'
import {Card, Form, Button, Alert, Container} from 'react-bootstrap'
import {Link, useNavigate} from "react-router-dom"
import { useUserAuth } from '../context/authContext';

function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const {signUp} = useUserAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            return setError("Password and Confirm Password do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signUp(email, password, name);
            console.log("here2");
            navigate("/home")
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

  return (
    <Container className="d-flex mt-3 justify-content-center" style={{minHeight: "100vh"}}>
    <div className="w-100" style={{maxWidth: "400px"}}>
    <Card style={{boxShadow: "0 1px 5px rgb(138, 137, 137)"}}>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" id='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder='Name' onChange={(event) => {setName(event.target.value)}} required />
                </Form.Group>
                <Form.Group className="mb-4" id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder='Email ID' onChange={(event) => {setEmail(event.target.value)}} required/>
                </Form.Group>
                <Form.Group className="mb-4" id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Password' onChange={(event) => {setPassword(event.target.value)}} required />
                </Form.Group>
                <Form.Group className="mb-4" id='cPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="text" placeholder='Confirm PassWord' onChange={(event) => {setConfirmPassword(event.target.value)}} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button> 
            </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-3">
            Already have an account? <Link to="/">Log In</Link></div>
    </Card>
    </div>
    </Container>
  )
}

export default SignUp;
