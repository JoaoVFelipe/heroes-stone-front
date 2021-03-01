import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import CustomCard from '../../../components/CustomCard';
import CustomPagination from '../../../components/CustomPagination';
import Header from '../../../components/Header';
import { favoriteOneChar, getAllFavoriteChars, unfavoriteOneChar } from '../../../services/favoriteAPI';
import { getCharsByComic, getOneComic } from '../../../services/marvelAPI';
import './index.scss';

const ComicDetail = () => {
    const { id } = useParams();
    const [comicDetail, setComicDetail] = useState(null);
    const [chars, setChars] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);


    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getOneComic(id).then(({ data }) => {
            setComicDetail(data.data.results[0]);
        });
    }, [id]);

    useEffect(() => {
        getAllFavoriteChars().then(({ data }) => {
            setFavoriteList(data);
        }).catch((error) => {
            setFavoriteList([]);
        });
    }, []);

    useEffect(() => {
        if(comicDetail) {
            const offset = (page - 1) * limit;

            getCharsByComic(id, {offset, limit}).then(({ data }) => {
                if (data.data.results) {
                    const chars = data.data.results;
    
                    if (favoriteList.length) {
                        chars.map((char) => {
                            const isFavorite = favoriteList.find((favorite) => favorite.charId == char.id);
                            char.isFavorite = isFavorite ? true : false;
                            return char;
                        });
                    }
                    setChars(chunkArray(chars, 5));
                }
                setTotalPages(Math.ceil(data.data.total / data.data.limit));
            });
        }
    }, [comicDetail, page, limit, favoriteList]);

    
    const chunkArray = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr]
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache;
    }

    const handlePageChange = (page) => {
        setPage(page);
    };
    
    const handleFavoriteChange = (favorite, id) => {
        if(favorite) {
            favoriteOneChar(id).then(({data}) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'Character is now on your favorites!'
                  })
            });
        } else {
            unfavoriteOneChar(id).then(({data}) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'Character is not on your favorites anymore!'
                  })
            });

        }
    }

    return (
        <div>
            <Header showMenu></Header>

            <div className="row col-md-12 ml-0 justify-content-center content">
                <div className="row col-md-12 justify-content-center ml-0 mb-3">
                    <img className="comic-image" src={`${comicDetail?.thumbnail?.path}.${comicDetail?.thumbnail?.extension}`}></img>
                </div>
                <div className="row col-md-12 justify-content-center">
                    <h2>
                        {comicDetail?.title}
                    </h2>
                </div>

                <div className="row col-md-12 justify-content-center m-0 p-3"> 
                    {comicDetail?.description != "" ? comicDetail?.description : 'No description found...'}
                </div>

                <hr className="line"/>

                {chars?.length ? (
                    <div className="row col-md-12 m-0"> 
                        <h2>
                            Characters: 
                        </h2>


                        <div className="row col-md-12 justify-content-center content">
                            {
                                chars?.map((charsCol, index) => {
                                    return (
                                        <div className="row justify-content-center col-md-12 mt-2 mb-2 p-0">
                                            {charsCol.map((char) => {
                                                return (
                                                    <div className="ml-2 mr-2" key={char.id}>
                                                        <CustomCard
                                                             id={char.id}
                                                             title={char.name}
                                                             titleUrl={`heroes/${char.id}`}
                                                             description={char.description}
                                                             isFavorite={char.isFavorite}
                                                             imgSrc={char.thumbnail.path + '.' + char.thumbnail.extension}
                                                             imgWidth={'200px'}    
                                                             handleFavoriteChange={handleFavoriteChange}
                                                        >
                                                        </CustomCard>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                )})
                            }
                            <div>
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
                            No Characters on this one!
                        </h2>
                    </div>
                )}
                

            </div>

        </div>
    )
};

export default ComicDetail;