// react
import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import './index.scss';

const CustomPagination = (props) => {
    const [items, setItems] = useState([]);
    const { onPageChange, total, current } = props;

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
      if(current > 1) {
        aux.push(
          <Pagination.Item key={0} active={false} onClick={() => setPage(current - 1)} >
            Previous
          </Pagination.Item>
        );
      }
     
      for (
        let number = (current - 2 > 0 ? current - 2 : 1); 
        number <= (current + 2 < total ? current + 2 : current + (total - current)); 
        number++
      ) {
          aux.push(
            <Pagination.Item key={number} active={number === current} onClick={() => setPage(number)}>
              {number}
            </Pagination.Item>
          );
        }

      if(current != total) {
        aux.push(
          <Pagination.Item key={total+1} active={false} onClick={() => setPage(current + 1)} >
            Next
          </Pagination.Item>
        );
      }
      setItems(aux);

      
    }, [current, total])
    

    return (<Pagination>{items}</Pagination>)

}

export default CustomPagination;
