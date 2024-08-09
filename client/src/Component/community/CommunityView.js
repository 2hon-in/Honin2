import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import jaxios from '../util/jwtUtil';
import s from "../style/community/communityView.module.css"
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CommunityViewSide from './CommunityViewSide';
import axios from 'axios';

function CommunityView() {
    // seq : 각 테이블의 기본키 컬럼명 (cfnum, crnum, ...)
    const { seq, seqNum } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        console.log("seq, seqNum : ", seq, " ", seqNum);
        
        // seq로 테이블을 구분하여 접근, seqNum으로 데이터를 조회
        jaxios.get(`/api/community/getPostOne/${seq}/${seqNum}`)
            .then(res => {
                setPost(res.data.post);
                console.log("res.data.post : ", res.data.post);
            })
            .catch(err => console.error(err));
        
        jaxios.post(`/api/community/updateReadCount/${seq}/${seqNum}`)
    }, [])

    return (
        <div className={s.wrap}>
            <Header></Header>
            <CommunityViewSide></CommunityViewSide>
            <div className={s.post_container}>
                <div className={s.post_header}>
                    <div className={s.post_writer}>{post.writer}</div>
                    <h2>{post.title}</h2>
                </div>
                <div className={s.post_content}>
                    <p>{post.content}</p>
                    <div className={s.post_actions}>
                        <button>좋아요</button>
                        <div>조회수</div>
                    </div>
                </div>
                <div className={s.comments_section}>
                    <h3>댓글 reply.size</h3>
                    <div className={s.comment}>
                        <p>댓글content</p>
                        <div className={s.comment_meta}>
                            <span>댓글writedate</span>
                            <button>댓글like</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default CommunityView
