// Install the storage layer BEFORE App is evaluated (App reads window.storage at module load).
import './lib/storage.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
