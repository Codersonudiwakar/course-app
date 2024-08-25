import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar-logo">Course Management</h1>
            <ul className="navbar-links">
                <li><Link to="/add-course" className="nav-button">Add Course</Link></li>
                <li><Link to="/add-instance" className="nav-button">Add Instance</Link></li>
                <li><Link to="/list-courses" className="nav-button">List Course</Link></li>
                <li><Link to="/list-instances" className="nav-button">List Instance</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;