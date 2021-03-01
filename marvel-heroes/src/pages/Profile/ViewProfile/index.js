
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CustomCard from '../../../components/CustomCard';
import Header from '../../../components/Header';
import { favoriteOneChar, favoriteOneComic, getAllFavoriteChars, getAllFavoriteComics, unfavoriteOneChar, unfavoriteOneComic } from '../../../services/favoriteAPI';
import { getOneChar, getOneComic } from '../../../services/marvelAPI';

import './index.scss'


const ViewProfile = () => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const [updateArrays, setUpdateArrays] = useState(true);

    const [favoriteChars, setFavoriteChars] = useState([]);
    const [favoriteComics, setFavoriteComics] = useState([]);

    useEffect(() => {
        setUpdateArrays(!updateArrays)
    }, []);

    useEffect(() => {
        getAllFavoriteChars().then(async ({ data }) => {
            if(data.length) {
                const favoriteArray = [];
                await Promise.all(
                    data.map(async (char) => {
                        let charData = {};
                        await getOneChar(char.charId).then(({ data }) => {
                            charData = data.data.results[0];
                            charData.isFavorite = true;
                        });
                        favoriteArray.push(charData);
                        return char;
                    })
                );
                setFavoriteChars(chunkArray(favoriteArray, 5))
            }
        });

        getAllFavoriteComics().then(async ({ data }) => {
            if(data.length) {
                const favoriteArray = [];
                await Promise.all(
                    data.map(async (comic) => {
                        let comicData = {};
                        await getOneComic(comic.comicId).then(({ data }) => {
                            comicData = data.data.results[0];
                            comicData.isFavorite = true;
                        });
                        favoriteArray.push(comicData);
                        return comicData;
                    })
                );
                setFavoriteComics(chunkArray(favoriteArray, 6))
            }
        });
    }, [updateArrays]);

    const handleFavoriteCharChange = (favorite, id) => {
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
        setUpdateArrays(!updateArrays);
    };

    const handleFavoriteComicChange = (favorite, id) => {
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
        setUpdateArrays(!updateArrays);
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

            <div className="row col-md-12 ml-0 content">
                <div className="col-md-10">
                    <h2>
                        {userData?.name}
                    </h2>
                </div>
                <div className="col-md-2 float-right">
                    <a className="float-right edit-link" href="/profile/edit">
                        Edit Profile
                    </a>
                </div>
                <div className="row col-md-12 mt-1 ml-2">
                    {userData?.bio != "" ? userData?.bio : 'No bio found...' }
                </div>

                <hr className="line" />

                <div className="row col-md-12 justify-content-center m-0 p-3"> 
                    <div className="row col-md-12 justify-content-center m-0">
                        <h4>Favorite Characters:</h4>
                    </div>
                    <div className="row col-md-12 justify-content-center m-0 ml-3">
                        {favoriteChars.length != "" ? (
                             
                                favoriteChars.map((charsCol, index) => {
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
                                                             handleFavoriteChange={handleFavoriteCharChange}
                                                        >
                                                        </CustomCard>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                )})
                            
                        ) : 'No favorited characters found...' }
                    </div>
                </div>

                <div className="row col-md-12 justify-content-center m-0 p-3"> 
                    <div className="row col-md-12 justify-content-center m-0">
                        <h4>Favorite Comics:</h4>
                    </div>
                    <div className="row col-md-12 justify-content-center m-0 ml-3">
                        {favoriteComics.length != "" ? (
                             
                             favoriteComics.map((comicsCol, index) => {
                                 return (
                                     <div className="row justify-content-center col-md-12 mt-2 mb-2 p-0">
                                         {comicsCol.map((comic) => {
                                             return (
                                                 <div className="ml-2 mr-2" key={comic.id}>
                                                     <CustomCard
                                                          id={comic.id}
                                                          title={comic.title}
                                                          titleUrl={`comics/${comic.id}`}
                                                          description={comic.description}
                                                          isFavorite={comic.isFavorite}
                                                          imgSrc={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                                                          imgWidth={'190px'}    
                                                          handleFavoriteChange={handleFavoriteComicChange}
                                                     >
                                                     </CustomCard>
                                                 </div>
                                             )
                                         })}
                                     </div>
                             )})
                         
                     ) : 'No favorited comics found...' }
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ViewProfile;