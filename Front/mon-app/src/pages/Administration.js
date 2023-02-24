import React from 'react';
import AdminNavbar from '../components/navbar/AdminNavbar';
import WackoAdmin from '../components/AdminOnglet/WackoAdmin';

const AdminPage = (props) => {
    return (

        <div className='adminPage'>
            <AdminNavbar />
            <WackoAdmin />
        </div>
    );
};

export default AdminPage;