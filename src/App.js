import './App.css';
import React, { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Splash from '../src/pages/Splash.tsx';
import Login from '../src/pages/Login.tsx';
import NotFound from '../src/pages/NotFound.tsx';
import Home from './pages/Home.tsx';
import Players from './pages/Players.tsx';
import Tasks from './pages/Tasks.tsx';
import Levels from './pages/Levels.tsx';
import Notifications from './pages/Notifications.tsx';

import { AppWrapper } from './context/index.tsx';
import { ToastContainer } from "react-toastify";
import Redirect from './components/Redirect.tsx';

function App() {
  const location = useLocation();

  const showNavbarRoutes = ['/dashboard', '/players', '/tasks', '/levels', '/notifications']; // List of routes that don't need the Navbar

  // Check if the current route should hide the Navbar
  const hideNavbar = useMemo(() => !showNavbarRoutes.includes(location.pathname), [location.pathname]);


  return (
    <AppWrapper>
      <ToastContainer toastClassName='ff-secondary' />
      
      {!hideNavbar ? (
        
        <Navbar>
          <Redirect/>
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Navbar>
        
      ) : (
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      )}


    </AppWrapper>
  );
}

export default App;
