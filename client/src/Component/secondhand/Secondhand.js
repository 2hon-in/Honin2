import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jaxios from '../util/jwtUtil';
import s from '../style/secondhand/secondhand.module.css';
import Header from '../layout/Header';
import { useDispatch, useSelector } from 'react-redux';



function Secondhand() {
    const [secondhandList, setSecondhandList] = useState([]);
    const navigate = useNavigate();
    const loginUser = useSelector(state=>state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        jaxios.get(`/api/secondhand/getSecondhandList`)
            .then((result) => {
                setSecondhandList(result.data.secondhandList);
                console.log(result.data.secondhandList);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function SecondhandView(num) {
        jaxios.get(`/api/secondhand/updateReadCount/${num}`)
            .then(() => {
                navigate(`/secondhandView/${num}`);
            })
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <>
            <Header />
            <div className={s.section}>
                <div className={s.container}>
                    <div className={s.block}>
                        <h1>중고거래</h1>
                        <button onClick={()=>{navigate('/secondhandWrite')}}>상품등록</button>
                    </div>
                    <div className={s.gridcontainer}>
                        <div className={s.gridblock}>
                            <div className={s.grid}>
                                {secondhandList.map((sh) => (
                                    <div className={s.card} key={sh.snum} onClick={() => SecondhandView(sh.snum)}>
                                        <div className={s.imageblock}>
                                            {sh.savefilename ? (
                                                <img src={`http://localhost:8070/uploads/secondhand/${sh.savefilename}`} alt="중고거래 아이템 이미지" />
                                            ) : (
                                                <div className={s.imagePlaceholder}>사진 없음</div>
                                            )}
                                        </div>
                                        <div className={s.title}>{sh.title}</div>
                                        <div className={s.info}>
                                            <div className={s.content}>
                                                <div className={s.description}>{sh.content}</div>
                                                <div className={s.price}>{sh.price}</div>
                                                <div className={s.seller}>{sh.seller}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Secondhand;
