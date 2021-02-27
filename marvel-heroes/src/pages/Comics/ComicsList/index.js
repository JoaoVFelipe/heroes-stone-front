import React, { useEffect, useState } from 'react';
import CustomPagination  from '../../../components/CustomPagination';
import CustomCard from '../../../components/CustomCard';
import Header from '../../../components/Header';
import PageTitle from '../../../components/PageTitle';

import { getAllComics } from '../../../services/marvelAPI';
import { favoriteOneComic, unfavoriteOneComic } from '../../../services/favoriteAPI';
import Swal from 'sweetalert2';

const ComicList = () => {
    const [comics, setComics] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [limit, setLimit] = useState(24);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const offset = (page - 1) * limit;
        const searchBy = (search && search != '' ? search : null);

        getAllComics({offset, limit, titleStartsWith: searchBy}).then(({ data }) => {
            const comics = data.data.results
            if (favoriteList.length) {
                comics.map((char) => {
                    const isFavorite = favoriteList.find((favorite) => favorite.charId == char.id);
                    char.isFavorite = isFavorite ? true : false;
                    return char;
                });
            }
            setComics(chunkArray(comics, 6));
            setTotalPages(Math.ceil(data.data.total / data.data.limit));
        });
    }, [page, limit, search]);

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleSearchChange = (searchText) => {
        setPage(1);
        setSearch(searchText);
    };

    const handleFavoriteChange = (favorite, id) => {
        if(favorite) {
            favoriteOneComic(id).then(({data}) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'Comic is now on yout favorites!'
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
    }
    
    const chunkArray = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr]
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache;
    }

    return (
        <div>
            <Header showMenu></Header>
            <PageTitle title={(search && search != '') ? `Searching by: '${search}'` : "All Comics!"} onSearchChange={handleSearchChange}></PageTitle>
           
            <div className="row col-md-12 justify-content-center content">
                {
                    comics.map((comicCol, index) => {
                        return (
                            <div className="row justify-content-center col-md-12 mt-2 mb-2">
                                {comicCol.map((comic) => {
                                    return (
                                        <div className="ml-2 mr-2">
                                            <CustomCard
                                                id={comic.id}
                                                title={comic.title}
                                                titleUrl={`/comics/${comic.id}`}
                                                titleSize={'14px'}
                                                description={comic.description}
                                                imgSrc={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                                                imgWidth={'190px'}    
                                                handleFavoriteChange={handleFavoriteChange}
                                            >
                                            </CustomCard>
                                        </div>
                                    )
                                })}
                            </div>
                    )})
                }
            </div>
            <div className="row col-md-12 justify-content-center">
                <CustomPagination
                    current={page}
                    total={totalPages}
                    onPageChange={handlePageChange}
                />
            </div> 

        </div>
    )
};

export default ComicList;