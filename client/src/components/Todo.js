
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

//Edit Task
    const editTodo = async (e, _id) =>{
        e.preventDefault();

        //Object Destructuring

        try{
            const res = await fetch('/edit-task', {
                method:"PUT",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    _id,
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
                window.alert("Updated Successfully")
                console.log("Updated Successfully");
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

//Delete API
    const delTodo = async (e,_id) =>{
        console.log(_id);
        try{
            const res = await fetch('/delete-task', {
                method:"DELETE",
                headers:{
                    "Content-Type" : "application/json"
                },body:JSON.stringify({
                    _id
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
                history.push('/todolist')
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
                                        <td>
                                            <div>
                                            {task.task_name}
                                            </div>
                                            <div>
                                        <input type="text" name="task" id="task" className="form-submit" value={taskName} 
                                                onChange={(e) => setTask(e.target.value)}
                                                placeholder = {task.task_name}
                                            />
                                        </div>
                                        </td>
                                        <td>
                                        <div className = "form-group form-button">

                                                <input type="submit" name="edit" id="edit" className="form-submit" value="   EDIT  " 
                                                onClick = {(e) => editTodo(e, task._id)}/>
                                            </div>
                                            <div>
                                            <input type="submit" name="del" id="del" className="form-submit" value=" Delete "
                                                onClick = {(e) => delTodo(e, task._id)}/>
                                            </div>
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

