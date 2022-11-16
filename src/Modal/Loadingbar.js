import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loadingbar = ({ loading }) => {
    return (
        <div className='spinner'>
            <ClipLoader
                color="#fffff"
                loading={loading}
                size={150} />
        </div>
    );
};

export default Loadingbar;