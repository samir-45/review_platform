import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default RootLayout;