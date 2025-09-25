import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Convert from './pages/Convert';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="convert" element={<Convert />} />
          
          {/* 404 route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">Page Not Found</p>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;