
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Header from '../../../components/Header';
import { createProfile, updateProfile } from '../../../services/userAPI';
import history from '../../../services/history';

const EditProfile = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const [name, setName] = useState(userData?.name);
    const [bio, setBio] = useState(userData?.bio);
    const [email, setEmail] = useState(userData?.email);
    const [password, setPassword] = useState(null);

    const updateAccount = () => {
        updateProfile({
            email: email != userData.email ? email : null, 
            password, 
            name: name != userData.name ? name : null, 
            bio: bio != userData.bio ? bio : null,
        }
        ).then(({ data }) => {
            Swal.fire({
                icon: 'success',
                title: 'Yay!',
                text: 'Account details updated!',
            });
            localStorage.setItem('currentUser', JSON.stringify(data));
            history.push('/profile');
        }).catch(() => {
        })
    }

    return (
        <React.Fragment>
            <div>
                <Header showMenu></Header>

                <div className="row col-md-12 ml-0 content">
                    <div className="col-md-10">
                        <h2>
                            {userData?.name}
                        </h2>
                    </div>
                    
                    <hr className="line" />
                        <div className="row col-md-12 justify-content-center m-0 p-0">
                            <p className="sign" align="center"> Edit Account Details </p>
                        </div>
                        <Form inline className="row col-md-12 justify-content-center m-0 p-0">
                            <input className="input" type="text" align="center" value={name} placeholder="Change Name" onChange={(e) => setName(e.target.value)} />
                            <textarea className="input" type="text" align="center" value={bio} placeholder="Change Bio" onChange={(e) => setBio(e.target.value)} />
                            <input className="input" type="text" align="center" value={email} placeholder="Change e-mail" onChange={(e) => setEmail(e.target.value)} />
                            <input className="input" type="password" align="center" placeholder="New password" onChange={(e) => setPassword(e.target.value)} />

                        </Form>
                        <div className="row col-md-12 justify-content-center m-0 p-0">
                            <a className="submit mr-2" align="center" onClick={() => { updateAccount() }}>Update account</a>
                            <a className="cancel ml-2" align="center" onClick={() => { history.push('/profile') }}>Return to Profile</a>
                        </div>
                    </div>
            </div>  

          
        </React.Fragment>

    )
}

export default EditProfile;