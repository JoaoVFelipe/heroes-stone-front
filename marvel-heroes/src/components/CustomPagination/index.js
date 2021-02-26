// react
import React, { Component, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = (props) => {
    const [items, setItems] = useState([]);
    const { total, current, onPageChange } = props;

    const setPage = (value) => {
      if (value < 1 || value > total || value === current) {
          return;
      }
      if (onPageChange) {
          onPageChange(value);
      }
  };

    useEffect(() => {
      const aux = [];
      for (let number = 1; number <= total; number++) {
          aux.push(
            <Pagination.Item key={number} active={number === current} onClick={() => setPage(number)}>
              {number}
            </Pagination.Item>
          );
        }
      setItems(aux);
    }, [])
    

    return (<Pagination>{items}</Pagination>)

}

export default CustomPagination;
