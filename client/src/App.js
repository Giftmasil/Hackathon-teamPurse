import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Onbording from './pages/Onbording';
import Chatbot from './pages/Chatbot';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onbording />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="*" element={<Onbording />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
