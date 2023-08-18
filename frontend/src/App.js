import "./App.css";
import React from "react";
import MainPage from "./components/MainPage";
import VideoPlayer from "./components/VideoPlayer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
     
      {/* <MainPage /> */}
      <Router>
        {/* <nav>
          <div>
            <Link to="/"></Link>
          </div>
          <div>
            <Link to="/VideoPlayer/:id"></Link>
          </div>
        </nav> */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/VideoPlayer/:id" element={<VideoPlayer />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
