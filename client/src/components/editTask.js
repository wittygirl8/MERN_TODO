import React, {  useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

const EditTask = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        oldTaskName:"",
        newTaskName: ""
    });

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value});
    }

    const callEditPage = async (e) =>{
        e.preventDefault();

        //Object Destructuring
        const { oldTaskName, newTaskName } = user;

        try{
            const res = await fetch('/edit-task', {
                method:"PUT",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    oldTaskName,
                    newTaskName
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
    

    return (
        <>
           <section className = "signup">
                <div className = "container mt-5">
                    <div className = "signup-content">
                    <h2 className = "form-title"> EDIT TASK </h2>
                        <div className = "signup-form">
                        <form method="POST" className = "register-form" if="register-form"> 
                                                    
                                <div className = "form-group">
                                    <input type="text" name="oldTaskName" id="oldTaskName" autoComplete="off" placeholder="OLD Task Name"
                                        value = {user.oldTaskName}
                                    onChange = {handleInputs} />
                                </div>
                                <div className = "form-group">
                                    <input type="text" name="newTaskName" id="newTaskName" autoComplete="offvrbvrbgb" placeholder="Upadation Task Name"
                                        value = {user.newTaskName}
                                    onChange = {handleInputs} />
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="update" id="update" className="form-submit" value="UPDATE" 
                                    onClick = {callEditPage}/>
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

export default EditTask;
