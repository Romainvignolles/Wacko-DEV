import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const logOut = (e) => {
        localStorage.clear()
    }

    return (
        <>
            <div className='navbar'>
                <div className='navbar__top'>
                    <div className='navbar__top__top'>

                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><g fill="currentColor"><path d="M6.732 10.64a1 1 0 1 1 1.536-1.28l5 6a1 1 0 1 1-1.536 1.28l-5-6Z" /><path d="M8.268 10.64a1 1 0 1 1-1.536-1.28l5-6a1 1 0 1 1 1.536 1.28l-5 6Z" /></g></svg>
                            <button className='navbar__button' onClick={logOut}> Déconnexion</button>
                        </Link>

                        <div className='navbar__top__top__logo'>
                            <img className="navbar__top__top__logo__ecusson" src="images/Logo_grand.png" alt="logo Wacko" />
                            <img className="navbar__top__top__logo__texte" src="images/nom_wacko_horizontal.png" alt="texte Wacko" />

                        </div>

                        <Link to="/Profil">
                            <button className='navbar__button' id='profil'>Profil</button>
                            <img className="navbar__top__logo__profil" src="images/profil_v1.png" alt="logo Wacko" />
                        </Link>
                    </div>
                </div>

                <div className='navbar__menu'>
                    <Link to="/Membre"><button className='navbar__button' id='membres'>MEMBRES</button></Link>
                    <Link to="/Hangar"><button className='navbar__button' id='hangar'>HANGAR</button></Link>
                    <Link to="/LiensUtiles"><button className='navbar__button' id='presentation'>LIENS UTILES</button></Link>
                    <Link to="/Event"><button className='navbar__button' id='presentation'>EVENEMENTS</button></Link>
                </div>

            </div>
        </>

    );
};

export default Navbar;