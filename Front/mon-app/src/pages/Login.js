import React from 'react';
import MediaQuery from 'react-responsive';



import LoginForm from '../components/LoginForm';
import Responsive from '../components/Responsive';




const Login = () => {
    return (
        
       <div>
        <MediaQuery minWidth={1439}>
            <LoginForm />
        </MediaQuery>
        
        <MediaQuery maxWidth={1440}>
            <Responsive />
        </MediaQuery>
       
       </div>
    );
};

export default Login;