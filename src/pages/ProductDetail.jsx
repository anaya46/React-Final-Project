import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/Products.slice';


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

        const filteredProducts = allProducts.filter(((productItem) => productItem.category.id === productFind.category.id))
        setSuggesProducts(filteredProducts);
    },[allProducts, id])


    return (
        <div>
            
            <img src={productDetail?.productImgs} alt="" />
            <h2>{productDetail?.title}</h2>
            <span>Price</span> <br />
            <span><b>{productDetail?.price}</b></span>
            <p>{productDetail?.description}</p>
            <h3>Discover similar items</h3>

            <ul>

            {
                suggesProducts.map(products=>(
                    <li key = {products.id} onClick={()=>navigate(`/shop/${products.id}`)}>
                         <img src={products.productImgs} alt="" /> <br />
                       <strong>{products.title}</strong> <br />
                       <span>Price</span> <br />
                       <span><b>{products.price}</b></span>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default ProductDetail;