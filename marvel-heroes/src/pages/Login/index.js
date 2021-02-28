
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { api, login } from '../../services/userAPI';
import history from '../../services/history';
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';

import './index.scss'

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const cookies = new Cookies(document.cookie);

    
    const sendLogin = () => {
        login(email, password).then(({data}) => {
            cookies.set('jwt_auth', data.token, { path: '/' });
            localStorage.setItem('currentUser', JSON.stringify(data.userData));
            history.push("/");
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.errors ? error.errors[0].message : 'An error ocurred...',
              })
        })
    }

    return (
        <div className="login" >
             <div className="row col-md-12 justify-content-center">
                <p className="sign" align="center">Enter on your Marvel Universe!</p>
             </div>
             <Form inline className="row col-md-12 justify-content-center">
                <input className="input" type="text" align="center" placeholder="E-mail"  onChange={(e) => setEmail(e.target.value)}/>
                <input className="input" type="password" align="center" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
            
            </Form>
            <div className="row col-md-12 justify-content-center">
                <a className="submit" align="center" onClick={() => {sendLogin()}}>Enter!</a>
            </div>
        </div>
    )
}

export default Login;