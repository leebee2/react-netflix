import React from 'react';

const CastCard = ({ cast }) => {
    const imgBaseUrl = 'https://image.tmdb.org/t/p/w276_and_h350_face';
    const profilImgSrc = cast.profile_path === null ? process.env.PUBLIC_URL + `/img/unknown.jpeg` : `${imgBaseUrl}${cast.profile_path}`
    return (
        <div className='castcard'>
            <img src={profilImgSrc}
                alt="profil img"/>
            <div className='castcard-info'>
                <div className='name'>
                    {cast.name}
                </div>
                <div className='character'>
                    {cast.character}
                </div>
            </div>
        </div>
    );
};

export default CastCard;