import React from "react";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import UserLogin from "./Auth/UserLogin";
import Home from "./Home";
import UserHome from "./UserHome";

function App(){

    return(
        <Router>
         <Routes>
         <Route exact path='/' element={<Register />}  />
         <Route exact path='/login' element={<Login />}  />
         <Route exact path='/register' element={<Register />}  />
         <Route path='/user' element={<UserLogin />} />
         <Route path='/home' element={<Home />} />
         <Route path='/user-home' element={<UserHome />} />
        </Routes>
        </Router>
    )
}

export default App;