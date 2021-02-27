import React from 'react';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton';
import './index.scss';

const CustomCard = (props) => {

    const { isFavorite, handleFavoriteChange } = props;

    const genericHandleFavoriteChange = (favorite) => {
        handleFavoriteChange(favorite, props.id)
    }

    return (
        <React.Fragment >
            <Card style={{ width: props.imgWidth, height: '300px' }} className="card-total" key={props.id}>

                <div>
                    <Link to={`/${props.titleUrl}`} title={props.title}>
                        <div className="row col-md-12 justify-content-center p-0 m-0">
                            <div className="card-image-row" style={{ width: props.imgWidth || '100%' }}>
                                <Card.Img className="card-image" variant="top" src={props.imgSrc} />
                            </div>
                        </div>
                    </Link>
                    <Card.Body>
                        <div className="row col-md-12 p-0">
                            <Link to={`/${props.titleUrl}`} title={props.title}>
                                <div className="col-md-10 pl-1 m-0">
                                    <Card.Title className="card-title-custom card-link" style={{ fontSize: props.titleSize || '15px' }}>
                                        {props.title}
                                    </Card.Title>
                                </div>
                            </Link>
                            <div className="col-md-2 pl-1 m-0">
                                <FavoriteButton isFavorite={isFavorite} id={props.id} onFavoriteChange={genericHandleFavoriteChange}> </FavoriteButton>
                            </div>
                        </div>

                    </Card.Body>
                </div>


            </Card>
        </React.Fragment>
    );
};

export default CustomCard;