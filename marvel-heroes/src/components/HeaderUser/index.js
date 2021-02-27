import React from 'react';
import { Dropdown, Nav, Navbar, DropdownButton } from 'react-bootstrap';


const HeaderUser = (props) => {

    const userData = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <React.Fragment >
            {userData ? (
                <DropdownButton title={userData.name} className="profile-drop" menuAlign={{ lg: 'right' }} id="dropdown-menu-align-responsive-1" variant="secondary">
                    <Dropdown.Item disabled href="#action/3.1">Hello {userData.name}!</Dropdown.Item>
                    <Dropdown.Item href="#action/3.1">My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                    <Dropdown.Item href="#action/3.2">Logout</Dropdown.Item>
                </DropdownButton>
            ) : (
                <Nav.Link href="/login">Login</Nav.Link>
            )}
          
        </React.Fragment>
    );
};

export default HeaderUser;