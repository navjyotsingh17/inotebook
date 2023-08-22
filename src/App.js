import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App() {

  //state for the alert
  const [alert, setAlert] = useState(null);

  //showing the alert below the navbar
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
    {/* wrapped all the children routes in the NoteState component for content API. */}
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route excat path='/' element={<Home showAlert={showAlert}/>} />
              <Route excat path='/about' element={<About />} />
              <Route excat path='/login' element={<Login showAlert={showAlert}/>} />
              <Route excat path='/signUp' element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div >
        </Router>
      </NoteState>
    </>
  );
}

export default App;
