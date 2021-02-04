import './App.css';
import Login from './components/login';
import TodoMain from './components/todoMain';
function App() {
  return (
    <>
      {localStorage.getItem("userId")?<TodoMain/>:<Login/>}
    </>
    
  );
}

export default App;
