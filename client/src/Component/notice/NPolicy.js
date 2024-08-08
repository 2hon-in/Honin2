import React, {useState, useEffect} from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import axios from 'axios'
import jaxios from '../util/jwtUtil';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import s from "../style/notice/notice.module.css"

function NPolicy() {
    const [npolicyList, setNPolicyList] = useState([]);
    const [ paging, setPaging ] = useState({});
    const navigate = useNavigate();
    const maxLength = 100; // 최대 길이 설정

    useEffect(
        ()=>{
            jaxios.get('/api/notice/getNpolicyList/1')
            .then((result)=>{
                setNPolicyList(result.data.npolicyList);
                setPaging(result.data.paging);
            })
            .catch((err)=>{console.error(err)})
        },[]
    )

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    useEffect(
        ()=>{
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            }
        }
    );

    const handleScroll=()=>{
        const scrollHeight = document.documentElement.scrollHeight - 10; // 스크롤이 가능한 크기
        const scrollTop = document.documentElement.scrollTop;  // 현재 위치
        const clientHeight = document.documentElement.clientHeight; // 내용물의 크기
        if( paging.page && ( scrollTop + clientHeight >= scrollHeight ) ) {
            onPageMove( Number(paging.page) + 1 );
        }
    }

    function onPageMove(page){
        //무한 스크롤
        axios.get(`/api/notice/getNpolicyList/${page}`)
        .then((result)=>{
            setPaging( result.data.paging);
            let npa=[]; 
            npa = [...npolicyList];  // 현재 내용 복사
            npa = [...npa, ...result.data.npolicyList ]; // 새로 조회한 페이지의 목록과 Merge
            setNPolicyList( [...npa] ); // Merge 한 리스트를  복사
        })
        .catch((err)=>{console.error(err)})
    }

    return (
      <>
        <Header></Header>
        <div className={s.section}>
            <div className={s.container}>
                <div className={s.sidebarDiv}>
                    <aside className={s.sidebar}>
                        <span className={s.pClass}>취업정보 및 청년정책</span>
                        <br /><br />
                        <p>취업정보와 청년정책에 대한 내용을 확인 가능합니다.</p>
                        <br/><br/>
                        <nav>
                            <ul className={s.ulClass}>
                                <li onClick={()=>{ navigate('/ncareer') }}><img src = "/api/images/career.png" /><span>취업정보</span></li>
                                <li className={s.active} onClick={()=>{ navigate('/npolicy') }}><img src = "/api/images/policy.png" /><span>청년정책</span></li>
                            </ul>
                        </nav>
                    </aside>
                </div>

                <div className={s.contentDiv} >
                    {
                        (npolicyList)?(
                            npolicyList.map((npolicy, idx)=>{
                                return(
                                    
                                        <main className={s.content} key={idx} onClick={()=>{navigate(`/npolicyView/${npolicy.npnum}`)}}>
                                            <article className={s.post} onClick={()=>{
                                            navigate(`/npolicyView/${npolicy.npnum}`)}}>
                                                <div className={s.post_rank}>{npolicy.npnum}</div>
                                                <div className={s.post_details}>
                                                    <div className={s.post_author}>
                                                        <span>{npolicy.writer}</span>
                                                    </div>
                                                    <div className={s.title}><span>{npolicy.title}</span></div>
                                                    <p>{truncateText(npolicy.content, maxLength)}</p>
                                                    <br/>
                                                    <div className={s.post_stats}>
                                                        <span>조회수 {npolicy.readcount}</span><img src = "/api/images/eye.png" />
                                                    </div>
                                                </div>
                                                <div className={s.imageDiv} onClick={()=>{}}>
                                                    <img src={`/api/images/${npolicy.savefilename}`} /> 
                                                </div>
                                            </article>
                                        </main>
                                    
                                )
                            })
                        ):(null)
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default NPolicy
