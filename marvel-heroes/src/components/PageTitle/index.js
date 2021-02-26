import React from 'react';
import { Button, Form, FormControl } from "react-bootstrap";


const PageTitle = (props) => {

    return (
        <React.Fragment >
           <div className="row col-md-12 mt-3">
                <div className="col-md-8">
                    <h2>
                        {props.title}
                    </h2>
                </div>
                <div className="col-md-4">
                    <Form inline className="float-right">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-danger">Search</Button>
                    </Form>
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
};

export default PageTitle;