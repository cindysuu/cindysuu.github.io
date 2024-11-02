import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Builder from './Builder';
import Student from './Student';
import RelatablePerson from './RelatablePerson';
import './styles.css';
import './styles2.css';

function App() {
  return (
    <Router>
      <div
        className="relative h-screen w-full bg-cover bg-center bg-fixed"
        id="backgroundContainer"
        style={{ backgroundImage: `url('media/trees-background.jpg')` }}
      >
        <nav className="p-4 text-white justify-center flex items-center">
          <ul className="flex space-x-4">
            <li className="text-blue-400">I'm a</li>
            <li><Link to="/builder" className="hover:text-gray-400">Builder</Link></li>
            <li className="text-blue-400">|</li>
            <li><Link to="/student" className="hover:text-gray-400">Student</Link></li>
            <li className="text-blue-400">|</li>
            <li><Link to="/relatable-person" className="hover:text-gray-400">Relatable Person</Link></li>
          </ul>
        </nav>

        <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
          <button
            type="button"
            id="changeBackgroundButton"
            className="bg-gradient-to-r from-emerald-400 from-30% to-blue-400 to-70% bg-clip-text text-transparent text-xl font-bold hover:from-yellow-400 hover:to-pink-400 -mt-24"
          >
            Take me Somewhere Nice
          </button>
          <h1 className="text-white text-7xl mt-20 font-bold">Cindy Su</h1>
        </div>

        <footer className="absolute bottom-0 w-full text-center p-4 text-white">
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/cindy-su-867a5817b/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              {/* SVG for LinkedIn */}
            </a>
            <a href="https://github.com/cindysuu" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              {/* SVG for GitHub */}
            </a>
          </div>
          <p className="mt-2 text-sm">&copy; 2024 Cindy Su. All rights reserved.</p>
        </footer>

        {/* Routes for internal navigation */}
        <Routes>
          <Route path="/builder" element={<Builder />} />
          <Route path="/student" element={<Student />} />
          <Route path="/relatable-person" element={<RelatablePerson />} />
          <Route path="/" element={<h1 className="text-center text-white text-5xl mt-20">Welcome to Cindy's Website</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
