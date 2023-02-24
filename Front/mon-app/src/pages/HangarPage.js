import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Hangar from '../components/onglet/Hangar';

const HangarPage = (props) => {
    return (
        
       <div className='hangarPage'>
        <Navbar/>
        <Hangar/>
       </div>
    );
};

export default HangarPage;