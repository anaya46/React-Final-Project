import React, { useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import  "../styles/Purchases.css";

const Purchases = () => {
    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases);
    

    useEffect(()=>{
        dispatch(getPurchasesThunk());
        
    },[])

   
    return (
        <div>
            <h1>My Purchases</h1>
            <div >
                {
                    purchases.map(purchase => (
                        <div className='card' key={purchase.id}>
                            <div className='date'>
                              <b>{new Date(purchase.updatedAt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) }</b>
                            </div>
                                <div>
                               {    purchase.cart?.products.map(finalPurchases => (
                                        <li key={finalPurchases.id}                 className='productDetail'>
                                            <div className='productName'>{finalPurchases.title} </div>    
                                            <div className='quantity'>{finalPurchases.productsInCart.quantity}</div>     
                                          <div className='price'> $ {finalPurchases.price}</div> 
                                    </li> 
                                   ) )}
                                </div>
                           </div>
                    
                      )  )
                    }
            </div>
        </div>
    );
};

export default Purchases;