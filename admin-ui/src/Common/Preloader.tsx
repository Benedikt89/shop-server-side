import React from 'react';
import preloader from "../assets/images/Spinner.svg";

let Preloader = () => {
    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            width: '100%'
        }}>
            <img src={preloader} alt={"Preloader Spinner"}/>
        </div>
    );
};

export default Preloader;