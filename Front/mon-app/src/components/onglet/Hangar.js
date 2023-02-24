import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, } from "@fortawesome/free-solid-svg-icons";



const Hangar = () => {

    let token = localStorage.getItem('token');

    axios.interceptors.request.use(                         //ajouter le token au headers
        config => {
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        error => {
            return Promise.reject(error);
        }
    );

    const [allStarships, setAllStarships] = useState([]);
    const [starships, setStarships] = useState([]);
    const [owner, setOwner] = useState([]);

    const fetchStarships = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/starships`)
            .then((res) => {
                setAllStarships(res.data)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    window.location = "/404";
                }
            })
    };
    useEffect(() => {
        fetchStarships()
    }, []);




    //afficher les vaisseaux au Hover
    const displayships = (e) => {
        let focusDiv = document.getElementById('hangar__right')
        focusDiv.style.visibility = "visible"

        let focusShipsId = e.target.id

        const fetchOneStarships = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}api/starships/${focusShipsId}`)
            setStarships(result.data)
            setOwner(result.data.utilisateurs)
        };
        fetchOneStarships()
    }

    //barre de recherche
    const searchShips = (e) => {
        let search = e.target.value;
        search = search.toUpperCase();
        let x = document.getElementsByClassName('ships');

        for (const list of x) {
            if (!list.innerHTML.toUpperCase().includes(search)) {
                list.style.display = "none";
            }
            else {
                list.style.display = "block";
            }
        }
    }

    return (

        <div className='hangar'>
            <div className='hangar__block'>
                <div className='hangar__left' >
                    <h1>Vaisseaux disponibles:</h1>
                    <div className='hangar__left__search'>
                        <input onKeyUp={searchShips} type="text" name="search" placeholder="Rechercher" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>

                    <div className='hangar__left__list'>
                        {allStarships.map(vaisseaux => (
                            <span className='ships' onMouseOver={displayships} key={vaisseaux.id} id={vaisseaux.id} >
                                {vaisseaux.name}
                            </span>
                        ))}

                    </div>
                </div>
                <div id='hangar__right' className='hangar__right'>
                    <div className='hangar__right__top'>
                        <a className='hangar__right__top__link' target="_blank" rel="noreferrer" href={starships.link}>{starships.name}</a>
                        <h2>{owner.length} {owner.length > 1 ? 'membres de la WACKO possèdent ce vaisseau' : 'membre de la WACKO possède ce vaisseau'} </h2>
                    </div>
                    <div className='hangar__right__middle'>
                        <img className='hangar__right__middle' src={starships.image} alt="" />
                    </div>
                    <div className='hangar__right__bottom'>
                        <h2>Propriétaires:</h2>
                        <div className='hangar__right__bottom__list'>
                            {owner.map(owner => (
                                <span className='hangar__right__bottom__owner' key={owner.id} id={owner.id} >
                                    {owner.pseudo}
                                </span>
                            ))}
                        </div>

                    </div>

                </div>
            </div>


        </div>
    );
};

export default Hangar;