import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jaxios from '../util/jwtUtil';
import s from '../style/secondhand.module.css';
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

    function onSBoardView( num ){
        jaxios.get(`/api/secondhand/updateReadCount/${num}`)
        .then(()=>{
            navigate(`/secondhandView/${num}`);
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    return (
        <>
        <Header/>
        <div className={s.container}>
            <div className={s.block}>
                <h1>중고거래</h1>
            </div>
            <div className={s.grid}>
                {secondhandList.map((sh, idx) => (
                    <div className={s.card} key={sh.snum} onClick={() => onSBoardView(sh.snum)}>
                        <div className={s.imagePlaceholder}>사진 {sh.image}</div>
                        <div className={s.title}>{sh.title}</div>
                        <div className={s.info}>
                            <div className={s.content}>
                                <div className={s.description}>{sh.content}</div>
                                <div className={s.seller}>{sh.seller}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Secondhand;
