import React from 'react';

const ErrorPage = (props) => {

    const redirect = (e) => {
        localStorage.clear()
    }

    return (

        <div className='pageNotFound'>

            <div className="glitch-wrapper">
                <div className="glitch" data-glitch="Crash">Crash</div>
            </div>

            <h1>Vous etes visiblement perdu...</h1>
            <h1>Je vous invite a vous <a onClick={redirect} href='/'> reconnecter.</a></h1>

        </div>
    );
};

export default ErrorPage;