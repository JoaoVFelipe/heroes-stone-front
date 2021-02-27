import React from 'react';
import { Dropdown, Nav, Navbar, DropdownButton } from 'react-bootstrap';


const HeaderUser = (props) => {

    return (
        <React.Fragment >
            <DropdownButton title="João Vitor" className="profile-drop" menuAlign={{ lg: 'right' }} id="dropdown-menu-align-responsive-1" variant="secondary">
                <Dropdown.Item disabled href="#action/3.1">Hello João Vitor!</Dropdown.Item>
                <Dropdown.Item href="#action/3.1">My Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#action/3.2">Logout</Dropdown.Item>
            </DropdownButton>
        </React.Fragment>
    );
};

export default HeaderUser;