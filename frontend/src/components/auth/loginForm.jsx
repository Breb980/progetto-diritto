/* Define the form for login */
import React, { useState } from "react";
import { useRouter } from "next/router"; 
import Button from "@/components/ui/button";
import { InputGroup, InputLeft, Input, InputRight } from "@/components/ui/inputGroup";
import { handleLoginSubmit } from "@/utils/submits";


export default function LoginForm() {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    /* input states */
    const [cf, setCf] = useState("");
    const [psw, setPassword] = useState("");
    const [message, setMessage] = useState("");

    /* getter for result*/
    const [result, setResult] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleLoginSubmit(cf, psw);
        console.log(result);
        setResult(result); //save the result
        setMessage(result.message);

        //if the auth its ok
        if (result.success) {
            // rederict to home
            setTimeout(() => { router.push("/"); }, 1000);
        }
    };

    return (
        <form style={{ width: "300px", margin: "2rem auto" }} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputGroup>
                <InputLeft>@</InputLeft>
                <Input type="text" placeholder="CF" value={cf} onChange={(e) => setCf(e.target.value)} />
            </InputGroup>
            <br />
            <InputGroup>
                <InputLeft>🔒</InputLeft>
                <Input type={showPassword ? "text" : "password"} placeholder="Password" value={psw} onChange={(e) => setPassword(e.target.value)} />
                <InputRight>
                <button type="button" 
                    style={{ padding: "4px 8px", cursor: "pointer", borderRadius: "6px", backgroundColor: "#6c757d", marginLeft: "-10px",
                        marginTop: "1px"
                    }} 
                    onClick={() => setShowPassword((prev) => !prev)}>👁️</button>
                </InputRight>
            </InputGroup>
            <br />
            <div style={{ display: "flex", gap: "12px"}}>
                <Button label="Accedi" variant="outline" type="submit"/>
                <Button label="Annulla" onClick={(e) => {e.preventDefault(); router.push("/");}} variant="secondary"/>
            </div>
            {message && <p style={{ marginTop: "1rem", color: result.success ? "green" : "red", marginTop: "1rem", }}>{message}</p>}
        </form>
       
    );
}
