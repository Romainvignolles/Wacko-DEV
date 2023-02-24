import React from 'react';
import Navbar from '../components/navbar/Navbar';
import LiensUtiles from '../components/onglet/LiensUtiles';



const componentName = () => {
    return (

        <div className='linkPage'>
            <Navbar />
            <LiensUtiles />
        </div>
    );
};

export default componentName;