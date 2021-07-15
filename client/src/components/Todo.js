import React, { useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";

const Todo = () => {

    const history = useHistory();
    const callTodoPage = async () =>{
        try{
            const res = await fetch('/todo', {
                method:"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);

            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            history.push('/signin')
        }
    }

    useEffect(() => {
            callTodoPage();
    }, []);

    return (
        <>
            <section className = "signup">
            <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> TODO </h2>
                            
                            <form method = "GET" className = "register-form" if="register-form">
                                <div className="col-md-6">
                                    <div className="profile-head">
                                        <h5>Riddhi </h5>
                                        <h6>riddhisi.it@gmail.com</h6>
                                    </div>
                                </div>
        
                                <div className = "form-group">
                                    <input type="text" name="email" id="email" autoComplete="off" placeholder="Your email"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="password" id="password" autoComplete="off" placeholder="Your password"/>
                                </div>
                                <NavLink to="/addtask" className = "signup-image-link">
                                <div className = "form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Add Task"/>
                                </div>
                                </NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Todo;
