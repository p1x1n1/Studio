//import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';


const App = () => {
  return (
    //<BrowserRouter>
    <div >
      <NavBar/>
      <AppRouter/>
    </div>
    
    //</BrowserRouter>
    
    
   // <div>WORKING</div>
  );
}

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