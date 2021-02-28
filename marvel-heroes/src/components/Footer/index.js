import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './index.scss'

const Footer = (props) => {

    return (
        <React.Fragment >
            <div> 
                <div className="footer text-center p-2">
                    <div className="row col-md-12 justify-content-center footer-text">
                        Developed by: João Vitor Felipe
                    </div>
                    <div className="row col-md-12 justify-content-center footer-text">
                    All rights to images, characters, comics used on this site are reserved for Marvel®
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Footer;