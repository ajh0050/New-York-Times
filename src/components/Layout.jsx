import React from 'react';
import Footer from './Footer';
import dynamic from 'next/dynamic';
import Header from './Header';


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Layout;