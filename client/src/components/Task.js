import React, { useEffect, useState } from 'react';


const TodosTasks = () => {

    const [userData, setUserData] = useState({});
    const [userTask, setUserTask] = useState({});
    var data;
    const callTodoPage = async () =>{
        try{
            const res = await fetch('/todo', {
                method:"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                },
                credentials:"include"
            });
            data = await res.json();
            console.log("data"+data);
            console.log("setUserData"+userData);
            setUserData(data);
            console.log("data.todovhjdbjdbhb dhxs:"+data.todos)
            setUserTask(data.todos);
            console.log("userTask"+userTask);
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
        }
    }

    
    useEffect(() => {
            callTodoPage();
    }, []);

    const tas = userData.todos;
        // const tasks = userData.todos;
     const tasks = [  
                  {  
                    'id': 1,   
                    'name': 'Jack',   
                    'email': 'jack@gmail.com'  
                  },  
                  {  
                    'id': 2,   
                    'name': 'Mary',   
                    'email': 'mary@gmail.com'  
                  },  
                  {  
                    'id': 3,   
                    'name': 'John',   
                    'email': 'john@gmail.com'  
                  },  
              ];
    console.log("Bhai:"+typeof(userData.todos),userData.todos)
    console.log("tasks:"+typeof(tasks),tasks) 
    console.log("tas:"+typeof(tas),tas) 
    //const tasks = userData.todos;
    //const tasks = data.todos  

    return (  
        <div className="container">          
            <table className="table table-bordered">  
                <tr>  
                    <th>Tasks</th>  
                </tr>  
        
                {tasks.map((task, index) => (  
                  <tr data-index={index}>  
                    <td>{task.id}</td>  
                    <td>{task.name}</td>  
                    <td>{task.email}</td>  
                  </tr>  
                ))}  
        
            </table> 
            <table className="table table-bordered">  
                <tr>  
                    <th>Tasks</th>  
                </tr>  
        
                {tas.map((task, index) => (  
                  <tr data-index={index}>  
                    <td>{index+1}</td>  
                    <td>{task.task}</td>  
                    <td>{task.email}</td>  
                  </tr>  
                ))}  
        
            </table>  
        
        </div>  
      );  
}
export default TodosTasks;