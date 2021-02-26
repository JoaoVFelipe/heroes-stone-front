import React from 'react';
import { Dropdown, Nav, Navbar, DropdownButton } from 'react-bootstrap';
import './index.css';


const Header = (props) => {

    return (
        <React.Fragment >
            <div> 
                <div className="row col-md-12"> 
                    <div className="col-md-10">
                        <h1>
                            My Marvel Universe
                        </h1>
                    </div>  
                    <div className="col-md-2"> 
                        <img src="./marvel-logo.png" className="marvel-logo"></img>
                    </div>  
                </div>
                
                {props.showMenu && (
                    <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
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
                    // <ul className="header">
                    //     <li><a href="/">Home</a></li>
                    //     <li><a href="/heroes">Heroes</a></li>
                    //     <li><a href="/comics">Comics</a></li>

                    //     <Image src="holder.js/171x180" roundedCircle className="float-right"/>
                    // </ul>
                )}

            </div>
        </React.Fragment>
    );
};

export default Header;