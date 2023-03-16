import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';





const CreateEventPage = (props) => {

    const [formData, setformData] = useState("");


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
        const eventType = sectionVol ? 'Vol' : sectionLogi ? 'Logistique' : sectionCombat ? 'Combat' : '';

        const gameplayFPS = document.getElementById('FPS').checked;
        const gameplayPilotage = document.getElementById('pilotage').checked;
        const gameplayLesdeux = document.getElementById('lesdeux').checked;
        const environnement = gameplayFPS ? 'FPS' : gameplayPilotage ? 'Pilotage' : gameplayLesdeux ? 'FPS/Pilotage' : '';

        const noForbidenShip = document.getElementById('noForbidenShip').checked;
        const yesForbidenShip = document.getElementById('yesForbidenShip').value;
        const forbidenShip = noForbidenShip ? 'Aucun' : yesForbidenShip;

        const noForbidenWeapon = document.getElementById('noForbidenWeapon').checked;
        const yesForbidenWeapon = document.getElementById('yesForbidenWeapon').value;
        const forbidenWeapon = noForbidenWeapon ? 'Aucun' : yesForbidenWeapon;

        const noStuff = document.getElementById('noStuff').checked;
        const yesStuff = document.getElementById('yesStuff').value;
        const stuff = noStuff ? 'Aucun' : yesStuff;


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
            }
        })
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <div className='createEventPage'>

            <div className='eventRight'>
                <div className='eventRight__top'>
                    <input id='titre' type="text" name="titre" placeholder="Titre" />
                    <input id='date' type="text" name="date" placeholder="date" />
                    <input id='lieu' type="text" name="lieu" placeholder="lieu" />
                    <input id='joueur' type="text" name="joueur" placeholder="Nbr joueurs" />
                    <input id='groupeur' type="text" name="groupeur" placeholder="Groupeur" />
                </div>

                <div className='eventRight__middle'>
                    <form>
                        <label htmlFor="message">Message :</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
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


                </div>

                <div className='eventRight__bot'>

                    <button id='back' onClick={back}>
                        Retour
                    </button>

                    <button id='send' onClick={saveEvent}>Enregistrer </button>

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
                </fieldset>
                <fieldset>
                    <legend>Gameplay</legend>
                    <div>
                        <input type="radio" id="FPS" name="Gameplay" />
                        <label htmlFor="FPS">FPS</label>
                    </div>

                    <div>
                        <input type="radio" id="pilotage" name="Gameplay" />
                        <label htmlFor="pilotage">Pilotage</label>
                    </div>

                    <div>
                        <input type="radio" id="lesdeux" name="Gameplay" />
                        <label htmlFor="lesdeux">FPS/Pilotage</label>
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