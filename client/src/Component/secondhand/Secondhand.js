import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jaxios from '../util/jwtUtil';
import s from '../style/secondhand/secondhand.module.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, test } from '../store/userSlice';



function Secondhand() {
    const [secondhandList, setSecondhandList] = useState([]);
    const navigate = useNavigate();
    const loginUser = useSelector(state=>state.user);
    const dispatch = useDispatch();

    function test(){
        console.log("loginUser.refreshToken : ", loginUser.refreshToken);
        console.log("loginUser.accessToken : ", loginUser.accessToken);
        if(loginUser.accessToken==null){
            dispatch(test(loginUser.refreshToken))
        }
    }

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

    function onSBoardView(num) {
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
                        <button onClick={()=>{test()}}></button>
                    </div>
                    <div className={s.gridcontainer}>
                        <div className={s.gridblock}>
                            <div className={s.grid}>
                                {secondhandList.map((sh) => (
                                    <div className={s.card} key={sh.snum} onClick={() => onSBoardView(sh.snum)}>
                                        <div className={s.imageblock}>
                                            {sh.savefilename ? (
                                                <img src={`http://localhost:8070/uploads/${sh.savefilename}`} alt="중고거래 아이템 이미지" />
                                            ) : (
                                                <div className={s.imagePlaceholder}>사진 없음</div>
                                            )}
                                        </div>
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
                </div>
            </div>
        </>
    );
}

export default Secondhand;
