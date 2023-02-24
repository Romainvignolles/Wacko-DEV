import React from 'react';


import Navbar from '../components/navbar/Navbar';
import Profil from '../components/onglet/Profil';

const ProfilPage = (props) => {
    return (
        
       <div className='profilPage'>
        <Navbar/>
        <Profil/>
       </div>
    );
};

export default ProfilPage;