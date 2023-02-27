import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";


export function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(GlobalContext)

    const login = async (event) => {

        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { 
                    username: username,
                    password: password,
                }
            ),
        }

        const response = await fetch("http://127.0.0.1:8000/login/", options)
        if (response.status === 200) {
            const user = await response.json()
            context.setUser(user)
            context.setView("main")
        } else {
            setUsername("")
            setPassword("")
        }
    }

    return (
        <Form method="post" onSubmit={e=>login(e)}>
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
                <a href="#" className="fw-bold text-decoration-none text-success mb-3" onClick={()=>context.setView("register")}>Create an account</a>
            </div>
        </Form>
    )
}
