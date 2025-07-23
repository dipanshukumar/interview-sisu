import "./App.css";
import { Link, Route, Routes } from "react-router";
import Home from "./routes/home.jsx";
import Bptest from "./routes/Bptest.jsx";
import CountProvider from "./contexts/CountProvider.jsx";

function App() {
  // remaned the links but not the path
  return (
    <>
      <CountProvider>
        <header className="App-header">
          <nav>
            <Link to="/">Survey</Link>
            <Link to="/bptest">BP Test</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bptest" element={<Bptest />} />
        </Routes>
      </CountProvider>
    </>
  );
}

export default App;
