import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCard from '../../../components/CustomCard';
import CustomPagination from '../../../components/CustomPagination';
import Header from '../../../components/Header';
import { getCharsByComic, getOneComic } from '../../../services/marvelAPI';
import './index.scss';

const ComicDetail = () => {
    const { id } = useParams();
    const [comicDetail, setComicDetail] = useState(null);
    const [chars, setChars] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getOneComic(id).then(({ data }) => {
            setComicDetail(data.data.results[0]);
        });
    }, [id]);

    useEffect(() => {
        if(comicDetail) {
            const offset = (page - 1) * limit;

            getCharsByComic(id, {offset, limit}).then(({ data }) => {
                setChars(chunkArray(data.data.results, 5));
                setTotalPages(Math.ceil(data.data.total / data.data.limit));
            });
        }
    }, [comicDetail, page, limit]);

    
    const chunkArray = (arr, chunkSize = 1, cache = []) => {
        const tmp = [...arr]
        if (chunkSize <= 0) return cache
        while (tmp.length) cache.push(tmp.splice(0, chunkSize))
        return cache;
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

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
                                            {charsCol.map((chars) => {
                                                return (
                                                    <div className="ml-2 mr-2" key={chars.id}>
                                                        <CustomCard
                                                            title={chars.name}
                                                            titleUrl={`heroes/${chars.id}`}
                                                            imgSrc={chars.thumbnail?.path + '.' + chars.thumbnail?.extension}
                                                            imgWidth={'200px'}>
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