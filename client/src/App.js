import './App.css';
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Todo from './components/Todo';
import Add_Task from './components/Add_task'
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <Navbar/>

      <Route exact path="/">
        <Home/>
      </Route>

      <Route path="/todo">
        <Todo/>
      </Route>

      <Route path="/add-task">
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