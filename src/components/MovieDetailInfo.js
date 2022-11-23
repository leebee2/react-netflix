import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';


const MovieDetailInfo = ({ movieDetail, movieCredits }) => {
    const [limitText, setLimitText] = useState(300); 

    const textEllipsis = (str, limit) => {
        return {
            string: str.slice(0, limit),
            isShowMore: str.length > limit
        }
    };


    return (
        <div>
            <h1>{movieDetail.title}</h1>
            <div className='detail-origin-title'>
                {movieDetail.original_title}, {movieDetail.release_date.slice(0, 4)}
            </div>
            <div>
                {movieDetail.genres.map((item, index) =>
                    <Badge className="detail-badge" bg="danger" key={index}>
                        {item.name}
                    </Badge>)}
            </div>
            <div className='detail-tag-line'>{movieDetail.tagline}</div>
            <div className='detail-vote'>
                <span>
                    <span>
                        <img width={20}
                            src={process.env.PUBLIC_URL + `/img/imdb.png`}
                            alt="imdb"
                        />
                    </span>
                    {movieDetail.vote_average}
                </span>
                <span>
                    <span><FontAwesomeIcon icon="fa-check-to-slot" /></span>
                    {movieDetail.vote_count}
                </span>
            </div>
            <hr />
            <div>
                <Badge bg="danger" className='detail-movie-info'>감독</Badge>
                {(movieCredits?.crew?.filter(({ job }) => job === 'Director'))[0].name}
            </div>
            <div>
                <Badge bg="danger" className='detail-movie-info'>제작예산</Badge>
                ${Number(movieDetail.budget).toLocaleString()}
            </div>
            <div>
                <Badge bg="danger" className='detail-movie-info'>수익</Badge>
                ${Number(movieDetail.revenue).toLocaleString()}
            </div>
            <div>
                <Badge bg="danger" className='detail-movie-info'>개봉일</Badge>
                {movieDetail.release_date}
            </div>
            <div>
                <Badge bg="danger" className='detail-movie-info'>러닝타임</Badge>
                {movieDetail.runtime}분
            </div>
            <hr />
            <div className='detail-overview'>
                {textEllipsis(movieDetail.overview, limitText).string}
                {movieDetail.overview.length >= 300 && (textEllipsis(movieDetail.overview, limitText).isShowMore ? 
                    <span onClick={() => setLimitText(movieDetail.overview.length)}>...더보기</span>
                    : 
                    <span onClick={() => setLimitText(300)}>줄이기</span>
                )}
            </div>
        </div>
    );
};

export default MovieDetailInfo;