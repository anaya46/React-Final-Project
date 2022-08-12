import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/Products.slice';
import { Button, Form, InputGroup } from "react-bootstrap";
import "../styles/ProductDetail.css" 
import { addProductCarThunk } from '../store/slices/cart.slice';


const ProductDetail = () => {

    const allProducts = useSelector(state => state.Products);
    const [productDetail, setProductDetail]= useState({});
    const [suggesProducts, setSuggesProducts]=useState([]);
    const navigate = useNavigate();

    const {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(()=>{
            dispatch(getProductsThunk())
    },[]);
    useEffect(()=>{
        const productFind = allProducts.find((productItem) => productItem.id === Number(id) )
        setProductDetail(productFind);

        const filteredProducts = allProducts.filter(((productItem) => productItem?.category.id === productFind?.category.id))
        setSuggesProducts(filteredProducts);
    },[allProducts, id])

    const addCar = () => {
        alert("añadido a carrito")
        const car = {
            id: productDetail.id,
            quantity: counter

            
        };
        dispatch(addProductCarThunk(car))
        console.log(car);
        
      };

      const [counter, setCounter] = useState(1);

      const increment = () => {
        setCounter(counter + 1)
      };

      const decrement = () => {
        setCounter(counter - 1)
      }
      

    return (
        <div>
           <div className='ppal-card' >
                <img className= "ppal-img"src={productDetail?.productImgs} alt="" />
                <h2>{productDetail?.title}</h2>
            </div> 
            <div className='pq'>
                <span className="price-title">Price</span> <br />
                <span className="price"><b> $ {productDetail?.price}</b></span>
             
                <InputGroup className="mb-3 input-count">
                    <span className="quatNam"style={{color: "rgb(180, 178, 178)"}}>Quantity</span> 
                    <Button 
                        variant="outline-secondary"
                        onClick={decrement}
                        disabled = {counter ===1}
                        >
                        <i className="fa-solid fa-minus"></i>
                     </Button>
                    <div className='value'>{counter}</div>
                    <Button 
                        variant="outline-secondary"
                        onClick={increment}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </Button>
                </InputGroup>
            </div>

            <div>
              
             <InputGroup className="mb-3 input-add">
                <Button  className= "butAdd"
                    onClick={addCar} 
                    variant="outline-secondary" 
                    id="button-addon2">
                    <strong className='textAdd'>Add to cart     </strong>  
                     <i className="fa-solid fa-cart-shopping"></i>
                </Button>
             </InputGroup>
             <p className="descrip">{productDetail?.description}</p>
            </div>
            
            <strong className="disc">Discover similar items</strong>

            <ul>

            {
                suggesProducts.map(products=>(
                    <li key = {products.id} onClick={()=>navigate(`/shop/${products.id}`)}>
                        <div className='img-container'>
                             <img className='second-img' src={products.productImgs} alt="" /> 
                        </div>
                        
                        <div className='card'>
                            <strong className="prodTitle">{products.title}</strong> <br />
                            <span className="price2">Price</span> <br />
                            <span className="price2"><b>{products.price}</b></span> <br />
                            <Button 
                                onClick={addCar}
                                className='butt2'>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Button>




                        </div>
                       
                     
                    </li>
                ))
            }
            
            </ul>
          
        </div>
    );
};

export default ProductDetail;