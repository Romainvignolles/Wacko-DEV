import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const CreateEventPage = (props) => {

    const [formData, setformData] = useState("");
    const [load, setLoad] = useState("");
    const [allImage, setAllImage] = useState([]);




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
        window.location = "/AdminWebsite";

    }

    const saveEvent = (e) => {   //création de l'event
        e.preventDefault()
        const titre = document.getElementById('titre').value;
        const date = document.getElementById('date').value;
        const lieu = document.getElementById('lieu').value;
        const joueur = document.getElementById('joueur').value;
        const groupeur = document.getElementById('groupeur').value;

        const liveServer = document.getElementById('live').checked;
        const ptuServer = document.getElementById('PTU').checked;
        const selectedServer = liveServer ? 'Live' : ptuServer ? 'PTU' : '';

        const Niveau1 = document.getElementById('debutant').checked;
        const Niveau2 = document.getElementById('confirme').checked;
        const minLVL = Niveau1 ? 'Débutant' : Niveau2 ? 'Confirmé' : '';

        const crimestatYes = document.getElementById('Oui').checked;
        const crimestatNo = document.getElementById('Non').checked;
        const crimeStat = crimestatYes ? 'Oui' : crimestatNo ? 'Non' : '';

        const sectionVol = document.getElementById('vol').checked;
        const sectionCombat = document.getElementById('combat').checked;
        const sectionLogi = document.getElementById('logistique').checked;
        const sectionAll = document.getElementById('toute').checked;
        const eventType = sectionVol ? 'Vol' : sectionLogi ? 'Logistique' : sectionCombat ? 'Combat' : sectionAll ? 'Toute' : '';

        const gameplayFPS = document.getElementById('FPS').checked;
        const gameplayLesdeux = document.getElementById('lesdeux').checked;
        const dogfight = document.getElementById('dogfight').checked;
        const entrainement = document.getElementById('entrainement').checked;
        const multicrew = document.getElementById('multicrew').checked;
        const course = document.getElementById('course').checked;
        const logistique = document.getElementById('logisticien').checked;
        const equipe = document.getElementById('equipe').checked;
        const solo = document.getElementById('solo').checked;
        const divers = document.getElementById('divers').checked;
        const environnement = gameplayFPS ? 'FPS' : dogfight ? 'Dogfight' : equipe ? 'Equipe' : solo ? 'Solo' : divers ? 'Divers' : entrainement ? 'Entraînement' : multicrew ? 'Multicrew' : course ? 'Course' : logistique ? 'Logisticien' : gameplayLesdeux ? 'FPS/Pilotage' : '';

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
            axios({                 // envoi des informations pour la création de l'event
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/addEvent`,
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
                    toast.success('Évènement crée!', {
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
        getImage()
    }, [load]);


    return (

        <div className='createEventPage'>

            <div className='eventRight'>
                <div className='eventRight__top'>
                    <input id='titre' type="text" name="titre" placeholder="Titre" />
                    <input id='date' type="text" name="date" placeholder="Date" />
                    <input id='lieu' type="text" name="lieu" placeholder="Lieu" />
                    <input id='joueur' type="text" name="joueur" placeholder="Nbr joueurs" />
                    <input id='groupeur' type="text" name="groupeur" placeholder="Groupeur" />
                </div>

                <div className='eventRight__middle'>
                    <form>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Description de l'event:</p>"
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

                    <button id='send' onClick={saveEvent}>Enregistrer</button>
                    <ToastContainer />

                </div>
            </div>

            <div className='eventLeft'>
                <fieldset>
                    <legend>Serveur</legend>
                    <div>
                        <input type="radio" id="live" name="serveur" defaultChecked />
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
                        <input type="radio" id="debutant" name="niveau" defaultChecked />
                        <label htmlFor="debutant">Débutant</label>
                    </div>

                    <div>
                        <input type="radio" id="confirme" name="niveau" />
                        <label htmlFor="confirme">Confirmé</label>
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
                        <input type="radio" id="combat" name="Section" />
                        <label htmlFor="combat">combat</label>
                    </div>

                    <div>
                        <input type="radio" id="logistique" name="Section" />
                        <label htmlFor="logistique">logistique</label>
                    </div>

                    <div>
                        <input type="radio" id="vol" name="Section" />
                        <label htmlFor="vol">Vol</label>
                    </div>
                    <div>
                        <input type="radio" id="toute" name="Section" />
                        <label htmlFor="toute">Toute</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Gameplay</legend>
                    <div>
                        <input type="radio" id="FPS" name="Gameplay" />
                        <label htmlFor="FPS">FPS</label>
                    </div>
                    <div>
                        <input type="radio" id="dogfight" name="Gameplay" />
                        <label htmlFor="dogfight">Dogfight</label>
                    </div>
                    <div>
                        <input type="radio" id="lesdeux" name="Gameplay" />
                        <label htmlFor="lesdeux">FPS/Dogfight</label>
                    </div>
                    <div>
                        <input type="radio" id="entrainement" name="Gameplay" />
                        <label htmlFor="entrainement">Entraînement</label>
                    </div>
                    <div>
                        <input type="radio" id="multicrew" name="Gameplay" />
                        <label htmlFor="multicrew">Multicrew</label>
                    </div>
                    <div>
                        <input type="radio" id="course" name="Gameplay" />
                        <label htmlFor="course">Course</label>
                    </div>
                    <div>
                        <input type="radio" id="logisticien" name="Gameplay" />
                        <label htmlFor="logisticien">Logisticien</label>
                    </div>
                    <div>
                        <input type="radio" id="equipe" name="Gameplay" />
                        <label htmlFor="equipe">Equipes</label>
                    </div>
                    <div>
                        <input type="radio" id="solo" name="Gameplay" />
                        <label htmlFor="solo">Solo</label>
                    </div>
                    <div>
                        <input type="radio" id="divers" name="Gameplay" />
                        <label htmlFor="divers">Divers</label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Restriction de vaisseaux</legend>
                    <div>
                        <input type="radio" id="noForbidenShip" name="forbidenShip" defaultChecked />
                        <label htmlFor="noForbidenShip">Aucune</label>
                    </div>

                    <div>
                        <input type="text" onClick={forbidenShipRadioReset} id="yesForbidenShip" name="forbidenShip" placeholder="Restrictions" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Restriction d'armes</legend>
                    <div>
                        <input type="radio" id="noForbidenWeapon" name="forbidenWeapon" defaultChecked />
                        <label htmlFor="noForbidenWeapon">Aucune</label>
                    </div>

                    <div>
                        <input type="text" onClick={forbidenWeaponRadioReset} id="yesForbidenWeapon" name="forbidenWeapon" placeholder="Restrictions" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Stuff requis</legend>
                    <div>
                        <input type="radio" id="noStuff" name="stuff" defaultChecked />
                        <label htmlFor="noStuff">Aucun</label>
                    </div>

                    <div>
                        <input type="text" onClick={stuffRadioReset} id="yesStuff" name="stuff" placeholder="Stuff requis" />
                    </div>
                </fieldset>
            </div>
        </div>
    );
};

export default CreateEventPage;