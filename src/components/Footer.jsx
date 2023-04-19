import React from 'react'

const Footer = () => {
    const containerStyle = {
        marginTop: 'auto',
        display: 'flex',
        displayDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
    const linkStyle = {
        color: '#3399FF',
        textDecoration: 'underline'
    }

    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content" style={containerStyle}>
            <div>
                <p>Copyright © 2023 - All rights reserved by <a target="_blank" href="https://github.com/ajh0050" style={linkStyle}>Adam</a></p>
            </div>
        </footer>
    )
}

export default Footer