import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SwiperComponent from './component/swiper';
import Signup from './component/signup';
import Login from './component/login';
import AddEventForm from './component/AddForm';
import EditEventForm from './component/EditForm'; 
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <SwiperComponent /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddForm" element={isAuthenticated() ? <AddEventForm /> : <Navigate to="/login" />} />
        <Route path="/editForm/:id" element={isAuthenticated() ? <EditEventForm /> : <Navigate to="/login" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
