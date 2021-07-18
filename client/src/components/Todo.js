import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

const Todo = () => {

    const history = useHistory();
    const [userTask, setUserTask] = useState([]);
    
    const [taskID, setTaskID] = useState('');
    const [taskName, setTask] = useState('');
    const [updatedTask, setUpdated] = useState('');
    
    const callTodoPage = async () =>{
        try{
            const res = await fetch('/todo-task', {
                method:"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            //setUserData(data);
            setUserTask(data);
            console.log(userTask);
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

    const delTodo = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch('/delete-task', {
                method:"DELETE",
                headers:{
                    "Content-Type" : "application/json"
                },body:JSON.stringify({
                    taskID,
                    taskName
                })
            });
            const data = await res.json();
            console.log(data);
            if(res.status === 400 || !data ){
                window.alert("ERROR!")
                console.log("ERROR!");
            }
            else{
                window.alert("Deleted Successfully");
                console.log("Deleted Successfully");
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
                        <div className = "signup-form">
                            <h2 className = "form-title"> TODO </h2>
                            
                            <form method = "GET" className = "register-form" if="register-form">
                                <table className="table table-bordered">  
                                    <tr>  
                                        <th>Tasks</th>  
                                    </tr>  
                            
                                    {userTask.map((task, index) => (  
                                    <tr data-index={index}>  
                                        <td>{index+1}</td> 
                                        <td>{task.task_name}
                                        </td>
                                        <td>
                                            <NavLink to="/editTask" className = "signup-image-link">
                                                <input type="submit" name="edit" id="edit" className="form-submit" value="   EDIT  " />
                                            </NavLink>
                                            <NavLink to="/deleteTask" className = "signup-image-link">
                                                <input type="submit" name="signup" id="signup" className="form-submit" value=" Delete "/>
                                                </NavLink>
                                        </td>  
                                    </tr>  
                                    ))}  

                                </table>
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

