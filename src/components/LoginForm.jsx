import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import settings from "./../settings.json";
import { Link } from "react-router-dom";

export function LoginForm({ setLoginForm }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const context = useContext(GlobalContext)

    axios.defaults.xsrfCookieName = "csrftoken"
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
    axios.defaults.withCredentials = true

    const login = async (event) => {

        event.preventDefault();

        const data = {
            username: username,
            password: password,
        }

        const response = await axios.post(`${settings.host}login/`, data)
        if (response.status === 200) {
            context.setUser(response.data)
        } else {
            setUsername("")
            setPassword("")
        }
    }

    return (
        <Form method="post" onSubmit={e => login(e)}>
            <Form.Group control-id="username" className="mb-3">
                <Form.Control type="text" name="username" size="lg" className="border border-3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group control-id="password" className="mb-3">
                <Form.Control type="password" name="password" size="lg" className="border border-3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="mb-3">
                <Button variant="primary" type="submit">Log In</Button>
            </div>
            <div>
                <Link to={`register/`} className="fw-bold text-decoration-none text-success mb-3 text-white">Create an account</Link>
            </div>
        </Form>
    )
}
