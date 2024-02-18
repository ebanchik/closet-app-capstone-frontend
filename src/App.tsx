import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./Header";
import { Content } from "./Content";
// import { Footer } from "./Footer";
import { ItemPage } from "./ItemPage";
import { ItemsNew } from "./ItemsNew";
import { LoginForm } from "./Login";
import { SignupForm } from "./Signup";
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/new-item" element={<ItemsNew />} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/signup" element={<SignupForm/>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
