import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import HeaderUser from '../HeaderUser';
import './index.scss';


const Header = (props) => {

    return (
        <React.Fragment >
            <div> 
                <div className="row col-md-12 p-0 m-0 mb-3"> 
                    <div className="col-md-10 p-0 m-0">
                    
                    </div>  
                    <div className="col-md-2 p-0 m-0"> 
                        <img src="/marvel-logo.png" alt="Marvel logo" className="marvel-logo"></img>
                    </div>  
                </div>
                
                {props.showMenu && (
                    <Navbar variant="dark" expand="lg" className="menu-back text-center">
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
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