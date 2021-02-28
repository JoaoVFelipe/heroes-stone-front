
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Header from '../../../components/Header';
import { createProfile } from '../../../services/userAPI';
import history from '../../../services/history';

const CreateProfile = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const submitAccount = () => {
        createProfile({email, password, name}).then(({ data }) => {
            Swal.fire({
                icon: 'success',
                title: 'Yay!',
                text: 'Account created! Welcome!',
            })
            history.push("/");
        }).catch(() => {
        })
    }

    return (
        <React.Fragment>
            <Header showMenu={false}></Header>

            <div className="login" >
                <div className="row col-md-12 justify-content-center m-0 p-0">
                    <p className="sign" align="center">Create an account and show the world your favorite heroes and comics from the Marvel Universe!</p>
                </div>
                <Form inline className="row col-md-12 justify-content-center m-0 p-0">
                <input className="input" type="text" align="center" placeholder="Your name" onChange={(e) => setName(e.target.value)} />

                    <input className="input" type="text" align="center" placeholder="Your e-mail" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" align="center" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} />

                </Form>
                <div className="row col-md-12 justify-content-center m-0 p-0">
                    <a className="submit" align="center" onClick={() => { submitAccount() }}>Create my account!</a>
                </div>
                <div className="row col-md-12 justify-content-center m-0 mt-2 p-0">
                    <a className="no-account" align="center" href="/login"> Already have an account?</a>
                </div>
            </div>
        </React.Fragment>

    )
}

export default CreateProfile;