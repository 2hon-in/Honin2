import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import jaxios from '../util/jwtUtil';
import { useSelector, useDispatch } from 'react-redux';
import s from "../style/notice/noticeView.module.css"

function NpolicyView() {

    const [npolicy, setNpolicy] = useState({});
    const loginUser = useSelector( state => state.user );
    const {npnum} = useParams();
    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get(`/api/notice/getNpolicy/${npnum}`)
            .then((result)=>{
                setNpolicy( result.data.npolicy );
            })
            .catch((err)=>{
                console.error(err);
            })
        },[]
    )

    return (
        <>
            <Header></Header>
                <div className={s.container}>
                    <hr/>
                        <h1 className={s.title}>{npolicy.title}</h1>
                        <div className={s.date}>{npolicy.writedate}</div>
                    <hr/>

                    <br />
                    <div className={s.downloadSection}>
                        <div className={s.fileList}>
                            <label className={s.imageLabel}>
                                20240628_청년정책_우수기관_보도자료.pdf 457.36 KB<img src = "/api/images/pdf.png" />
                            </label>
                        </div>
                    </div>
                    <br />

                    <div className={s.content}>
                        <p style={{color:"red"}}>
                            {npolicy.content}
                        </p>
                        <p>
                            ○ 고용노동부(장관 이정식)와 (사)한국청년정책연구원이 '2024년(2023년도 실적)'청년정책 우수기관을 발표했다.
                            <br />
                            ○ 올해 6월 한달 간 행안부, 교육부 등 17개 시-도와 5개 공공기관이 참여하여, 청년정책 우수기관을 발굴·선정하는 심사를 진행하였다.
                            <br />
                            ○ 본 수상기관은 우수한 정책 추진 성과를 바탕으로 국민이 체감할 수 있는 청년정책을 발굴하여, 2024년 청년정책 박람회(2024.10.)에서 시상할 예정이다.
                            <br />
                            ○ 특히, 행안부는 청년참여를 확대하고, 교육부는 지역청년의 목소리를 반영한 정책들을, 중기부는 청년창업지원 프로그램 확대 등의 공로를 인정받았다.
                            <br />
                            ○ 청년정책연구원은 청년들이 참여할 수 있는 다양한 프로그램을 개발, 확산하여 청년들이 직접 정책과정에 참여할 수 있도록 하는 온라인 서비스(DB청년)를 운영할 예정이다.
                        </p>
                        <p>
                            "청년정책평가"는 청년들의 정책 참여를 확대하기 위해 정보통신망을 DB화하고 정책수립에 있어 청년의 참여도를 높일 수 있도록 한 온라인 서비스(DB청년)를 통해서 이루어진다.
                        </p>
                        <p>
                            □ 청년정책 평가결과 발표
                            <br />
                            - 우수정책 : 울산광역시, 교육부, 국토부, 중기부, 중부발전, 통영, 부산, 대전, 충북, 제주
                            <br />
                            - 정책확산 : 17개 시-도와 5개 공공기관
                            <br />
                            - 기타분야 : 서울시, 청주, 제주
                        </p>
                        <p>
                            고용노동부는 “이번 평가 결과가 향후 청년 정책 개선에 기여할 것으로 기대된다. 청년들이 정책과정에 참여할 수 있는 창의적 프로그램을 지속적으로 발굴하여, 공공기관과 협업을 통해 청년정책 확대에 기여할 것”이라 밝혔다.
                        </p>
                    </div>
                    <button className={s.button} onClick={()=>{ 
                        navigate('/npolicy') 
                    }}>목록</button>
                </div>
            <Footer></Footer>
        </>
    )
}

export default NpolicyView
