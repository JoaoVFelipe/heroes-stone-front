
import React from 'react';
import Header from '../../components/Header';
import './index.scss'

const Home = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    return (
        <div>
            <Header showMenu></Header>

            
            <div className="row col-md-12 ml-0 content">
                <div className="col-md-10">
                    <h2>
                        {userData ? `Welcome ${userData.name}!`: 'Welcome Visitor!'}
                    </h2>
                </div>
                <div className="col-md-2 float-right">
                    {
                        userData && (
                            <a className="float-right edit-link" href="/profile">
                                My profile
                            </a>
                        )
                    }
                </div>
            </div>

            <hr className="line" />
  
            <div className="row col-md-12 ml-0 content">
                <div className="col-md-6 mb-4">
                    <a href="/heroes"> 
                        <img src="/marvel-heroes.png" alt="Marvel Heroes" className="marvel-heroes"></img>
                        <span className="marvel-heroes-title">CHARACTERS</span> 
                    </a>

                    
                </div>
                <div className="col-md-6 mb-4">
                    <a href="/comics">
                        <img src="/marvel-comics.png" alt="Marvel Comics" className="marvel-comics"></img>
                        <span className="marvel-comics-title">COMICS</span> 
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home;