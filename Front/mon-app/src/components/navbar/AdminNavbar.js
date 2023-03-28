import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faDoorOpen, faScrewdriverWrench, } from "@fortawesome/free-solid-svg-icons";



const AdminNavbar = () => {

    return (
        <>
            <div className='adminNavbar'>
                <div className='adminNavbar__block'>
                    <div className='adminNavbar__block__leave'>
                        <Link to="/membre">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><g fill="currentColor"><path d="M6.732 10.64a1 1 0 1 1 1.536-1.28l5 6a1 1 0 1 1-1.536 1.28l-5-6Z" /><path d="M8.268 10.64a1 1 0 1 1-1.536-1.28l5-6a1 1 0 1 1 1.536 1.28l-5 6Z" /></g></svg>
                            <button className='navbar__button'> Retour</button>
                        </Link>
                    </div>
                </div>
                <div className='adminNavbar__menu'>
                    <Link to="/Administration"><button className='adminNavbar__block__menu__button' >Admin</button></Link>
                    <Link to="/AdminWebsite"><button className='adminNavbar__block__menu__button' >Ajouter Liens/Vaisseaux</button></Link>
                    <Link to="/AdminImagePage"><button className='adminNavbar__block__menu__button' >Images</button></Link>
                    <Link to="/CreateEvent"><button className='adminNavbar__block__menu__button' >Créer un event</button></Link>
                </div>
            </div>
        </>

    );
};

export default AdminNavbar;