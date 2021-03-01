import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import CustomCard from '../../../components/CustomCard';
import CustomPagination from '../../../components/CustomPagination';
import Header from '../../../components/Header';
import { favoriteOneComic, getAllFavoriteComics, unfavoriteOneComic } from '../../../services/favoriteAPI';
import { getComicsByChar, getOneChar } from '../../../services/marvelAPI';
import './index.scss';

const HeroDetail = () => {
    const { id } = useParams();
    const [heroDetail, setHeroDetail] = useState(null);
    const [comics, setComics] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(24);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getOneChar(id).then(({ data }) => {
            setHeroDetail(data.data.results[0]);
        });
    }, [id]);

    useEffect(() => {
        getAllFavoriteComics().then(({ data }) => {
            setFavoriteList(data);
        }).catch((error) => {
            setFavoriteList([]);
        });
    }, []);


    useEffect(() => {
        if(heroDetail) {
            const offset = (page - 1) * limit;

            getComicsByChar(id, {offset, limit}).then(({ data }) => {
                const comics = data.data.results
                if (favoriteList.length) {
                    comics.map((comic) => {
                        const isFavorite = favoriteList.find((favorite) => favorite.comicId == comic.id);
                        comic.isFavorite = isFavorite ? true : false;
                        return comic;
                    });
                }
                setComics(chunkArray(comics, 6));
                setTotalPages(Math.ceil(data.data.total / data.data.limit));

            });
        }
    }, [heroDetail, page, limit, favoriteList]);

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleFavoriteChange = (favorite, id) => {
        if(favorite) {
            favoriteOneComic(id).then(({data}) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'Comic is now on your favorites!'
                  })
            });
        } else {
            unfavoriteOneComic(id).then(({data}) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'Comic is not on your favorites anymore!'
                  })
            });

        }
    };
    
    const chunkArray = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr]
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache;
    }

    return (
        <div>
            <Header showMenu></Header>

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
                    {heroDetail?.description != "" ? heroDetail?.description : 'No description found...' }
                </div>

                <hr className="line" />

                {comics?.length ? (
                    <div className="row col-md-12 m-0"> 
                        <h2>
                            Appears in: 
                        </h2>

                        <div className="row col-md-12 justify-content-center content">
                            {
                                comics?.map((comicsCol, index) => {
                                    return (
                                        <div className="row justify-content-center col-md-12 mt-2 mb-2 p-0">
                                            {comicsCol.map((comic) => {
                                                return (
                                                    <div className="ml-2 mr-2" key={comic.id}>
                                                        <CustomCard
                                                           id={comic.id}
                                                           title={comic.title}
                                                           titleUrl={`comics/${comic.id}`}
                                                           titleSize={'14px'}
                                                           description={comic.description}
                                                           imgSrc={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                                                           imgWidth={'190px'}    
                                                           isFavorite={comic.isFavorite}
                                                           handleFavoriteChange={handleFavoriteChange}
                                                        >
                                                        </CustomCard>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                )})
                            }
                            <div className="row justify-content-center col-md-12 mt-2 mb-2 p-0">
                                <CustomPagination
                                    current={page}
                                    total={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row col-md-12 m-0">
                        <h2>
                            No comics for this one!
                        </h2>
                    </div>
                )}
            </div>

        </div>
    )
};

export default HeroDetail;