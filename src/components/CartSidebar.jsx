import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartSlice, { buyCartThunk, getCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const carDetails = useSelector(state => state.cart);

    const navigate = useNavigate()

    useEffect(()=>{
            dispatch(getCartThunk());
    }, []);

    
    const totalByProduct = carDetail =>{
      return carDetail?.productsInCart?.quantity * Number(carDetail?.price)
    }


    const getTotal = () => {
      let total = 0  
      carDetails.forEach(carDetail => {
        total += totalByProduct(carDetail)
      })

      return total
       
    }
    

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {
              carDetails.map(carDetail =>(
                <li key={carDetail.id} onClick={() => navigate(`/shop/${carDetail.productsInCart.productId}`)}>
                  <h5>{carDetail.title}</h5> <br />
                  <div> Price : $ {carDetail.price}</div> <br />
                  <div> Quantity :  {carDetail.productsInCart.quantity} Un</div><br />
                  <p>Total by product : $ {totalByProduct(carDetail)}</p>
                  <hr />
                </li>
                
              ))
            }
          </ul>

         <h6>Total by Cart : $  {getTotal()} </h6> <hr />

          <div className="row justify-content-center" >
             <Button className="col-auto" onClick={()=>dispatch(buyCartThunk())}>Buy cart</Button>
          </div>
          
        </Offcanvas.Body>
        
      </Offcanvas>
      
    );
  };
  

export default CartSidebar;