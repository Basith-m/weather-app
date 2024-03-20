import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Auth register />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
}

export default App;
