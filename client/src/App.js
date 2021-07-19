import './App.css';
import { Route } from 'react-router-dom'
import Todo from './components/Todo';
import Add_Task from './components/Add_task'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Edit from "./components/editTask";
import Delete from "./components/deleteTask"

function App() {
  return (
    <>
      <Route exact path="/">
        <Signup/>
      </Route>
      
      <Route exact path="/editTask">
        <Edit/>
      </Route>

      <Route exact path="/deleteTask">
        <Delete/>
      </Route>

      <Route path="/todolist">
        <Todo/>
      </Route>

      <Route path="/addtask">
        <Add_Task/>
      </Route>

      <Route path="/signin">
        <Signin/>
      </Route>

      <Route path="/signup">
        <Signup/>
      </Route>
    </>
  );
}

export default App;
