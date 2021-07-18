import React, { useState }  from 'react'
import { NavLink, useHistory } from "react-router-dom";
const DeleteTask = () => {
    const history = useHistory();
    const [taskName, setDelTaskName] = useState('');
    const callDeleteAction = async(e) =>{
            e.preventDefault();
    try{
        const res = await fetch('/delete-task',{
            method:"DELETE",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    taskName
                })
        });
        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data ){
            window.alert("Invalid.")
            console.log("Invalid TRY. ");
        }
        else{
            window.alert("Deleted Successfully")
            console.log("Deleted Successfully");
            history.push('/todolist')
        }
        if(!res.status === 200 ){
            const error = new Error(res.error);
            throw error;
        }
    }catch(err){
        console.log(err);
        history.push('/todolist')
    }
    }
    return (
        <>
            <section className = "signup">
                <div className = "container mt-5">
                    <div className = "signup-content">
                    <h2 className = "form-title"> DELETE TASK </h2>
                        <div className = "signup-form">
                        <form method="POST" className = "register-form" if="register-form"> 
                                                    
                                <div className = "form-group">
                                    <input type="text" name="taskName" id="taskName" autoComplete="off" placeholder="re-enter the task name"
                                        value = {taskName}
                                    onChange = {(e) => setDelTaskName(e.target.value)} />
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="DELETE" id="DELETE" className="form-submit" value="DELETE" 
                                    onClick = {callDeleteAction}/>
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
export default DeleteTask;
