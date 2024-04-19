//import logo from './logo.svg';
import { observer } from 'mobx-react-lite';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';


const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  /*useEffect(() => {
    check().then(data => {
      user.setUser(true);
      user.setIsAuth(true);
    }).finally(() => setLoading(false));
  }, [])
  if (loading){
    return <Spinner animation={"grows"}/>
  }*/

  return (
    //<BrowserRouter>
    <div >
      <NavBar/>
      <AppRouter/>
    </div>
    
    //</BrowserRouter>
    
    
   // <div>WORKING</div>
  );
})

export default App;

 /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/