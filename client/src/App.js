//import logo from './logo.svg';
import { observer } from 'mobx-react-lite';
import './App.css';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';
import Footer from './page/Footer';


const App = observer(()=> {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      console.log(data)
      user.setUser(data);
      user.setIsAuth(true);
    }).
    catch (e => {
      console.log(e)
    }).finally(() => setLoading(false));
  }, [])
  if (loading){
    return <Spinner animation={"grows"}/>
  }

  return (
    //<BrowserRouter>
    <>
      <div className='container_background'>
        <NavBar/>
        <AppRouter/>
      </div>
      <Footer/>
    </>
    
    //</BrowserRouter>

  );
})

export default App;
