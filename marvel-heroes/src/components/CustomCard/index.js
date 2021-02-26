import React from 'react';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import './index.scss';

const CustomCard = (props) => {

    return (
        <React.Fragment >
            <Card style={{ width: props.imgWidth, height: '300px' }} className="card-total">
                <div>
                    <div className="row col-md-12 justify-content-center p-0 m-0">
                        <div className="card-image-row" style={{ width: props.imgWidth || '100%'}}>
                            <Card.Img className="card-image" variant="top" src={props.imgSrc} />
                        </div>
                    </div>
                    <Card.Body>
                        <div className="row col-md-12 p-0">
                            <div className="col-md-10 pl-1 m-0">
                                <Card.Title className="card-title-custom"> 
                                    <Link to={props.titleUrl} className="card-link" title={props.title}> {props.title} </Link>
                                
                                </Card.Title> 
                            </div>
                            <div className="col-md-2 pl-1 m-0">
                                <FavoriteButton isFavorite > </FavoriteButton> 
                            </div>
                        </div>
                    
                    </Card.Body>
                </div>
               
            </Card> 
        </React.Fragment>
    );
};

export default CustomCard;