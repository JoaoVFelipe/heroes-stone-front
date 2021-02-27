import React from 'react';
import { Dropdown, Nav, Navbar, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import history from '../../services/history';

const HeaderUser = (props) => {

    const cookies = new Cookies(document.cookie);
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    const logout = () => {
        cookies.remove('jwt_auth', { path: '/' });
        localStorage.removeItem('currentUser');
        history.push('/login');
        Swal.fire({
            icon: 'success',
            title: 'Yay!',
            text: 'Successfully logged out!'
          })
    };

    return (
        <React.Fragment >
            {userData ? (
                <DropdownButton title={userData.name} className="profile-drop" menuAlign={{ lg: 'right' }} id="dropdown-menu-align-responsive-1" variant="secondary">
                    <Dropdown.Item disabled href="#action/3.1">Hello {userData.name}!</Dropdown.Item>
                    <Dropdown.Item href="#action/3.1">My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                    <Dropdown.Item onClick={() => {logout()}}>Logout</Dropdown.Item>
                </DropdownButton>
            ) : (
                <Nav.Link href="/login">Login</Nav.Link>
            )}
          
        </React.Fragment>
    );
};

export default HeaderUser;