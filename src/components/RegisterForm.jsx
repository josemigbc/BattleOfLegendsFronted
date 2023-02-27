import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";


export function RegisterForm(props) {

    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [isValid, setIsValid] = useState(false);

    const context = useContext(GlobalContext);

    const register = async () => {

    }

    const validate_password = (password) => {
        if (password.length < 8) return false
        if (password.toUpperCase() == password) return false
        if (password.toLowerCase() == password) return false
        return true
    }
    
    return (
        <Form className="form-control p-3" method="post" onSubmit={e => register(e)}>
            <Form.Group control-id="username" className="mb-3">
                <Form.Control type="text" size="lg" className="border border-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group control-id="password1" className="mb-3">
                <Form.Control type="password" size="lg" className={`border border-3 ${validate_password(password1) ? "border-success": "border-danger"}`} placeholder="Password" value={password1} onChange={
                    e => {
                        setPassword1(e.target.value);
                        setIsValid(validate_password(e.target.value) && e.target.value==password2);
                        }} />
            </Form.Group>
            <Form.Group control-id="password2" className="mb-3">
                <Form.Control type="password" size="lg" className={`border border-3 ${password1 == password2 ? "border-success": "border-danger"}`} placeholder="Confirm Password" value={password2} onChange={e => {
                    setPassword2(e.target.value)
                    setIsValid(validate_password(password1) && e.target.value==password1);
                    }} />
            </Form.Group>
            <div className="mb-3">
            <Button variant="primary" type="submit">Register</Button>
            </div>
            
            <div>
                <a className="fw-bold text-decoration-none text-success mb-3" onClick={()=>context.setView("login")}>Log In</a>
            </div>

        </Form>
    )
}