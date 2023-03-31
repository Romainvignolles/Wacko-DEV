import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




const AdminImage = (props) => {

    const [allImage, setAllImage] = useState([]);
    const [load, setLoad] = useState("");



    const addImage = (e) => {       // ajouter une image
        let inputFile = document.getElementById("avatar").files[0];   // récupération du fichier image

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/addImage`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: {
                image: inputFile,
            }
        })
            .then((res) => {
                setLoad(res)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const getImage = (e) => {       // recupère les images
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/getImage`,
            headers: {
                "Content-Type": "multipart/form-data",
            },

        })
            .then((res) => {
                setAllImage(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const hoverOn = (e) => {        // affichage du SVG
        let focus = e.target.firstChild
        focus.style.display = "initial"
    }

    const hoverOff = (e) => {       // hide du SVG
        let focus = e.target.firstChild
        focus.style.display = "none"
    }

    const deleteImage = (e) => {    // supprimer une image

        let imageId = e.target.getAttribute("data-id")
        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Êtes-vous sûr de vouloir supprimer cette image ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        axios({
                            method: "delete",
                            url: `${process.env.REACT_APP_API_URL}api/deleteImage/${imageId}`,
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

    useEffect(() => {
        getImage()
    }, [load]);


    return (

        <div className='adminImage'>
            <div className='adminImage__top'>
                <h1>Background d'évent</h1>
                <div className='file'>
                    <label htmlFor="avatar">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.5 3V5.5M18.5 8V5.5M18.5 5.5H16M18.5 5.5H21" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        1920x1080 suggéré
                    </label>  
                    <input onChange={addImage} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                </div>

            </div>

            <div className='displayAllImage'>

                {allImage.map(image => (
                    <div onPointerEnter={hoverOn} onPointerLeave={hoverOff} key={image.id} id={image.id} className='displayAllImage__display'>
                        <button onClick={deleteImage} data-id={image.id} ><FontAwesomeIcon id='deleteIcon' icon={faXmark} /></button>
                        <img src={image.image} className="displayAllImage__image" alt="" />
                    </div>

                ))}

            </div>




        </div>
    );
};

export default AdminImage;