import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jaxios from '../util/jwtUtil'
import s from '../style/secondhand.module.css'
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function Secondhand() {
    const [secondhandList, setSecondhandList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
    
        jaxios.get(`/api/secondhand/getSecondhandList`) 
            .then((result) => {
                 setSecondhandList([...result.data.secondhandList]);
                 console.log(result.data.secondhandList);
             })
             .catch((err) => {
                 console.error(err);
             });

    }, []);

    async function onBoardView(num) {
        // 게시판 상세보기 로직 구현
    }

    return (

        <div className={s.container}>
            <h1>중고거래</h1>
            <div className={s.grid}>
                {secondhandList.map((sh, idx) => (
                    <div className={s.card} key={sh.snum} onClick={() => onBoardView(sh.snum)}>
                        <div className={s.imagePlaceholder}>사진 {sh.image}</div>
                        <blockquote>Quote</blockquote>
                        <div className={s.info}>
                            <img src={sh.image} alt="Seller" className={s.avatar} />
                            <div>
                                <div className={s.title}>{sh.title}</div>
                                <div className={s.description}>{sh.content}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Secondhand;
