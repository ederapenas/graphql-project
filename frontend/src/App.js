import React, { Component } from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';

import './App.css';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" component={AuthPage}/>
      <Route path="/events" component={EventsPage}/>
      <Route path="/bookings" component={BookingsPage}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;