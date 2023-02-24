import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Membre from '../components/onglet/Membre';

const MembrePage = (props) => {
    return (
        
        <div className='membrePage'>
            <Navbar/>
            <Membre/>
        </div>
    );
};

export default MembrePage;