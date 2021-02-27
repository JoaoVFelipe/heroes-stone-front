import React, { useState } from 'react';
import { Button, Form, FormControl } from "react-bootstrap";
import './index.scss';

const PageTitle = (props) => {
    const [text, setText] = useState();
    const { onSearchChange } = props;

    const applySearch = () => {
        onSearchChange(text)
    }

    return (
        <React.Fragment >
           <div className="row col-md-12 mt-3">
                <div className="col-md-8">
                    <h2>
                        <b>
                            {props.title}
                        </b>
                    </h2>
                </div>
                <div className="col-md-4">
                    <Form inline className="float-right">
                        <FormControl 
                            type="text" 
                            placeholder="Search" 
                            className="mr-sm-2" 
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button variant="outline-danger" onClick={() => {
                            applySearch() 
                        }}>
                            <svg id="search-icon" class="search-icon" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>

                        </Button>
                    </Form>
                </div>
            </div>
            <hr className="line"/>
        </React.Fragment>
    );
};

export default PageTitle;