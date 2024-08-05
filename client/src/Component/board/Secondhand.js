import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jaxios from '../util/jwtUtil';
import s from '../style/secondhand.module.css';

function Secondhand() {
    const [secondhandList, setSecondhandList] = useState([]);
    const [snum, setSnum] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        if (snum) {
            jaxios.get(`/api/board/getSecondhandList/${snum}`) 
                .then((result) => {
                    setSecondhandList([...result.data.secondhandList]);
                    console.log(result.data.secondhandList);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [snum]);

    async function onBoardView(num) {
        // 게시판 상세보기 로직 구현
    }

    return (
        <div className={s.container}>
            <h1>중고거래</h1>
            <div className={s.grid}>
                {secondhandList.map((sh, idx) => (
                    <div className={s.card} key={sh.snum} onClick={() => onBoardView(sh.num)}>
                        <div className={s.imagePlaceholder}>사진 {sh.image}</div>
                        <blockquote>Quote</blockquote>
                        <div className={s.info}>
                            <img src={sh.image} alt="Seller" className={s.avatar} />
                            <div>
                                <div className={s.title}>{sh.title}</div>
                                <div className={s.description}>{sh.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Secondhand;
