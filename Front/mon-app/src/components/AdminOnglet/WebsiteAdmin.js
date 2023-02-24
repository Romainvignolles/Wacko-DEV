import React, { useEffect, useState } from 'react';
import axios from 'axios';


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

    //afficher le bouton supprimer des link
    const displayDeleteLinkButton = (e) => {
        let linkList = document.querySelectorAll('.linkList')
        for (const link of linkList) {
            link.style.color = "white"
        }
        document.getElementById("deleteLinkButton").style.display = "flex";
        e.target.style.color = "red"
        setLinkId(e.target.id);
    }

    //afficher le bouton supprimer des vaisseaux
    const displayDeleteShipsButton = (e) => {
        let shipList = document.querySelectorAll('.shipList')
        for (const ship of shipList) {
            ship.style.color = "white"
        }
        document.getElementById("deleteShipsButton").style.display = "flex";
        e.target.style.color = "red"
        setShipId(e.target.id);
    }

    //supprimer un lien
    const deleteLink = (e) => {

        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/deleteLink/${linkId}`,
        })
            .then((res) => {
                console.log(res);
                setLoad(res)
                document.getElementById("deleteLinkButton").style.display = "none";
            })
            .catch((err) => {
                console.log(err);
            })

    }

    //supprimer un lien
    const deleteShip = (e) => {

        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/starships/${shipId}`,
        })
            .then((res) => {
                console.log(res);
                setLoad(res)
                document.getElementById("deleteShipsButton").style.display = "none";
            })
            .catch((err) => {
                console.log(err);
            })

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
                        <button onClick={deleteLink} id='deleteLinkButton' className='adminWebsite__card__block__displayLink__button'>Supprimer</button>

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
                                <span className='shipList' onClick={displayDeleteShipsButton} key={ship.id} id={ship.id}>
                                    {ship.name}
                                </span>
                            ))}
                        </div>
                        <button onClick={deleteShip} id='deleteShipsButton' className='adminWebsite__card__block__displayLink__button'>Supprimer</button>

                    </div>
                    <div className='adminWebsite__card__block__addLink'>
                        <h3>Ajouter un vaisseau:</h3>
                        <div className='adminWebsite__card__block__addLink__bottom'>
                            <input className='adminWebsite__card__block__addLink__bottom__input' id='ShipName' type="text" name="titre" size="10" placeholder="Nom du vaisseau" />
                            <input className='adminWebsite__card__block__addLink__bottom__input' id='shipUrl' type="text" name="lien" size="10" placeholder="Lien RSI" />
                            <input className='adminWebsite__card__block__addLink__bottom__input' id='shipImage' type="text" name="image" size="10" placeholder="Image" />
                            <button onClick={addShip}>Ajouter ce vaisseau</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteAdmin;