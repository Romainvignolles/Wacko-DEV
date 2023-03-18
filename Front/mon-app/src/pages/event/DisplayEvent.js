import React, { useEffect, useState } from "react";
import axios from 'axios';

const EventPage = (props) => {

    const [oneEvent, setOneEvent] = useState([]);
    const [load, setLoad] = useState("");

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

    const description = () => {
        document.getElementById("eventDescription").innerHTML = oneEvent.description;
    }

    useEffect(() => {
        fetchOneEvent()
    }, []);

    useEffect(() => {
        description()
    }, [load]);




    return (

        <div className="displayEvent">
            <div className="displayEvent__info">
                <h1>{oneEvent.titre}</h1>
                <div className="displayEvent__info__middle">
                    <div id="eventDescription"></div>
                    <div id="eventInfo">
                        <button id="test" aria-label="gameplay">test</button>
                        <h3 className="test" aria-label="gameplay" >Gameplay:{oneEvent.environnement}</h3>
                        <h3 className="test" aria-label="Nombre de joueurs" >Nombre de joueurs: {oneEvent.joueur}</h3>
                        <h3>Serveur: {oneEvent.serveur}</h3>
                        <h3>Niveau minimum requis: {oneEvent.niveau}</h3>
                        <h3>Crimestat autorisé: {oneEvent.crimeStat}</h3>
                        <h3>Restriction de vaisseau: {oneEvent.forbidenShip}</h3>
                        <h3>Restriction d'armes: {oneEvent.forbidenWeapon}</h3>
                        <h3>Groupeur: {oneEvent.groupeur}</h3>
                        <h3>Stuff requis: {oneEvent.stuff}</h3>
                        <h3>Section: {oneEvent.eventType}</h3>
                    </div>
                </div>
            </div>

            <img src={oneEvent.image} />
        </div>
    );
};

export default EventPage;