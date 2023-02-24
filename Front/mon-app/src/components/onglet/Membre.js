import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, } from "@fortawesome/free-solid-svg-icons";




const Membre = () => {

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

    const [allMember, setAllMember] = useState([]);
    const [staticStat, setStaticStat] = useState([]);
    const [member, setMember] = useState([]);
    const [hangarArray, setHangarArray] = useState([]);

    //recupération de tout les membres
    const fetchmember = async () => {
        await axios(`${process.env.REACT_APP_API_URL}api/auth/user`)
            .then((res) => {
                setAllMember(res.data)
                setStaticStat(res.data)
                let title = document.getElementById("listTitle");
                title.innerHTML = "Tous :";
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


    //compteur de role
    let presidentFilter = staticStat.filter(e => e.role === 'Président du conseil');
    let conseilFilter = staticStat.filter(e => e.role === 'Conseiller');
    let membreFilter = staticStat.filter(e => e.role === 'Membre');
    let recrueFilter = staticStat.filter(e => e.role === 'Recrue');
    let gigmFilter = staticStat.filter(e => e.role === 'GIGM');
    let adminFilter = staticStat.filter(e => e.role === 'administrateur');

    let presidentCount = presidentFilter.length;
    let conseilCount = conseilFilter.length;
    let membreCount = membreFilter.length;
    let recrueCount = recrueFilter.length;
    let gigmCount = gigmFilter.length;
    let adminCount = adminFilter.length;



    //afficher le profil au clic
    const toggleProfile = (e) => {
        let homepage = document.getElementById('homepage')
        let oneMembre = document.getElementById('oneMember')
        homepage.style.display = "none"
        oneMembre.style.display = "flex"

        let discriminator = e.target.id;
        //recupération du membre selectionner
        const fetchOneMember = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}api/auth/user/${discriminator}`)
            setMember(result.data)
            setHangarArray(result.data.vaisseaus)
        };
        fetchOneMember()
    }

    //barre de recherche
    const searchMember = (e) => {
        let search = e.target.value;
        search = search.toUpperCase();
        let x = document.getElementsByClassName('membre__pseudo');

        for (const list of x) {
            if (!list.innerHTML.toUpperCase().includes(search)) {
                list.style.display = "none";
            }
            else {
                list.style.display = "block";
            }
        }
    }

    //reset de la barre de recherche au changement de filre
    const resetsearch = (e) => {
        let search = document.getElementById('searchMember').value = "";
        search = search.toUpperCase();
        let x = document.getElementsByClassName('membre__pseudo');

        for (const list of x) {
            if (!list.innerHTML.toUpperCase().includes(search)) {
                list.style.display = "none";
            }
            else {
                list.style.display = "block";
            }
        }
    }

    //Bouton de filtre
    const memberFilter = (e) => {
        switch (e.target.id) {
            case "all":
                resetsearch()
                setLoad(e)
                break;
            case "president":
                resetsearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/user`).then(res => {
                    let member = res.data;
                    const presidentFilter = member.filter(element => element.role === "Président");
                    setAllMember(presidentFilter)
                    document.getElementById("listTitle").innerHTML = "Président :";
                });
                break;
            case "recrue":
                resetsearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/user`).then(res => {
                    let member = res.data;
                    const recrueFilter = member.filter(element => element.role === "Recrue");
                    setAllMember(recrueFilter)
                    document.getElementById("listTitle").innerHTML = "Recrues :";
                });
                break;
            case "membre":
                resetsearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/user`).then(res => {
                    let member = res.data;
                    const memberFilter = member.filter(element => element.role === "Membre");
                    setAllMember(memberFilter)
                    document.getElementById("listTitle").innerHTML = "Membres :";
                });
                break;
            case "conseil":
                resetsearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/user`).then(res => {
                    let member = res.data;
                    const conseilFilter = member.filter(element => element.role === "Conseiller");
                    setAllMember(conseilFilter)
                    document.getElementById("listTitle").innerHTML = "Conseillers :";
                });
                break;
            case "GIGM":
                resetsearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/user`).then(res => {
                    let member = res.data;
                    const gigmFilter = member.filter(element => element.role === "GIGM");
                    setAllMember(gigmFilter)
                    document.getElementById("listTitle").innerHTML = "GIGM :";
                });
                break;
            case "Administrateur":
                resetsearch()
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/user`).then(res => {
                    let member = res.data;
                    const adminFilter = member.filter(element => element.role === "Administrateur");
                    setAllMember(adminFilter)
                    document.getElementById("listTitle").innerHTML = "Administrateur :";
                });
                break;
            default:
                break;
        }

    }

    return (
        <div className='membre' >

            <div className='membre__top'>

                <span onClick={memberFilter} id='all' className='membre__top__count'>
                    Tous[{staticStat.length}]
                </span>

                <span onClick={memberFilter} id='president' className='membre__top__count'>
                    Président[{presidentCount}]
                </span>

                <span onClick={memberFilter} id='Administrateur' className='membre__top__count'>
                    Administrateurs[{adminCount}]
                </span>

                <span onClick={memberFilter} id='conseil' className='membre__top__count'>
                    Conseillers[{conseilCount}]
                </span>
                
                <span onClick={memberFilter} id='GIGM' className='membre__top__count'>
                    GIGM [{gigmCount}]
                </span>

                <span onClick={memberFilter} id='membre' className='membre__top__count'>
                    Membres[{membreCount}]
                </span>

                <span onClick={memberFilter} id='recrue' className='membre__top__count'>
                    Recrues[{recrueCount}]
                </span>
            </div>

            <div className='membre__bottom'>
                <div className='membre__bottom__left'>
                    <h1 id='listTitle'>Title</h1>
                    <div className='membre__bottom__left__search'>
                        <input id='searchMember' onKeyUp={searchMember} type="text" name="search" placeholder="Rechercher" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <div className='membre__bottom__left__list'>
                        {allMember.map(membre => (
                            <span onClick={toggleProfile} key={membre.id} id={membre.discriminator} className="membre__pseudo">
                                {membre.pseudo}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='membre__bottom__right'>
                    <div id='homepage' className='membre__bottom__right__homepage'>
                        <div className='membre__bottom__right__homepage__text'>
                            <h1>{staticStat.length} membres sont inscrits sur le site! </h1>
                            <p>Accédez au profil de chaque membre ainsi qu'a leur hangar personnel.</p>
                            <p>Pensez a mettre régulièrement a jour votre hangar via votre profil!</p>
                        </div>

                    </div>
                    <div id='oneMember' className='membre__bottom__right__oneMember'>
                        <div className='membre__bottom__right__oneMember__top'>
                            <img src={member.image} alt="member avatar" />
                            <h1 >{member.pseudo} </h1>
                        </div>
                        <div className='membre__bottom__right__oneMember__bottom' >
                            <p>Statut: {member.role}</p>
                            <h2>Possède {hangarArray.length} {hangarArray.length > 1 ? 'Vaisseaux' : 'Vaisseau'} :</h2>
                            <Swiper
                                pagination={{
                                    type: "fraction",
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {hangarArray.map(vaisseaux => (
                                    <SwiperSlide className='membre__bottom__right__oneMember__bottom__swipper' key={vaisseaux.id} id={vaisseaux.id} >
                                        <img src={vaisseaux.image} alt="" />
                                        <span>
                                            <h2>{vaisseaux.name}</h2>
                                        </span>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>
                </div>




            </div>

        </div>
    );
};

export default Membre;