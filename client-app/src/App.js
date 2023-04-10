import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Verifytoken from './pages/verify_token';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } /> 
          <Route path="/signin" element={ <Signin /> } />
          <Route path="/verify" element={ <Verifytoken /> }/>
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;