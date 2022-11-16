import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const introWord = '영화 넷플릭스를 모티브로 만든 영화 정보 페이지입니다. 다양한 영화 정보가 궁금하시다면 아래 다음을 클릭해주세요.'
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const nav = useNavigate();
        
    useEffect(() => {
        const interval = setInterval(() => {
            setText(text + introWord[count]); // 이전 set한 문자 + 다음 문자
            setCount(count + 1); // 개수 만큼 체크 
        }, 100);

        if (count === introWord.length) {  // Count를 따로 두지 않고 Text.length 체크도 가능
            setVisible(true);
            clearInterval(interval); // 문자열 체크를 통해 setInterval을 해제합니다
        }

        return () => clearInterval(interval); 
    });

    return (
        <div className='intro'>
            <div className='intro-typing'>
                <h2>{text}</h2>
                <Button variant="danger"
                    size="lg"
                    style={visible ? {} : { display: 'none' }}
                    onClick={() => { nav('/') }}
                >
                    다음
                </Button>
            </div>
        </div>
    );
};

export default Intro;