import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Winner from './Winner';
import Lottery from './Lottery';
import Tokens from './Tokens';
import Footer from './Footer';
import Home from './Home';

class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tokens" element={<Tokens />} />
                            <Route path="/lottery" element={<Lottery />} />
                            <Route path="/winner" element={<Winner />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }

}

export default App;