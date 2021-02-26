import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCard from '../../../components/CustomCard';
import { getComicsByChar, getOneChar } from '../../../services/marvelAPI';
import './index.css';


const HeroDetail = () => {
    const { id } = useParams();
    const [heroDetail, setHeroDetail] = useState(null);
    const [comics, setComics] = useState([]);

    useEffect(() => {
        getOneChar(id).then(({ data }) => {
            setHeroDetail(data.data.results[0]);
        });
    }, [id]);

    useEffect(() => {
        if(heroDetail) {
            getComicsByChar(id).then(({ data }) => {
                setComics(chunkArray(data.data.results, 5));
            });
        }
    }, [heroDetail]);

    
    const chunkArray = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr]
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache;
    }

    return (
        <div>

            <div className="row col-md-12 ml-0 justify-content-center content">
                <div className="row col-md-12 justify-content-center ml-0 mb-3">
                    <img className="hero-image" src={`${heroDetail?.thumbnail?.path}.${heroDetail?.thumbnail?.extension}`}></img>
                </div>
                <div className="row col-md-12 justify-content-center">
                    <h2>
                        {heroDetail?.name}
                    </h2>
                </div>

                <div className="row col-md-12 justify-content-center m-0 p-3"> 
                    {heroDetail?.description}
                </div>

                <div className="row col-md-12 m-0"> 
                    <h2>
                        Appears in: 
                    </h2>
                    <div className="row col-md-12 justify-content-center content">
                        {
                            comics?.map((comicsCol, index) => {
                                return (
                                    <div className="row justify-content-center col-md-12 mt-2 mb-2">
                                        {comicsCol.map((comic) => {
                                            return (
                                                <div className="ml-2 mr-2">
                                                    <CustomCard
                                                        title={comic.title}
                                                        titleUrl={`comics/${comic.id}`}
                                                        imgSrc={comic.thumbnail?.path + '.' + comic.thumbnail?.extension}
                                                        imgWidth={'200px'}>
                                                    </CustomCard>
                                                </div>
                                            )
                                        })}
                                    </div>
                            )})
                        }
                    </div>
                </div>

            </div>

        </div>
    )
};

export default HeroDetail;