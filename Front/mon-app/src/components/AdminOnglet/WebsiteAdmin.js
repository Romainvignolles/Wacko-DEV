import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const WebsiteAdmin = () => {

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

    const [linkArray, setlinkArray] = useState([]);
    const [shipArray, setShipArray] = useState([]);

    const [linkId, setLinkId] = useState("");
    const [shipId, setShipId] = useState("");

    const [shipTitle, setShipTitle] = useState("");
    const [shipImage, setShipImage] = useState("");
    const [shipUrl, setShipUrl] = useState("");



    const fetchLink = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/getAllLink`)
            .then((res) => {
                setlinkArray(res.data)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    window.location = "/404";
                }
            })

    };

    const fetchShips = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/starships`)
            .then((res) => {
                setShipArray(res.data)
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    window.location = "/404";
                }
            })

    };

    useEffect(() => {
        fetchLink()
        fetchShips()
    }, [load]);

    //cibler des link au clic
    const displayDeleteLinkButton = (e) => {
        let linkList = document.querySelectorAll('.linkList')
        for (const link of linkList) {
            link.style.color = "white"
        }
        e.target.style.color = "red"
        setLinkId(e.target.id);
    }

    //cibler des vaisseaux au clic
    const displayDeleteShipsButton = (e) => {
        document.getElementById("formModifyShip").reset();

        let shipList = document.querySelectorAll('.shipList')
        for (const ship of shipList) {
            ship.style.color = "white"
        }
        e.target.style.color = "red"
        setShipId(e.target.id);
        setShipTitle(e.target.getAttribute("dataTitle"));
        setShipImage(e.target.getAttribute("dataImage"));
        setShipUrl(e.target.getAttribute("dataurl"));
    }

    //supprimer un lien
    const deleteLink = (e) => {

        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Êtes-vous sûr de vouloir supprimer ce lien ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        axios({
                            method: "DELETE",
                            url: `${process.env.REACT_APP_API_URL}api/deleteLink/${linkId}`,
                        })
                            .then((res) => {
                                setLoad(res)
                            })
                            .catch((err) => {
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

    //supprimer un vaisseau
    const deleteShip = (e) => {
        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Êtes-vous sûr de vouloir supprimer cette vaisseau ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        axios({
                            method: "DELETE",
                            url: `${process.env.REACT_APP_API_URL}api/starships/${shipId}`,
                        })
                            .then((res) => {
                                setLoad(res)
                                document.getElementById("formModifyShip").reset();
                                setShipTitle("");
                                setShipImage("");
                                setShipUrl("")

                            })
                            .catch((err) => {
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

    //ajouter un lien
    const addLink = (e) => {
        let type = ""
        let focusTitle = document.getElementById("linkTitle").value;
        let focusUrl = document.getElementById("linkUrl").value;

        let focusCombat = document.getElementById("combat").checked;
        let focusLogistique = document.getElementById("logistique").checked;
        let focusVol = document.getElementById("vol").checked;
        let focusAutre = document.getElementById("autre").checked;

        if (focusCombat) {
            type = "Combat"
        }
        if (focusLogistique) {
            type = "Logistique"
        }
        if (focusVol) {
            type = "Vol"
        }
        if (focusAutre) {
            type = "Autre"
        }

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/addLink`,
            data: {
                title: focusTitle,
                type: type,
                link: focusUrl
            }

        })
            .then((res) => {
                console.log(res);
                document.getElementById("linkTitle").value = "";
                document.getElementById("linkUrl").value = "";
                document.getElementById("combat").checked = false;
                document.getElementById("logistique").checked = false;
                document.getElementById("vol").checked = false;
                document.getElementById("autre").checked = false;
                setLoad(res)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    //ajouter un vaisseau
    const addShip = (e) => {
        let focusName = document.getElementById("ShipName").value;
        let focusUrl = document.getElementById("shipUrl").value;
        let focusImage = document.getElementById("shipImage").value;

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/addStarship`,
            data: {
                name: focusName,
                image: focusImage,
                link: focusUrl
            }

        })
            .then((res) => {
                console.log(res);
                document.getElementById("ShipName").value = "";
                document.getElementById("shipUrl").value = "";
                document.getElementById("shipImage").value = "";
                setLoad(res)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    //modifier un vaisseau
    const modifyShip = (e) => {

        let title = document.getElementById("ShipName").value;
        let image = document.getElementById("shipImage").value;
        let link = document.getElementById("shipUrl").value;

        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/modifyStarships/${shipId}`,
            data: {
                name: title,
                image,
                link
            }
        })
            .then((res) => {
                document.getElementById("formModifyShip").reset();
                setLoad(res)
                setShipTitle("");
                setShipImage("");
                setShipUrl("")
            })
            .catch((err) => {
            })
    }



    return (

        <div className='adminWebsite'>

            <div className='adminWebsite__card'>
                <h1>Liens Utiles</h1>
                <div className='adminWebsite__card__block'>
                    <div className='adminWebsite__card__block__displayLink'>
                        <h3>{linkArray.length} Liens Utiles:</h3>
                        <div className='adminWebsite__card__block__displayLink__list'>
                            {linkArray.map(link => (
                                <span className='linkList' onClick={displayDeleteLinkButton} key={link.id} id={link.id}>
                                    {link.title}
                                </span>
                            ))}
                        </div>

                    </div>
                    <div className='adminWebsite__card__block__addLink'>
                        <h3>Ajouter un lien:</h3>

                        <div className='adminWebsite__card__block__addLink__bottom'>
                            <input className='adminWebsite__card__block__addLink__bottom__input' id='linkTitle' type="text" name="titre" size="10" placeholder="Titre" />
                            <input className='adminWebsite__card__block__addLink__bottom__input' id='linkUrl' type="text" name="lien" size="10" placeholder="Lien" />
                            <fieldset>
                                <legend>Catégorie du lien</legend>

                                <div>
                                    <input type="radio" id="combat" name="type" />
                                    <label htmlFor="combat">Combat</label>
                                </div>

                                <div>
                                    <input type="radio" id="logistique" name="type" />
                                    <label htmlFor="logistique">Logistique</label>
                                </div>
                                <div>
                                    <input type="radio" id="vol" name="type" />
                                    <label htmlFor="vol">Vol</label>
                                </div>
                                <div>
                                    <input type="radio" id="autre" name="type" />
                                    <label htmlFor="autre">Autre</label>
                                </div>

                            </fieldset>

                            <button onClick={addLink}>Ajouter ce lien</button>
                            <button onClick={deleteLink} id='deleteLinkButton' className='adminWebsite__card__block__displayLink__button--delete'>Supprimer</button>

                        </div>


                    </div>

                </div>


            </div>
            <div className='adminWebsite__card'>
                <h1>Vaisseaux</h1>
                <div className='adminWebsite__card__block'>
                    <div className='adminWebsite__card__block__displayLink'>
                        <h3>{shipArray.length} vaisseaux:</h3>
                        <div className='adminWebsite__card__block__displayLink__list'>
                            {shipArray.map(ship => (
                                <span className='shipList' onClick={displayDeleteShipsButton} dataImage={ship.image} dataUrl={ship.link} dataTitle={ship.name} key={ship.id} id={ship.id}>
                                    {ship.name}
                                </span>
                            ))}
                        </div>

                    </div>
                    <div className='adminWebsite__card__block__addLink'>
                        <h3>Ajouter un vaisseau:</h3>
                        <div className='adminWebsite__card__block__addLink__bottom'>
                            <form id='formModifyShip'>
                                <input className='adminWebsite__card__block__addLink__bottom__input' id='ShipName' type="text" name="titre" size="10" placeholder="Nom du vaisseau" defaultValue={shipTitle} />
                                <input className='adminWebsite__card__block__addLink__bottom__input' id='shipUrl' type="text" name="lien" size="10" placeholder="Lien RSI" defaultValue={shipUrl} />
                                <input className='adminWebsite__card__block__addLink__bottom__input' id='shipImage' type="text" name="image" size="10" placeholder="Image" defaultValue={shipImage} />

                            </form>
                            <button onClick={addShip}>Ajouter le vaisseau</button>
                            <button onClick={modifyShip}>Modifier</button>
                            <button onClick={deleteShip} id='deleteShipsButton' className='adminWebsite__card__block__displayLink__button'>Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteAdmin;