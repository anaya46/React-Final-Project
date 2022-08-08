import React from 'react';
import "../styles/LoadingScreen.css"
import {Spinner} from "react-bootstrap"

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Spinner animation="border" variant="info" />   Loading...
        </div>
    );
};

export default LoadingScreen;