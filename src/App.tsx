import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./Header";
import { Content } from "./Content";
// import { Footer } from "./Footer";
import { ItemPage } from "./ItemPage";
import { ItemsNew } from "./ItemsNew";
import { LoginForm } from "./Login";
import { SignupForm } from "./Signup";
import { CustomCursor } from "./CustomCursor";
import { useState } from "react";
import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  

  return (
    <Router>
      <div>
        <CustomCursor />
        <Header onSearch={setSearchTerm} />
        <Routes>
          {/* Pass searchTerm to Content */}
          <Route path="/" element={<Content searchTerm={searchTerm} />} />
          {/* Define other routes as needed */}
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/new-item" element={<ItemsNew />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;