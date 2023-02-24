import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 


const Admin = () => {

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

    const [load, setLoad] = useState();                               //permet un refresh dynamique de la page
    const [allMember, setAllMember] = useState([]);                   // array de la BDD utile pour les filtres
    const [allShip, setAllShip] = useState([]);                       // array de la réponse API ship
    const [member, setMember] = useState("");                         // membre selectionné au clic
    const [memberId, setMemberId] = useState("");                     // discriminator du membre selectionné au clic

    //recupération de tout les membres
    const fetchmember = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/auth/user`)
            .then((res) => {
                setAllMember(res.data)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    window.location = "/404";
                }
            })
    };
    useEffect(() => {
        fetchmember()
    }, [load]);


    //formulaire de recherche
    const searchMember = (e) => {
        let search = e.target.value;
        search = search.toUpperCase();
        let x = document.getElementsByClassName('member');

        for (const list of x) {
            if (!list.innerHTML.toUpperCase().includes(search)) {
                list.style.display = "none";
            }
            else {
                list.style.display = "block";
            }
        }
    }

    //afficher le membre selectionné
    const displayProfile = (e) => {

        let id = e.target.id;
        setMemberId(id)
        document.querySelector(".adminWacko__bottom__middle").style.display = "flex"


        axios.get(`${process.env.REACT_APP_API_URL}api/auth/user/${id}`)

            .then(res => {

                setMember(res.data);

                //affichage de la checkbox Gestion
                if (res.data.gestion) {
                    let checkbox = document.getElementById('checkbox');
                    checkbox.checked = true;
                }
                if (!res.data.gestion) {
                    let checkbox = document.getElementById('checkbox');
                    checkbox.checked = false;
                }
            });
    }

    //save modifications d'un joueur wacko
    const save = (e) => {

        let gestion = document.getElementById("checkbox").checked

        axios({                                                           // envoi des donnée recuperées vers la BDD via AXIOS
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/auth/admin/${memberId}`,

            data: {
                gestion: gestion,
            }
        })
            .then((res) => {
                let display = document.getElementById("actionDisplay");
                display.style.color = "green"
                display.innerHTML = "Profil mis a jour!"
                setTimeout(() => {
                    display.innerHTML = ""
                }, "3000")
            })
            .catch((err) => {
                if (err.response.data.message === "champs invalide") {
                    let display = document.getElementById("actionDisplay");
                    display.style.color = "red"
                    display.innerHTML = "Champs invalide!"
                    setTimeout(() => {
                        display.innerHTML = ""
                    }, "3000")


                }
            })

    }
       
    // delete un joueur
    const deleteUser = (e) => {

        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {

                        axios({                                                           // envoi des donnée recuperées vers la BDD via AXIOS
                            method: "DELETE",
                            url: `${process.env.REACT_APP_API_URL}api/auth/deleteUser/${memberId}`,
                        })
                            .then((res) => {
                                setLoad(res)
                                let display = document.getElementById("actionDisplay");
                                display.style.color = "green"
                                display.innerHTML = "Utilisateur Supprimé!"
                                setTimeout(() => {
                                    display.innerHTML = ""
                                }, "3000")
                            })
                            .catch((err) => {
                                let display = document.getElementById("actionDisplay");
                                display.style.color = "red"
                                display.innerHTML = "Erreur dans la suppréssion de l'utilisateur!"
                                setTimeout(() => {
                                    display.innerHTML = ""
                                }, "3000")
                            })
                        
                    }
                },
                {
                    label: 'Non',
                    onClick: () => {
                        // Code à exécuter si l'utilisateur clique sur "Non"
                    }
                }
            ]
        });

     

    }

    // mise a jour vaisseaux
    const shipUpdate = (e) => {

        let hangar = [];
        let page = 1;

        while (page <= 7) {

            axios({
                method: 'get',
                url: `https://api.fleetyards.net/v1/models?page=${page}`,
            })
                .then(function (res) {
                    hangar = hangar.concat(res.data);
                    setAllShip(hangar);

                });
            page++
        }

        for (const ships of allShip) {

            axios({                                                           // ajoute les ships a la BDD depuis L'API
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/addStarship`,

                data: {
                    name: ships.name,
                    image: ships.storeImage,
                    link: ships.storeUrl,
                }
            })
                .then((res) => {
                    setLoad(res)

                })
                .catch((err) => {
                })


        }
    }

    return (
        <div className='adminWacko'>
            <div className='adminWacko__bottom'>
                <div className='adminWacko__bottom__left'>
                    <input id='searchMember' className='adminWacko__bottom__left__search' onKeyUp={searchMember} type="text" name="search" placeholder="Recherche" />
                    <div className='adminWacko__bottom__left__list'>
                        {allMember.map(membre => (
                            <span className='member' onClick={displayProfile} key={membre.id} id={membre.discriminator}>
                                {membre.pseudo}
                            </span>
                        ))}
                    </div>
                </div>

                <div className='adminWacko__bottom__middle'>
                    <div className='adminWacko__bottom__middle__wacko'>
                        <h1>{member.pseudo}</h1>
                        <div className='adminWacko__bottom__middle__wacko__bottom'>
                            <div className='adminWacko__bottom__middle__wacko__bottom__checkbox'>
                                <input type="checkbox" id="checkbox" name="checkbox" />
                                <label htmlFor="checkbox" >Administrateur</label>
                            </div>

                        </div>
                        <div className='adminWacko__bottom__middle__wacko__button'>
                            <button className='button1' onClick={deleteUser}>Supprimer du site</button>
                            <button className='button2' onClick={save}>Sauvegarder</button>
                        </div>


                        <p id="actionDisplay"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;