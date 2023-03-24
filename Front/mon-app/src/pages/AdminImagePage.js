import React from 'react';
import AdminNavbar from '../components/navbar/AdminNavbar';
import AdminImage from '../components/AdminOnglet/AdminImage';

const AdminImagePage = (props) => {
    return (

        <div className='adminImagePage'>
            <AdminNavbar />
            <AdminImage />
        </div>
    );
};

export default AdminImagePage;