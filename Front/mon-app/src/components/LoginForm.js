import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginForm = (props) => {

    const [load, setLoad] = useState(false);                        //affichage ou non de la waiting page
    const [useEffectLoad, setUseEffectLoad] = useState(false);      // gestion du useEffect
    const [errorMessage, setErrorMessage] = useState("");      // message d'erreur


    useEffect(() => {

        let localToken = localStorage.getItem('accessToken')         //recup du token en local storage pour eviter une reconection a chaque fois               

        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        if (accessToken != null) {
            localStorage.setItem('tokenType', tokenType);
            localStorage.setItem('accessToken', accessToken);
        }



        if (accessToken) {     // si auth discord Manuelle reussi (premiere connexion)
            setLoad(true)      //redirect waiting room

            localStorage.setItem('tokenType', tokenType);               // push token dans localstorage
            localStorage.setItem('accessToken', accessToken);

            axios({             //check des guilds discord de la personne qui se connecte
                method: "get",
                url: `https://discord.com/api/users/@me/guilds`,
                headers: {
                    authorization: `${tokenType} ${accessToken}`,
                },
            })
                .then((res) => {
                    let array = res.data
                    let focus = array.find(e => e.name === "La Wacko")

                    if (focus) {         // si il est sur le discord wacko
                        let guildId = focus.id
                        axios({               // check de ses informations sur le discord Wacko (pseudo,role,etc)
                            method: "get",
                            url: `https://discord.com/api/users/@me/guilds/${guildId}/member`,
                            headers: {
                                authorization: `${tokenType} ${accessToken}`,
                            },
                        })
                            .then((res) => {
                                let pseudo = res.data.nick;
                                
                                if (pseudo === null) {
                                pseudo = res.data.user.username
                                }

                                let role = res.data.roles
                                let discriminator = res.data.user.discriminator
                                let date = res.data.joined_at

                                let avatarCode = res.data.user.avatar
                                let discordId = res.data.user.id

                                let avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${avatarCode}.png`

                                console.log(res.data);
                                console.log(pseudo);
                                console.log(role);
                                console.log(discriminator);
                                console.log(date);
                                console.log(avatarUrl);

                                axios({                 // envoi de ses information en Backend pour traitement
                                    method: "post",
                                    url: `${process.env.REACT_APP_API_URL}api/discordAuth`,
                                    data: {
                                        pseudo,
                                        role,
                                        discriminator,
                                        date,
                                        avatarUrl,
                                        gestion: false
                                    }
                                })
                                    .then((res) => {                // si il passe le backend (soit il est deja inscrit soit il vien de l'etre)
                                        localStorage.setItem("discriminator", discriminator);
                                        localStorage.setItem("token", res.data.token);
                                        window.location = "/Membre";
                                    })
                                    .catch((err) => {  //  (erreur Backend)
                                        setLoad(false)
                                        console.log("erreur backend");
                                        localStorage.clear()
                                    })

                            })
                            .catch((err) => { // erreur sur la verification de ses informations sur le discord Wacko (erreur discord)
                                console.log("erreur discord");
                                setLoad(false)
                                localStorage.clear()
                            })


                    } else {                            // l'utilisateur n'est pas sur le discord wacko
                        setLoad(false);
                        localStorage.clear()
                        setErrorMessage("Rejoignez nous sur le discord")
                        console.log("Rejoignez nous sur le discord");
                    }




                })
                .catch((err) => {  // erreur sur la verification des guilds discord (erreur discord)
                    setLoad(false)
                })
        } else {  // si il y a deja eu une conection et que le token est dans le local storage


            if (localToken === null) {      //si le token n'est pas dans le Localstorage tu restes sur la page login
                setLoad(false)
            } else {

                setLoad(true)
                let token = localStorage.getItem('accessToken')
                let typeToken = localStorage.getItem('tokenType')

                axios({             //check des guilds discord de la personne qui se connecte
                    method: "get",
                    url: `https://discord.com/api/users/@me/guilds`,
                    headers: {
                        authorization: `${typeToken} ${token}`,
                    },
                })
                    .then((res) => {
                        let array = res.data
                        let focus = array.find(e => e.name === "La Wacko")

                        if (focus) {         // si il est sur le discord wacko
                            let guildId = focus.id
                            axios({               // check de ses informations sur le discord Wacko (pseudo,role,etc)
                                method: "get",
                                url: `https://discord.com/api/users/@me/guilds/${guildId}/member`,
                                headers: {
                                    authorization: `${typeToken} ${token}`,
                                },
                            })
                                .then((res) => {
                                    let pseudo = res.data.nick;
                                    let role = res.data.roles
                                    let discriminator = res.data.user.discriminator
                                    let date = res.data.joined_at

                                    let avatarCode = res.data.user.avatar
                                    let discordId = res.data.user.id

                                    let avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${avatarCode}.png`

                                    axios({                 // envoi de ses information en Backend pour traitement
                                        method: "post",
                                        url: `${process.env.REACT_APP_API_URL}api/discordAuth`,
                                        data: {
                                            pseudo,
                                            role,
                                            discriminator,
                                            date,
                                            avatarUrl,
                                            gestion: false
                                        }
                                    })
                                        .then((res) => {                // si il passe le backend (soit il est deja inscrit soit il vien de l'etre)
                                            localStorage.setItem("discriminator", discriminator);
                                            localStorage.setItem("token", res.data.token);
                                            window.location = "/Membre";
                                        })
                                        .catch((err) => {  //  (erreur Backend)
                                            setLoad(false)
                                            console.log("erreur backend");
                                            localStorage.clear()
                                        })

                                })
                                .catch((err) => { // erreur sur la verification de ses informations sur le discord Wacko (erreur discord)
                                    console.log("erreur discord");
                                    setLoad(false)
                                    localStorage.clear()
                                })


                        } else {                            // l'utilisateur n'est pas sur le discord wacko
                            setLoad(false);
                            localStorage.clear()
                            setErrorMessage("Rejoignez nous sur le discord")
                            console.log("Rejoignez nous sur le discord");
                        }




                    })
                    .catch((err) => {  // erreur sur la verification des guilds discord (erreur discord)
                        setLoad(false)
                    })

            }

        }

    }, [useEffectLoad]);

    const discord = (e) => {
        window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1066757727419908126&redirect_uri=http%3A%2F%2Flocalhost%3A3001&response_type=token&scope=guilds%20guilds.members.read"
        // window.location.href = "https://discord.com/api/oauth2/authorize?client_id=1013836060092018770&redirect_uri=https%3A%2F%2Fwacko.romain-vignolles.fr&response_type=token&scope=guilds%20guilds.members.read"
    }

    const social = (e) => {
        window.location.replace("https://discord.gg/BEySpJcpRg")
    }
    return (
        <div className='loginPage'>
            {load ?
                <img className='loading' src={"./images/loading.gif"} alt="my-gif" />
                :
                <div className='login'>
                    <button className='login__connection' onClick={discord} >Connexion</button>

                    <div className='login__mid'>
                        <img className="login__mid__text" src="images/nom_wacko_horizontal.png" alt="texte Wacko" />
                        <img className="login__mid__logo" src="images/Logo_grand.png" alt="logo Wacko" />
                        <div className='login__mid__social'>
                            <button className='login__mid__social__discord' onClick={social}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="71" height="80" viewBox="0 0 71 80" >
                                    <path d="M60.1045 13.8978C55.5792 11.8214 50.7265 10.2916 45.6527 9.41542C45.5603 9.39851 45.468 9.44077 45.4204 9.52529C44.7963 10.6353 44.105 12.0834 43.6209 13.2216C38.1637 12.4046 32.7345 12.4046 27.3892 13.2216C26.905 12.0581 26.1886 10.6353 25.5617 9.52529C25.5141 9.44359 25.4218 9.40133 25.3294 9.41542C20.2584 10.2888 15.4057 11.8186 10.8776 13.8978C10.8384 13.9147 10.8048 13.9429 10.7825 13.9795C1.57795 27.7309 -0.943561 41.1443 0.293408 54.3914C0.299005 54.4562 0.335386 54.5182 0.385761 54.5576C6.45866 59.0174 12.3413 61.7249 18.1147 63.5195C18.2071 63.5477 18.305 63.5139 18.3638 63.4378C19.7295 61.5728 20.9469 59.6063 21.9907 57.5383C22.0523 57.4172 21.9935 57.2735 21.8676 57.2256C19.9366 56.4931 18.0979 55.6 16.3292 54.5858C16.1893 54.5041 16.1781 54.304 16.3068 54.2082C16.679 53.9293 17.0513 53.6391 17.4067 53.3461C17.471 53.2926 17.5606 53.2813 17.6362 53.3151C29.2558 58.6202 41.8354 58.6202 53.3179 53.3151C53.3935 53.2785 53.4831 53.2898 53.5502 53.3433C53.9057 53.6363 54.2779 53.9293 54.6529 54.2082C54.7816 54.304 54.7732 54.5041 54.6333 54.5858C52.8646 55.6197 51.0259 56.4931 49.0921 57.2228C48.9662 57.2707 48.9102 57.4172 48.9718 57.5383C50.038 59.6034 51.2554 61.5699 52.5959 63.435C52.6519 63.5139 52.7526 63.5477 52.845 63.5195C58.6464 61.7249 64.529 59.0174 70.6019 54.5576C70.6551 54.5182 70.6887 54.459 70.6943 54.3942C72.1747 39.0791 68.2147 25.7757 60.1968 13.9823C60.1772 13.9429 60.1437 13.9147 60.1045 13.8978ZM23.7259 46.3253C20.2276 46.3253 17.3451 43.1136 17.3451 39.1693C17.3451 35.225 20.1717 32.0133 23.7259 32.0133C27.308 32.0133 30.1626 35.2532 30.1066 39.1693C30.1066 43.1136 27.28 46.3253 23.7259 46.3253ZM47.3178 46.3253C43.8196 46.3253 40.9371 43.1136 40.9371 39.1693C40.9371 35.225 43.7636 32.0133 47.3178 32.0133C50.9 32.0133 53.7545 35.2532 53.6986 39.1693C53.6986 43.1136 50.9 46.3253 47.3178 46.3253Z" fill="#ffffff" />
                                </svg>
                            </button>
                            <h1>Rejoignez nous!</h1>
                        </div>
                        <p id="errorMessage" >{errorMessage}</p>
                    </div>

                </div>

            }

        </div>

    );
};

export default LoginForm;