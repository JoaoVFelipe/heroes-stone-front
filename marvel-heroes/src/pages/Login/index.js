
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { login } from '../../services/userAPI';
import history from '../../services/history';
import Cookies from 'universal-cookie';

import './index.scss'
import Header from '../../components/Header';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const cookies = new Cookies(document.cookie);


    const sendLogin = () => {
        login(email, password).then(({ data }) => {
            cookies.set('jwt_auth', data.token, { path: '/' });
            localStorage.setItem('currentUser', JSON.stringify(data.userData));
            history.push("/");
        }).catch((error) => {
        })
    }

    return (
        <React.Fragment>
            <Header showMenu={false}></Header>

            <div className="login" >
                <div className="row col-md-12 justify-content-center m-0 p-0">
                    <p className="sign" align="center">Enter on your Marvel Universe!</p>
                </div>
                <Form inline className="row col-md-12 justify-content-center m-0 p-0">
                    <input className="input" type="text" align="center" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" align="center" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                </Form>
                <div className="row col-md-12 justify-content-center m-0 p-0">
                    <a className="submit" align="center" onClick={() => { sendLogin() }}>Enter!</a>
                </div>
                <div className="row col-md-12 justify-content-center m-0 mt-2 p-0">
                    <a className="no-account" align="center" href="/profile/create"> Don't have an account?</a>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Login;