import React, {  useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

const Add_task = () => {

    const history = useHistory();
    const [user, setUser] = useState({
        task: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value});
    }

    const callAddTodoPage = async (e) =>{
        e.preventDefault();

        //Object Destructuring
        const { task } = user;

        try{
            const res = await fetch('/add-todo-task', {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    task
                })
            });
            const data = await res.json();
            console.log(data);

            if(res.status === 422 || !data ){
                window.alert("Invalid registration")
                console.log("Invalid registration");
            }
            else{
                window.alert("Data Added Successfully")
                console.log("Data Added Successfully");
                history.push('/todolist');
            }
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
            history.push('/signin')
        }
    }
    return (
        <>
           <section className = "signup">
                <div className = "container mt-5">
                    <div className = "signup-content">
                    <h2 className = "form-title"> ADD TASK </h2>
                        <div className = "signup-form">
                        <form method="POST" className = "register-form" if="register-form">                                 
                                <div className = "form-group">
                                    <input type="text" name="task" id="task" autoComplete="off" placeholder="Your task"
                                    value = {user.task}
                                    onChange = {handleInputs} />
                                    <NavLink to="/todolist" className = "signup-image-link">
                                            <input type="Submit" name="cancel" id="cancel" 
                                                value = "cancel" />
                                    </NavLink>
                                </div>

                                <div className = "form-group form-button">
                                    
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="ADD" 
                                    onClick = {callAddTodoPage}/>
                                </div>
                                <NavLink to="/todolist" className = "signup-image-link">See Your ToDo</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Add_task;