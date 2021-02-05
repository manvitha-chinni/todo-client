import './App.css';
import Login from './components/login';
import TodoMain from './components/todoMain';
import {isUserLoggedIn} from "./services/authService"
function App() {
  return (
    <>
      {isUserLoggedIn()?<TodoMain/>:<Login/>}
    </>
    
  );
}

export default App;
