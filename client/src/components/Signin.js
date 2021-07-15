import React, {useState}  from "react";
import { NavLink, useHistory } from "react-router-dom";

const Signin = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async(e) =>{
        e.preventDefault();

        const res = await fetch('/login', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },body:JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if(res.status === 400 || !data ){
            window.alert("Invalid Credentials")
            console.log("Invalid Credentials");
        }
        else{
            window.alert("Login Successfull")
            console.log("Successfull Login");

            history.push("/todolist");
        }
    }

    return (
        <div>
            <>
            <section className = "signup">
            <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> Sign In </h2>
                            <form method = "POST" className = "register-form" if="register-form">
        
                                <div className = "form-group">
                                    <input type="text" name="email" id="email" autoComplete="off" 
                                    value = {email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="password" id="password" autoComplete="off" 
                                    value = {password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your password"/>
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="SingIn"
                                    onClick = { loginUser }/>
                                </div>
                                <NavLink to="/signup" className = "signup-image-link">New User</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            </>
        </div>
    )
}

export default Signin;