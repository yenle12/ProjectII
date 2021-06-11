import React from 'react';
import { Row, Card, CardImg, CardBody, CardTitle} from 'reactstrap';
import Image from 'react-bootstrap/Image';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';

function Home(props) {

        return  (
            <>
            <div>
	            <Row className=" justify-content-center" >
	                <Image className="col-10 col-md-10 m-1" src= {baseUrl+"images/logo.jpg"} fluid/>
	            </Row>
	            <Row className="m-1 justify-content-center" >	                
		            <div className="col-12 col-md m-1">
		            <Link to="/menu">
		            <Card>
	                    <CardImg src={baseUrl+"images/dine_in.jpg"} className ="card-img-top"/>
	                    <CardBody>
	                        <CardTitle>{"Dine In"}</CardTitle>
	                    </CardBody>
	                </Card>
	                </Link>
	                </div>
	                <div className="col-12 col-md m-1">
	                <Link to="/menu">
		            <Card>
	                    <CardImg src={baseUrl +"images/take_out.jpg"} className ="card-img-top"/>
	                    <CardBody>
	                        <CardTitle>{"Take Out"}</CardTitle>
	                    </CardBody>
	                </Card>
	                </Link>
	                </div>
	                <div className="col-12 col-md m-1">
	                <Link to="/menu">
		            <Card>
	                    <CardImg src={baseUrl +"images/monthly_special.jpg"} className ="card-img-top"/>
	                    <CardBody>
	                        <CardTitle>{"Recommended"}</CardTitle>
	                    </CardBody>
	                </Card>
	                </Link>
	                </div>
	            </Row>
            </div>

            </>
      );

}

export default Home;
