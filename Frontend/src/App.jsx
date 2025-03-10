import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Features from './components/features';
import Login from './components/Login';

function App() {
  return (
      <div>
          <Features />
          <Login />
      </div>
  );
}

export default App;