import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./Header";
import { Content } from "./Content";
// import { ItemsIndex } from "./ItemsIndex";
import { Footer } from "./Footer";
import { ItemPage } from "./ItemPage";
import { ItemsNew } from "./ItemsNew";
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
