import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jaxios from '../util/jwtUtil';
import s from '../style/secondhand/secondhand.module.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useParams } from 'react-router-dom';

function Secondhand(props) {
    const [secondhandList, setSecondhandList] = useState([]);
    const [simg, setSimg] = useState([]);
    const navigate = useNavigate();
    const {num} = useParams();

    useEffect(() => {
        
        jaxios.get(`/api/secondhand/getSecondhandList`) 
            .then((result) => {
               setSecondhandList([...result.data.secondhandList]);
               console.log(result.data.secondhandList);
            })
            .catch((err) => {
               console.error(err);
            });
        
        jaxios.get(`/api/secondhand/getSImg/${num}`)
            .then((result)=>{
                setSimg([...result.data.setSimg])
            })
            .catch((err)=>{
                console.error(err);
            })
    
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
        <div className={s.section}>
        <div className={s.container}>
            <div className={s.block}>
                <h1>중고거래</h1>
            </div>
            <div className={s.grid}>
                {secondhandList.map((sh, idx) => (
                    <div className={s.card} key={sh.snum} onClick={() => onSBoardView(sh.snum)}>
                        <div className={s.imagePlaceholder}>사진 
                            {
                                
                                 (simg)?(simg.map((img, idx)=>{
                                  return (
                                    <img key={idx} src={`http://localhost:8070/uploads/${img.savefilename}`}></img>
                                  )
                                })):(null)
                               
                            }
                            {sh.image}</div>
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
        </div>
        <Footer/>
        </>
    );
}

export default Secondhand;
