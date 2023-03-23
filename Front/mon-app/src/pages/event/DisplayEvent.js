import React, { useCallback, useRef, useEffect, useState } from "react";
import axios from 'axios';


import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


const EventPage = (props) => {

    let discriminator = localStorage.getItem('discriminator'); //récupération du discriminator depuis le local storage 

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


    const [oneEvent, setOneEvent] = useState([]);
    const [load, setLoad] = useState("");
    const [userAdmin, setUserAdmin] = useState(false);

    const fetchOneEvent = () => {              //recupération des events
        let eventID = localStorage.getItem("eventID")
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/getOneEvent/${eventID}`,
        })
            .then((res) => {
                setOneEvent(res.data)
                setLoad(res)

            })
            .catch((err) => {
            })
    }

    const fetchUser = () => {                //recupération du membre connecté
        axios(`${process.env.REACT_APP_API_URL}api/auth/user/${discriminator}`)
            .then((res) => {
                setUserAdmin(res.data.gestion)
            })
            .catch((err) => {
            })

    };

    const description = () => {     // afficher le contenue de CKeditor
        document.getElementById("eventDescription").innerHTML = oneEvent.description;
    }
    const modifyEvent = () => {     // bouton vers la modification de l'event
        window.location = "/modifyEvent";
    }
    const ScreenShot = () => {      // boutton pour dll l'image de l'event

        document.getElementById("modifyButton").style.visibility = "hidden";
        document.getElementById("DLLButton").style.visibility = "hidden";

        htmlToImage.toJpeg(document.getElementById('screen'), { width: "1920", height: "937" })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `${oneEvent.titre}.jpeg`;
                link.href = dataUrl;
                link.click();
                document.getElementById("modifyButton").style.visibility = "visible";
                document.getElementById("DLLButton").style.visibility = "visible";

            });

    }

    useEffect(() => {
        fetchOneEvent()
        fetchUser()
    }, []);

    useEffect(() => {
        description()
    }, [load]);






    return (

        <div id="screen" className="displayEvent">
            <div className="displayEvent__info">
                <div className="displayEvent__title" >
                    {userAdmin === true && <div className="adminButton">
                        <button id="modifyButton" onClick={modifyEvent}>Modifier/Supprimer</button>
                        <button id="DLLButton" onClick={ScreenShot}>Enregistrer</button>
                    </div>
                    }

                    <h3>{oneEvent.date}</h3>
                    <h1>{oneEvent.titre}</h1>
                    <h3>{oneEvent.lieu}</h3>

                    {oneEvent.eventType === "Logistique" &&
                        <svg id="roleSvg" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" class="si-glyph si-glyph-hammer-and-wrench"><g stroke="none" stroke-width="1" fill-rule="evenodd"><g transform="translate(0.000000, 1.000000)" ><g><path d="M14.217,14.949 C14.748,15.482 15.076,15.103 15.512,14.668 C15.948,14.233 16.326,13.904 15.795,13.372 C15.795,13.372 8.393,5.977 6.565,4.154 L4.987,5.731 L14.217,14.949 L14.217,14.949 Z" class="si-glyph-fill"></path><path d="M2.048,7.015 L2.662,6.411 C2.662,6.411 2.391,5.668 2.788,5.312 C3.185,4.956 3.855,5.176 3.855,5.176 L6.01,3.093 C6.01,3.093 5.859,2.01 6.059,1.81 C6.259,1.61 8.494,0.521 8.71,0.303 L8.251,-0.156 C8.251,-0.156 5.123,0.22 4.784,0.558 C4.585,0.758 3.096,2.262 2.034,3.324 C2.034,3.324 2.3,4.083 1.95,4.433 C1.599,4.784 0.809,4.533 0.809,4.533 C0.436,4.906 0.186,5.155 0.186,5.155 C-0.077,5.42 0.078,5.792 0.401,6.115 L1.087,6.801 C1.412,7.125 1.785,7.278 2.048,7.015 L2.048,7.015 Z" class="si-glyph-fill"></path></g><path d="M11.733,5.515 C12.81,6.026 14.161,5.869 15.055,4.975 C15.745,4.285 16.019,3.336 15.872,2.444 L14.351,3.963 L13.057,4.284 L11.595,2.842 L11.938,1.505 L13.445,0.017 C12.552,-0.129 11.543,0.082 10.853,0.773 C9.958,1.668 9.836,3.052 10.347,4.13 L9.353,5.123 C9.79,5.558 10.257,6.025 10.741,6.508 L11.733,5.515 L11.733,5.515 Z" class="si-glyph-fill"></path><path d="M7.432,10.119 L5.927,8.615 L4.619,9.924 C4.537,10.004 4.479,10.095 4.438,10.19 C4.361,10.16 4.318,10.159 4.291,10.17 C4.041,10.087 3.777,10.031 3.5,10.031 C2.119,10.031 1,11.136 1,12.5 C1,13.864 2.119,14.969 3.5,14.969 C4.881,14.969 6,13.864 6,12.5 C6,12.217 5.941,11.949 5.854,11.696 C5.849,11.672 5.848,11.65 5.834,11.615 C5.938,11.572 6.036,11.514 6.122,11.427 L7.432,10.119 L7.432,10.119 Z M3.5,13.938 C2.688,13.938 2.031,13.295 2.031,12.5 C2.031,11.705 2.687,11.062 3.5,11.062 C4.313,11.062 4.969,11.705 4.969,12.5 C4.969,13.295 4.312,13.938 3.5,13.938 L3.5,13.938 Z" class="si-glyph-fill"></path></g></g></svg>
                    }
                    {oneEvent.eventType === "Combat" &&
                        <svg id="roleSvg" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 503.607 503.607" ><g><g><g><rect x="83.933" y="235.016" width="100.721" height="184.656" /><polygon points="167.868,191.067 167.868,151.08 100.721,151.08 100.721,191.067 87.14,218.228 181.449,218.228 " /><path d="M153.048,41.682l-10.71-35.697C141.272,2.434,137.999,0,134.297,0c-3.71,0-6.975,2.434-8.041,5.985l-10.718,35.697 c-9.031,30.107-13.765,61.23-14.512,92.613h66.535C166.813,102.912,162.079,71.789,153.048,41.682z" /><path d="M177.196,458.165c0.26-0.688,0.529-1.368,0.713-2.09l4.902-19.615H85.775l4.893,19.615 c0.185,0.722,0.453,1.402,0.722,2.09c-4.516,3.794-7.453,9.417-7.453,15.763v8.998c0,11.407,9.275,20.681,20.681,20.681h59.358 c11.398,0,20.681-9.275,20.681-20.681v-8.998C184.658,467.583,181.72,461.959,177.196,458.165z" /><polygon points="402.885,258.214 402.885,218.228 335.737,218.228 335.737,258.214 322.157,285.375 416.465,285.375 			" /><rect x="318.95" y="302.164" width="100.721" height="117.508" /><path d="M388.065,108.829l-10.71-35.697c-1.066-3.55-4.339-5.984-8.041-5.984c-3.71,0-6.975,2.434-8.041,5.984l-10.718,35.697 c-9.031,30.107-13.765,61.23-14.512,92.613h66.535C401.83,170.06,397.096,138.937,388.065,108.829z" /><path d="M412.212,458.165c0.26-0.688,0.529-1.368,0.713-2.09l4.902-19.615h-97.037l4.893,19.615 c0.185,0.722,0.453,1.402,0.722,2.09c-4.516,3.794-7.453,9.417-7.453,15.763v8.998c0,11.407,9.275,20.681,20.681,20.681h59.358 c11.398,0,20.681-9.275,20.681-20.681v-8.998C419.674,467.583,416.737,461.959,412.212,458.165z" /><rect x="201.441" y="268.59" width="100.721" height="151.082" /><polygon points="285.377,224.64 285.377,184.654 218.229,184.654 218.229,224.64 204.648,251.802 298.957,251.802 			" /><path d="M270.556,75.256l-10.71-35.697c-1.066-3.55-4.339-5.984-8.041-5.984c-3.71,0-6.975,2.434-8.041,5.984l-10.718,35.697c-9.031,30.107-13.765,61.23-14.512,92.613h66.535C284.322,136.486,279.588,105.363,270.556,75.256z" /><path d="M294.704,458.165c0.26-0.688,0.529-1.368,0.713-2.09l4.902-19.615h-97.037l4.893,19.615c0.185,0.722,0.453,1.402,0.722,2.09c-4.516,3.794-7.453,9.417-7.453,15.763v8.998c0,11.407,9.275,20.681,20.681,20.681h59.358c11.398,0,20.681-9.275,20.681-20.681v-8.998C302.166,467.583,299.228,461.959,294.704,458.165z" /></g></g></g></svg>
                    }
                    {oneEvent.eventType === "Vol" &&
                        <svg id="roleSvg" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.16 218.16" ><path d="M73.778,188.362l-37.454,5.717c-2.978,0.451-5.941-0.918-7.52-3.484L14.838,167.89c-0.779-1.267-1.135-2.709-1.094-4.144 c-0.006-0.12-0.018-0.237-0.018-0.358v-48.03c0-4.143,3.358-7.5,7.5-7.5s7.5,3.357,7.5,7.5v19.927L58.71,81.887l15.068,25.715 V188.362z M196.934,107.857c-4.143,0-7.5,3.357-7.5,7.5v19.927l-29.983-53.397l-15.068,25.716v80.76l37.454,5.717 c2.976,0.452,5.941-0.918,7.521-3.485l13.965-22.705c0.779-1.266,1.134-2.708,1.093-4.143c0.006-0.12,0.018-0.237,0.018-0.358 v-48.03C204.434,111.215,201.076,107.857,196.934,107.857z M129.383,188.679l-12.803,9.547v12.434c0,4.143-3.357,7.5-7.5,7.5 c-4.142,0-7.5-3.357-7.5-7.5v-12.434l-12.803-9.547v-83.112c0-1.333-0.355-2.642-1.029-3.792l-20.531-35.04l35.323-62.907 C103.868,1.464,106.369,0,109.08,0c2.712,0,5.212,1.464,6.54,3.828l35.323,62.907l-20.531,35.04 c-0.674,1.15-1.029,2.459-1.029,3.792V188.679z M129.348,68.613c3.194-2.636,3.647-7.363,1.012-10.559 c-0.868-1.053-8.839-10.284-21.09-10.284c-12.123,0-20.421,9.083-21.327,10.119c-2.728,3.117-2.432,7.877,0.686,10.604 c1.429,1.25,3.193,1.865,4.949,1.865c2.075,0,4.138-0.859,5.615-2.548c1.268-1.402,5.55-5.041,10.078-5.041 c5.316,0,9.519,4.831,9.519,4.831C121.426,70.796,126.153,71.249,129.348,68.613z" /></svg>
                    }
                    {oneEvent.eventType === "Toute" &&
                        <svg id="roleSvg" xmlns="http://www.w3.org/2000/svg" width="100" height="50"><text x="0" y="40" font-weight="bold" font-size="48">ALL</text></svg>
                    }

                </div>

                <div className="displayEvent__info__middle">
                    <div id="eventDescription"></div>
                    <div id="eventInfo">
                        <h3 className="test" aria-label="gameplay" > <img src="./images/icon/icon1.png" alt="" />{oneEvent.environnement}</h3>
                        <h3 className="test" aria-label="Nombre de joueurs" >Nombre de joueurs: {oneEvent.joueur}</h3>
                        <h3>Serveur: {oneEvent.serveur}</h3>
                        <h3 className="test" aria-label="Niveau minimum requis"><img src="./images/icon/icon4.png" alt="" /> {oneEvent.niveau}</h3>
                        <h3>Crimestat autorisé: {oneEvent.crimeStat}</h3>
                        <h3 className="test" aria-label="Restrictions de vaisseaux" ><img src="./images/icon/icon3.png" alt="" /> {oneEvent.forbidenShip}</h3>
                        <h3 className="test" aria-label="Restrictions d'armes"><img src="./images/icon/icon5.png" alt="" /> {oneEvent.forbidenWeapon}</h3>
                        <h3>Groupeur: {oneEvent.groupeur}</h3>
                        <h3 className="test" aria-label="Stuff requis"><img src="./images/icon/icon2.png" alt="" /> {oneEvent.stuff}</h3>
                    </div>
                </div>
            </div>

            <img src={oneEvent.image} alt="" />
        </div>
    );
};

export default EventPage;