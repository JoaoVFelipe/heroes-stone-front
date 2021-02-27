import React, { useEffect, useState } from 'react';
import CustomPagination  from '../../../components/CustomPagination';
import CustomCard from '../../../components/CustomCard';
import Header from '../../../components/Header';
import PageTitle from '../../../components/PageTitle';

import { getAllChars } from '../../../services/marvelAPI';
import { getAllFavoriteChars, favoriteOneChar, unfavoriteOneChar } from '../../../services/favoriteAPI';
import Swal from 'sweetalert2';

const HeroesList = () => {
    const [chars, setChars] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getAllFavoriteChars().then(({ data }) => {
            setFavoriteList(data);
        }).catch((error) => {
            setFavoriteList([]);
        });
    }, []);

    useEffect(() => {
        const offset = (page - 1) * limit;
        const searchBy = (search && search != '' ? search : null);

        getAllChars({offset, limit, nameStartsWith: searchBy}).then(({ data }) => {
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
    }, [page, limit, search, favoriteList]);

    const handleFavoriteChange = (favorite, id) => {
        if(favorite) {
            favoriteOneChar(id).then(({data}) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Yay!',
                    text: 'Character is now on yout favorites!'
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

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleSearchChange = (searchText) => {
        setPage(1);
        setSearch(searchText);
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
            <PageTitle title={(search && search != '') ? `Searching by: '${search}'` : "All Characters!"} onSearchChange={handleSearchChange}></PageTitle>
           
            <div className="row col-md-12 justify-content-center content">
                {
                    chars.map((charCol, index) => {
                        return (
                            <div className="row justify-content-center col-md-12 mt-2 mb-2">
                                {charCol.map((char) => {
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

export default HeroesList;