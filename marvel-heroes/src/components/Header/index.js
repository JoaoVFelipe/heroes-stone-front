import React from 'react';
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
                    <ul className="header">
                        <li><a href="/">Home</a></li>
                        <li><a href="/stuff">Stuff</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                )}

            </div>
        </React.Fragment>
    );
};

export default Header;