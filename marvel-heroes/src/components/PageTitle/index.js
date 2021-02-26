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
                            <span>
                                <i class="fas fa-search"></i>
                            </span>
                        </Button>
                    </Form>
                </div>
            </div>
            <hr className="line"/>
        </React.Fragment>
    );
};

export default PageTitle;