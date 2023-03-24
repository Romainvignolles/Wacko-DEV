import axios from 'axios';
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 





const CreateEventPage = (props) => {

    let eventID = localStorage.getItem("eventID")
    let userDiscriminator = localStorage.getItem("discriminator")

    const [load, setLoad] = useState("");
    const [allImage, setAllImage] = useState([]);


    const [formData, setformData] = useState("");  // state pour le formulaire CKEditor

    const [image, setImage] = useState("");
    const [description, setDescription] = useState([]);


    const [titre, setTitre] = useState("");
    const [date, setDate] = useState("");
    const [lieu, setLieu] = useState("");
    const [joueur, setJoueur] = useState("");
    const [groupeur, setGroupeur] = useState("");

    const [gameplay, setGameplay] = useState("");
    const [serveur, setServeur] = useState("");
    const [niveau, setNiveau] = useState("");
    const [crimestat, setCrimestat] = useState("");
    const [section, setSection] = useState("");

    const [forbidenShip, setForbidenShip] = useState("");
    const [forbidenWeapon, setForbidenWeapon] = useState("");
    const [stuff, setStuff] = useState("");




    const forbidenShipRadioReset = (e) => {                 //reset radio button
        document.getElementById('noForbidenShip').checked = false
    }
    const forbidenWeaponRadioReset = (e) => {               //reset radio button
        document.getElementById('noForbidenWeapon').checked = false
    }
    const stuffRadioReset = (e) => {                        //reset radio button
        document.getElementById('noStuff').checked = false
    }
    const back = (e) => {                        // boutton retour
        window.location = "/Event";
    }
    const deleteEvent = (e) => {                  // supprimer l'event
        confirmAlert({
            title: 'Confirmer la suppression',
            message: 'Êtes-vous sûr de vouloir supprimer cet évènement ?',
            buttons: [
                {
                    label: 'Oui',
                    onClick: () => {
                        axios({
                            method: "delete",
                            url: `${process.env.REACT_APP_API_URL}api/deleteEvent/${eventID}`,
                        })
                            .then((res) => {
                                window.location = "/Event";
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

    const modifyEvent = (e) => {   //création de l'event
        e.preventDefault()
        const titre = document.getElementById('titre').value;
        const date = document.getElementById('date').value;
        const lieu = document.getElementById('lieu').value;
        const joueur = document.getElementById('joueur').value;
        const groupeur = document.getElementById('groupeur').value;

        const liveServer = document.getElementById('Live').checked;
        const ptuServer = document.getElementById('PTU').checked;
        const selectedServer = liveServer ? 'Live' : ptuServer ? 'PTU' : '';

        const Niveau1 = document.getElementById('Débutant').checked;
        const Niveau2 = document.getElementById('Confirmé').checked;
        const minLVL = Niveau1 ? 'Débutant' : Niveau2 ? 'Confirmé' : '';

        const crimestatYes = document.getElementById('Oui').checked;
        const crimestatNo = document.getElementById('Non').checked;
        const crimeStat = crimestatYes ? 'Oui' : crimestatNo ? 'Non' : '';

        const sectionVol = document.getElementById('Vol').checked;
        const sectionCombat = document.getElementById('Combat').checked;
        const sectionLogi = document.getElementById('Logistique').checked;
        const sectionAll = document.getElementById('Toute').checked;
        const eventType = sectionVol ? 'Vol' : sectionLogi ? 'Logistique' : sectionCombat ? 'Combat' : sectionAll ? 'Toute' : '';

        const gameplayFPS = document.getElementById('FPS').checked;
        const gameplayLesdeux = document.getElementById('FPS/Dogfight').checked;
        const dogfight = document.getElementById('Dogfight').checked;
        const entrainement = document.getElementById('Entraînement').checked;
        const multicrew = document.getElementById('Multicrew').checked;
        const course = document.getElementById('Course').checked;
        const logistique = document.getElementById('Logisticien').checked;
        const equipe = document.getElementById('Equipes').checked;
        const solo = document.getElementById('Solo').checked;
        const divers = document.getElementById('Divers').checked;
        const environnement = gameplayFPS ? 'FPS' : dogfight ? 'Dogfight' : equipe ? 'Equipes' : solo ? 'Solo' : divers ? 'Divers' : entrainement ? 'Entraînement' : multicrew ? 'Multicrew' : course ? 'Course' : logistique ? 'Logisticien' : gameplayLesdeux ? 'FPS/Dogfight' : '';

        const noForbidenShip = document.getElementById('noForbidenShip').checked;
        const yesForbidenShip = document.getElementById('yesForbidenShip').value;
        const forbidenShip = noForbidenShip ? 'Pas de restrictions' : yesForbidenShip;

        const noForbidenWeapon = document.getElementById('noForbidenWeapon').checked;
        const yesForbidenWeapon = document.getElementById('yesForbidenWeapon').value;
        const forbidenWeapon = noForbidenWeapon ? 'Pas de restrictions' : yesForbidenWeapon;

        const noStuff = document.getElementById('noStuff').checked;
        const yesStuff = document.getElementById('yesStuff').value;
        const stuff = noStuff ? 'Pas de stuff requis' : yesStuff;

        let image = document.getElementsByClassName("swiper-slide swiper-slide-visible swiper-slide-active")[0].firstChild
        image = image.src


        if (titre === "" || date === "" || lieu === "" || environnement === "" || formData === "" || joueur === "" || selectedServer === "" || minLVL === "" || crimeStat === "" || forbidenShip === "" || forbidenWeapon === "" || groupeur === "" || stuff === "" || eventType === "") {
            let display = document.getElementById("eventErrorMessage")
            display.innerText = "Champs invalide ou incomplet"
            setTimeout(() => {
                display.innerHTML = ""
            }, "3000")

        } else {
            axios({                 // envoi des informations pour la modification de l'event
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/modifyEvent/${eventID}/${userDiscriminator}`,
                data: {
                    titre,
                    date,
                    lieu,
                    environnement,
                    description: formData,
                    joueur,
                    serveur: selectedServer,
                    niveau: minLVL,
                    crimeStat,
                    forbidenShip,
                    forbidenWeapon,
                    groupeur,
                    stuff,
                    eventType,
                    image,
                }
            })
                .then((res) => {
                    toast.success('Modifications éffectuées!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

                    setTimeout(() => {
                        window.location = "/Event";
                    }, "3000")


                })
                .catch((err) => {
                    if (err.response.data.error.name === "SequelizeUniqueConstraintError") {
                        let display = document.getElementById("eventErrorMessage")
                        display.innerText = "Ce titre d'event existe déja"
                        setTimeout(() => {
                            display.innerHTML = ""
                        }, "3000")
                    }
                })

        }

    }

    const displayEvent = async (e) => { //recupération de l'event a modifier

        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/getOneEvent/${eventID}`,
        })
            .then((res) => {

                setImage(res.data.image);
                setDescription(res.data.description)

                setTitre(res.data.titre);
                setDate(res.data.date);
                setLieu(res.data.lieu);
                setJoueur(res.data.joueur);
                setGroupeur(res.data.groupeur);

                setGameplay(res.data.environnement);
                setServeur(res.data.serveur);
                setNiveau(res.data.niveau);
                setCrimestat(res.data.crimeStat);
                setSection(res.data.eventType);

                setForbidenShip(res.data.forbidenShip);
                setForbidenWeapon(res.data.forbidenWeapon);
                setStuff(res.data.stuff);

                document.getElementById(gameplay).checked = true
                document.getElementById(serveur).checked = true
                document.getElementById(niveau).checked = true
                document.getElementById(crimestat).checked = true
                document.getElementById(section).checked = true

                if (forbidenShip === "Pas de restrictions") {
                    document.getElementById('noForbidenShip').checked = true
                } else {
                    document.getElementById('yesForbidenShip').defaultValue = forbidenShip

                }

                if (forbidenWeapon === "Pas de restrictions") {
                    document.getElementById('noForbidenWeapon').checked = true
                } else {
                    document.getElementById('yesForbidenWeapon').defaultValue = forbidenWeapon

                }

                if (stuff === "Pas de stuff requis") {
                    document.getElementById('noStuff').checked = true
                } else {
                    document.getElementById('yesStuff').defaultValue = stuff

                }


            })
            .catch((err) => {
            })



    }

    const getImage = (e) => {   // recupère les images 
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/getImage`,
            headers: {
                "Content-Type": "multipart/form-data",
            },

        })
            .then((res) => {
                console.log(res);
                setAllImage(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }



    useEffect(() => {
        displayEvent()
        getImage()
    }, [gameplay]);


    return (

        <div className='createEventPage'>

            <div className='eventRight'>
                <div className='eventRight__top'>
                    <input id='titre' type="text" name="titre" placeholder="Titre" defaultValue={titre} />
                    <input id='date' type="text" name="date" placeholder="Date" defaultValue={date} />
                    <input id='lieu' type="text" name="lieu" placeholder="Lieu" defaultValue={lieu} />
                    <input id='joueur' type="text" name="joueur" placeholder="Nbr joueurs" defaultValue={joueur} />
                    <input id='groupeur' type="text" name="groupeur" placeholder="Groupeur" defaultValue={groupeur} />
                </div>

                <div className='eventRight__middle'>
                    <form>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setformData(data)
                                // console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                // console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                // console.log('Focus.', editor);
                            }}
                        />

                    </form>
                    <div className='swiperElement'>
                        <h3>Background de l'event</h3>
                        <Swiper
                            effect={"coverflow"}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={"auto"}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src={image} alt="" />
                            </SwiperSlide>
                            {allImage.map(image => (
                                    <SwiperSlide key={image.id} id={image.id} >
                                        <img src={image.image} alt="" />
                                    </SwiperSlide>
                                ))}

                        </Swiper>
                    </div>

                </div>

                <div className='eventRight__bot'>

                    <button id='back' onClick={back}>Retour</button>

                    <p id='eventErrorMessage'></p>
                    <button id='delete' onClick={deleteEvent}>Supprimer</button>

                    <button id='send' onClick={modifyEvent}>Enregistrer</button>
                    <ToastContainer />

                </div>
            </div>

            <div className='eventLeft'>
                <fieldset>
                    <legend>Serveur</legend>
                    <div>
                        <input type="radio" id="Live" name="serveur" />
                        <label htmlFor="live">Live</label>
                    </div>

                    <div>
                        <input type="radio" id="PTU" name="serveur" />
                        <label htmlFor="PTU">PTU</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Niveau minimum requis</legend>
                    <div>
                        <input type="radio" id="Débutant" name="niveau" />
                        <label htmlFor="Débutant">Débutant</label>
                    </div>

                    <div>
                        <input type="radio" id="Confirmé" name="niveau" />
                        <label htmlFor="Confirmé">Confirmé</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Crimestat autorisé</legend>
                    <div>
                        <input type="radio" id="Oui" name="Crimestat" />
                        <label htmlFor="Oui">Oui</label>
                    </div>

                    <div>
                        <input type="radio" id="Non" name="Crimestat" />
                        <label htmlFor="Non">Non</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Section</legend>
                    <div>
                        <input type="radio" id="Combat" name="Section" />
                        <label htmlFor="Combat">combat</label>
                    </div>

                    <div>
                        <input type="radio" id="Logistique" name="Section" />
                        <label htmlFor="Logistique">logistique</label>
                    </div>

                    <div>
                        <input type="radio" id="Vol" name="Section" />
                        <label htmlFor="Vol">Vol</label>
                    </div>
                    <div>
                        <input type="radio" id="Toute" name="Section" />
                        <label htmlFor="Toute">Toute</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Gameplay</legend>
                    <div>
                        <input type="radio" id="FPS" name="Gameplay" />
                        <label htmlFor="FPS">FPS</label>
                    </div>

                    <div>
                        <input type="radio" id="Dogfight" name="Gameplay" />
                        <label htmlFor="dogfight">Dogfight</label>
                    </div>

                    <div>
                        <input type="radio" id="FPS/Dogfight" name="Gameplay" />
                        <label htmlFor="FPS/Dogfight">FPS/Dogfight</label>
                    </div>
                    <div>
                        <input type="radio" id="Entraînement" name="Gameplay" />
                        <label htmlFor="Entraînement">Entraînement</label>
                    </div>
                    <div>
                        <input type="radio" id="Multicrew" name="Gameplay" />
                        <label htmlFor="Multicrew">Multicrew</label>
                    </div>
                    <div>
                        <input type="radio" id="Course" name="Gameplay" />
                        <label htmlFor="Course">Course</label>
                    </div>
                    <div>
                        <input type="radio" id="Logisticien" name="Gameplay" />
                        <label htmlFor="Logisticien">Logisticien</label>
                    </div>
                    <div>
                        <input type="radio" id="Equipes" name="Gameplay" />
                        <label htmlFor="Equipes">Equipes</label>
                    </div>
                    <div>
                        <input type="radio" id="Solo" name="Gameplay" />
                        <label htmlFor="Solo">Solo</label>
                    </div>
                    <div>
                        <input type="radio" id="Divers" name="Gameplay" />
                        <label htmlFor="Divers">Divers</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Restriction de vaisseaux</legend>
                    <div>
                        <input type="radio" id="noForbidenShip" name="forbidenShip" />
                        <label htmlFor="noForbidenShip">Aucune</label>
                    </div>

                    <div>
                        <input type="text" onChange={forbidenShipRadioReset} id="yesForbidenShip" name="forbidenShip" placeholder="Restrictions" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Restriction d'armes</legend>
                    <div>
                        <input type="radio" id="noForbidenWeapon" name="forbidenWeapon" />
                        <label htmlFor="noForbidenWeapon">Aucune</label>
                    </div>

                    <div>
                        <input type="text" onChange={forbidenWeaponRadioReset} id="yesForbidenWeapon" name="forbidenWeapon" placeholder="Restrictions" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Stuff requis</legend>
                    <div>
                        <input type="radio" id="noStuff" name="stuff" />
                        <label htmlFor="noStuff">Aucun</label>
                    </div>

                    <div>
                        <input type="text" onChange={stuffRadioReset} id="yesStuff" name="stuff" placeholder="Stuff requis" />
                    </div>
                </fieldset>
            </div>
        </div>
    );
};

export default CreateEventPage;