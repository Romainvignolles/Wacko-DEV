import React, { useEffect, useState } from 'react';
import axios from 'axios';


const LiensUtiles = () => {

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

    const [allLink, setAllLink] = useState([]);
    const [load, setLoad] = useState();

    //recupération des lien utile dans la BDD
    const fetchStarships = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/getAllLink`)
            .then((res) => {
                setAllLink(res.data)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    window.location = "/404";
                }
            })

    };
    useEffect(() => {
        fetchStarships()
    }, [load]);



    // redirect des liens
    const redirect = (e) => {
        let focusLink = e.target.getAttribute('data')
        window.open(focusLink)
    }

    // barre de recherche
    const searchLink = (e) => {
        let search = e.target.value;
        search = search.toUpperCase();
        let x = document.getElementsByClassName('lienUtile__bottom__button');

        for (const list of x) {
            if (!list.innerHTML.toUpperCase().includes(search)) {
                list.style.display = "none";
            }
            else {
                list.style.display = "block";
            }
        }
    }

    //reset de la barre de recherche au changement de filre
    const resetSearch = (e) => {
        let search = document.getElementById('searchLink').value = "";
        search = search.toUpperCase();
        let x = document.getElementsByClassName('lienUtile__bottom__button');

        for (const list of x) {
            if (!list.innerHTML.toUpperCase().includes(search)) {
                list.style.display = "none";
            }
            else {
                list.style.display = "block";
            }
        }
    }

    //Bouton de filtre
    const linkFilter = (e) => {
        switch (e.target.id) {
            case "tous":
                resetSearch()
                setLoad(e)
                break;
            case "combat":
                resetSearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/getAllLink`).then(res => {
                    let link = res.data;
                    const combatFilter = link.filter(element => element.type === "Combat");
                    setAllLink(combatFilter)
                });

                break;
            case "logistique":
                resetSearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/getAllLink`).then(res => {
                    let link = res.data;
                    const logistiqueFilter = link.filter(element => element.type === "Logistique");
                    setAllLink(logistiqueFilter)
                });

                break;
            case "vol":
                resetSearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/getAllLink`).then(res => {
                    let link = res.data;
                    const volFilter = link.filter(element => element.type === "Vol");
                    setAllLink(volFilter)
                });

                break;
            case "autre":
                resetSearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/getAllLink`).then(res => {
                    let link = res.data;
                    const autreFilter = link.filter(element => element.type === "Autre");
                    setAllLink(autreFilter)
                });

                break;
            default:
                break;
        }

    }



    return (

        <div className='lienUtile'>

            <div className='lienUtile__top'>
                <div className='lienUtile__top__filter'>
                    <button id='tous' onClick={linkFilter}>Tous</button>
                    <button id='combat' onClick={linkFilter}>Combat</button>
                    <button id='logistique' onClick={linkFilter}>Logistique</button>
                    <button id='vol' onClick={linkFilter}>Vol</button>
                    <button id='autre' onClick={linkFilter}>Autre</button>
                </div>

                <div className='lienUtile__top__search'>
                    <span>
                        <input id='searchLink' onKeyUp={searchLink} type="text" name="search" placeholder="Recherche par mot clé" />
                    </span>
                </div>

            </div>


            <div className='lienUtile__bottom'>
                {allLink.map(link => (
                    <button className='lienUtile__bottom__button' onClick={redirect} data={link.link} type="button" key={link.id} id={link.id}>
                        {link.title}
                    </button>

                ))}

            </div>
        </div>




    );
};

export default LiensUtiles;