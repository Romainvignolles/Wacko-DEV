import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



const Profil = () => {

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

    let discriminator = parseInt(localStorage.getItem('discriminator')); //récupération du discriminator depuis le local storage 

    const [load, setLoad] = useState();                               //permet un refresh dynamique de la page
    const [memberOnline, setMemberOnline] = useState([]);
    const [allStarships, setAllStarships] = useState([]);
    const [hangarArray, setHangarArray] = useState([]);
    const [date, setDate] = useState("");


    //affichage de tout les vaisseaux dans le formulaire
    const fetchAllStarships = async () => {
        const result = await axios(`${process.env.REACT_APP_API_URL}api/starships`)
        setAllStarships(result.data)
    };

    //recupération du membre connecté
    const fetchUser = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/auth/user/${discriminator}`)
            .then((res) => {
                setHangarArray(res.data.vaisseaus)
                setMemberOnline(res.data)

                let date = res.data.date
                date = date.split("T")
                date = date[0].split("-")
                date.reverse()
                date = date.join("-")
                setDate(date)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    window.location = "/404";
                }
            })

    };

    useEffect(() => {
        fetchAllStarships()
        fetchUser();
    }, [load]);

    // Ajouter un vaisseau au hangar perso
    const addHangarEntrie = (e) => {

        let focus = document.getElementById("input").value;
        let ship = allStarships.find(element => element.name === focus);
        if (!ship) {
            let display = document.getElementById("actionDisplay");
            display.style.color = "red"
            display.innerHTML = "ce vaisseau n'existe pas"
            setTimeout(() => {
                display.innerHTML = ""
            }, "3000")
        }
        let shipId = ship.id
        let user = memberOnline.id;

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/addHangar`,

            data: {
                utilisateurId: user,
                vaisseauId: shipId
            }
        })
            .then((res) => {
                document.getElementById("input").value = "";
                setLoad(res)

                let display = document.getElementById("actionDisplay");
                display.style.color = "green"
                display.innerHTML = "Vaisseau ajouté au hangar"
                setTimeout(() => {
                    display.innerHTML = ""
                }, "3000")

            })
            .catch((err) => {
            })
    }

    // Supprimer un vaisseau du hangar perso
    const deleteShip = (e) => {
        let userId = memberOnline.id;

        let focus = e.target
        let cibling = focus.parentElement
        let shipId = cibling.parentElement.id

        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/deleteHangar/${shipId}/${userId}`,

        })
            .then((res) => {
                let display = document.getElementById("actionDisplay");
                display.style.color = "green"
                display.innerHTML = "Vaisseau supprimé du hangar"
                setTimeout(() => {
                    display.innerHTML = ""
                }, "3000")

                setLoad(res)
            })
            .catch((err) => {
            })



    }
    
    return (

        <div className='profil'>
            <div className='profil__left'>
                <h1>Mon hangar:</h1>
                <div className='profil__left__search'>
                    <input id="input" list="select" placeholder="Ajouter un vaisseau a votre hangar" />
                    <datalist id="select" type='text' name="ships" >
                        {allStarships.map(vaisseaux => (
                            <option data={vaisseaux.name} key={vaisseaux.id} id={vaisseaux.id} >
                                {vaisseaux.name}
                            </option>
                        ))}
                    </datalist>
                    <button onClick={addHangarEntrie}>Ajouter</button>
                </div>


                <div className='profil__left__list'>
                    {hangarArray.map(ship => (
                        <div className='profil__left__list__card' key={ship.id} id={ship.id}>
                            <img src={ship.image} alt="" />
                            <span>
                                <h2>{ship.name}</h2>
                                <button className='profil__hangar__list__deleteButton' onClick={deleteShip} ><FontAwesomeIcon icon={faXmark} /></button>
                            </span>

                        </div>
                    ))}
                </div>

                <p id="actionDisplay" > </p>

            </div>
            <div className='profil__right'>
                <img src={memberOnline.image} alt="avatar" />
                <h1>{memberOnline.pseudo}</h1>
                <span className='profil__right__bottom'>
                    <span>{memberOnline.role} WACKO </span>
                    <span>depuis le {date} </span>
                </span>
                {memberOnline.gestion === true && <Link to="/Administration">Administration</Link>}
            </div>
        </div>
    );
};

export default Profil;