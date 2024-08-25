import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import AddCourse from './AddCourse';
import ListInstance from './ListInstance';
import ListCourse from './ListCourse';
import AddInstance from './AddInstance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewCourse from './ViewCourse';  
import ViewInstance from './ViewInstance';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="top-right" />
      <Routes>
      <Route path='/instances/:year/:sem/:id' element={<ViewInstance />} />

        <Route path="/courses/:id" element={<ViewCourse />} />
        <Route path="/" element={<ListInstance />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-instance" element={<AddInstance />} />
        <Route path="/list-courses" element={<ListCourse />} />
        <Route path="/list-instances" element={<ListInstance />} />
      </Routes>
    </div>
  );
}

export default App;
