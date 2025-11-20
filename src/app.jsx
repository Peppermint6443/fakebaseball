import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
// import Player from './components/Player';

import './app.css';

export default function App() {

    return (
        <BrowserRouter>
            <div className = 'body'>
                <header className = 'header'>
                    <h1><NavLink className = 'nav-link' to = ''><p className = 'header-text'>Snek Scouting</p></NavLink></h1>

                    <nav className = 'nav'>
                        <p><NavLink className = 'NavLink' to = ''>Home</NavLink></p>
                    </nav>
                </header>

                <Routes>
                    <Route 
                        path = '/'
                        element = {<Home/>}
                    />
                    {/* <Route path = '/player_page' element = {<Player/>}/> */}
                </Routes>

                <footer>
                    <span>Author: u/shruggingemoji64 (Reddit), Silicon1464 (Discord)</span>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}