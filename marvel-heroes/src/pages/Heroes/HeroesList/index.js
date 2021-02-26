import React, { useEffect, useState } from 'react';
import CustomPagination  from '../../../components/CustomPagination';
import CustomCard from '../../../components/CustomCard';
import Header from '../../../components/Header';
import { getAllChars } from '../../../services/marvelAPI';
import { Button, Form, FormControl } from 'react-bootstrap';
import PageTitle from '../../../components/PageTitle';

const HeroesList = () => {
    const [chars, setChars] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const offset = (page - 1) * limit;
        getAllChars({offset, limit}).then(({ data }) => {
            setChars(chunkArray(data.data.results, 4));
            setTotalPages(Math.ceil(data.data.total / data.data.limit));
            console.log("TOTAL", Math.ceil(data.data.total / data.data.limit))
        });
    }, [page]);

    const handlePageChange = (page) => {
        setPage(page);
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
            <PageTitle title="All Heroes!"></PageTitle>
           
            <div className="row col-md-12 justify-content-center content">
                {
                    chars.map((charCol, index) => {
                        return (
                            <div className="row justify-content-center col-md-12 mt-2 mb-2">
                                {charCol.map((char) => {
                                    return (
                                        <div className="ml-2 mr-2">
                                            <CustomCard
                                                title={char.name}
                                                titleUrl={`heroes/${char.id}`}
                                                description={char.description}
                                                imgSrc={char.thumbnail.path + '.' + char.thumbnail.extension}
                                                imgWidth={'260px'}    
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