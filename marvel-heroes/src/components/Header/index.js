import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import HeaderUser from '../HeaderUser';
import history from '../../services/history';

import './index.scss';


const Header = (props) => {

    return (
        <React.Fragment >
            <div> 
                <div className="row col-md-12 p-0 m-0 mb-3"> 
                    <img src="/marvel-logo.png" alt="Marvel logo" className="marvel-logo"onClick={() => {history.push('/')}}></img>
                </div>
                
                {props.showMenu && (
                    <Navbar variant="dark" expand="lg" className="menu-back text-center">
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="margin-nav">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/heroes">Characters</Nav.Link>
                        <Nav.Link href="/comics">Comics</Nav.Link>
                      </Nav>
                        <HeaderUser></HeaderUser>
                    </Navbar.Collapse>
                  </Navbar>
                )}

            </div>
        </React.Fragment>
    );
};

export default Header;