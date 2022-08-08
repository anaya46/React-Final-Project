import React, { useEffect, useState } from 'react';
import { filterCategoryThunk, filterTitleThunk, getProductsThunk } from '../store/slices/Products.slice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import {Row, Card, Col, InputGroup, Form, Button, ListGroup } from "react-bootstrap"
import axios from "axios";
import "../styles/Home.css" 

const Home = () => {
    const products = useSelector (state => state.Products)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("")
    const [categories,setCategories] = useState([]);



useEffect(() =>{
    dispatch(getProductsThunk())

    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res => setCategories(res.data.data.categories))

}, [])

    return (
        <div>
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        <h3>Categories</h3>
                        {
                            categories.map(category => (
                                <ListGroup.Item key={category.id} onClick={()=> dispatch(filterCategoryThunk(category.id))}>
                                    {category.name}
                                </ListGroup.Item>

                            ))
                        }
                    </ListGroup>
                 </Col>
                <Col>
                    
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="What are you looking for?"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                            />
                    <Button variant="outline-secondary" onClick={()=> dispatch(filterTitleThunk(searchValue))}>
                        <i className='fa-solid fa-magnifying-glass'></i>   
                    </Button>
                    </InputGroup>









                    <Row xs={1} md={2} xl={3} className="g-4">
                        {products?.map(product =>(
                            <Col key={product.id}>
                                <Card  onClick={()=> navigate (`/shop/${product.id}`)}>
                                    <Card.Img variant="top" src={product.productImgs} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>Price <b> $ {product.price}</b> </Card.Text>
                                     </Card.Body>
                                </Card>
                            </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;