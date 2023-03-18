import React, { useEffect, useState } from "react";
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";



const EventPage = (props) => {

    const [allEvent, setAllEvent] = useState([]);

    const fetchEvent = () => {              //recupération des events
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/getAllEvent`,
        })
            .then((res) => {
                setAllEvent(res.data)

            })
            .catch((err) => {
            })
    }

    useEffect(() => {
        fetchEvent()
    }, []);
    
    const displayEvent =(e) =>{
        let focusID = e.target.parentNode.parentNode.id
        localStorage.setItem("eventID", focusID);
        window.location = "/displayEvent";
    }

    return (

        <div className="eventPageBackground">
            <Navbar />
            <div className='eventPage'>

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
                    className="eventSwiper"
                >
                    {allEvent.map(event => (
                        <SwiperSlide className="eventSwipperCard" key={event.id} id={event.id}>
                            <div className="eventSwipperCard__info">
                                <h1>{event.titre}</h1>
                                <div className="eventSwipperCard__botInfo">
                                    <h3>{event.date}</h3>
                                    <h3>Serveur: {event.serveur}</h3>
                                </div>
                                <button onClick={displayEvent}>Voir l'event</button>
                            </div>
                            <img src={event.image} />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    );
};

export default EventPage;