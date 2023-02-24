import React from 'react';
import AdminNavbar from '../components/navbar/AdminNavbar';
import AdminWebsite from '../components/AdminOnglet/WebsiteAdmin';

const AdminStuffPage = (props) => {
    return (

        <div className='adminWebsitePage'>
            <AdminNavbar />
            <AdminWebsite />
        </div>
    );
};

export default AdminStuffPage;