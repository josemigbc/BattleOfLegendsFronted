import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

const validate_password = (password) => {
    if (password.length < 8) return false
    if (password.toUpperCase() == password) return false
    if (password.toLowerCase() == password) return false
    return true
}

const validate_email = (email) => {
    if (!email.includes("@")) return false
    if (!email.includes('.')) return false
    return true
}

export function RegisterForm({ setLoginForm }) {

    let [username, setUsername] = useState("");
    let [email,setEmail] = useState("");
    let [password1, setPassword1] = useState("");
    let [password2, setPassword2] = useState("");
    let [isValid, setIsValid] = useState(false);

    const register = async () => {
        
        if (event,isValid) {
            event.preventDefault()
            const response = await fetch('http://127.0.0.1:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        username: username,
                        email: email,
                        password: password1,
                    }
                ),
            });
            if (response.status === 201){
                setLoginForm(true)
            } else {
                alert("Something failed in server.")
            }
        }else{
            alert("The data isn't valid.")
        }
    }

    return (
        <Form method="post">
            <Form.Group control-id="username" className="mb-3">
                <Form.Control type="text" size="lg" className="border border-3" placeholder="Username" value={username} onChange={e => {
                    setUsername(e.target.value);
                    setIsValid(validate_password(e.target.value) && e.target.value == password2 && validate_email(email));
                    }} />
            </Form.Group>
            <Form.Group control-id="email" className="mb-3">
                <Form.Control type="text" size="lg" className="border border-3" placeholder="E-mail" value={email} onChange={e => {
                    setEmail(e.target.value);
                    setIsValid(validate_password(e.target.value) && e.target.value == password2 && validate_email(email));
                }} />
            </Form.Group>
            <Form.Group control-id="password1" className="mb-3">
                <Form.Control type="password" size="lg" className={`border border-3 ${validate_password(password1) ? "border-success" : "border-danger"}`} placeholder="Password" value={password1} onChange={
                    e => {
                        setPassword1(e.target.value);
                        setIsValid(validate_password(e.target.value) && e.target.value == password2 && validate_email(email));
                    }} />
            </Form.Group>
            <Form.Group control-id="password2" className="mb-3">
                <Form.Control type="password" size="lg" className={`border border-3 ${password1 == password2 ? "border-success" : "border-danger"}`} placeholder="Confirm Password" value={password2} onChange={e => {
                    setPassword2(e.target.value)
                    setIsValid(validate_password(password1) && e.target.value == password1 && validate_email(email));
                }} />
            </Form.Group>
            <div className="mb-3">
                <Button variant="primary" type="submit" onClick={(e)=>register(e,isValid)}>Register</Button>
            </div>

            <div>
                <a href="" className="fw-bold text-decoration-none text-success mb-3" onClick={() => setLoginForm(true)}>Log In</a>
            </div>

        </Form>
    )
}