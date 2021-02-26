import React from 'react';
import { Dropdown, Nav, Navbar, DropdownButton } from 'react-bootstrap';
import './index.scss';


const Header = (props) => {

    return (
        <React.Fragment >
            <div> 
                <div className="row col-md-12 p-0 m-0 mb-3"> 
                    <div className="col-md-10 p-0 m-0">
                    
                    </div>  
                    <div className="col-md-2 p-0 m-0"> 
                        <img src="./marvel-logo.png" alt="Marvel logo" className="marvel-logo"></img>
                    </div>  
                </div>
                
                {props.showMenu && (
                    <Navbar variant="dark" expand="lg" className="menu-back text-center">
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/heroes">Heroes</Nav.Link>
                        <Nav.Link href="/comics">Comics</Nav.Link>
                      </Nav>
                        <DropdownButton title="João Vitor" className="profile-drop" menuAlign={{ lg: 'right' }} id="dropdown-menu-align-responsive-1" variant="secondary">
                            <Dropdown.Item disabled href="#action/3.1">Hello João Vitor!</Dropdown.Item>
                            <Dropdown.Item href="#action/3.1">My Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#action/3.2">Logout</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Collapse>
                  </Navbar>
                )}

            </div>
        </React.Fragment>
    );
};

export default Header;