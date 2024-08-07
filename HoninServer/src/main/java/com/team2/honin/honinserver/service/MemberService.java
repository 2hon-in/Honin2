package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MemberRepository;
import com.team2.honin.honinserver.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Transactional
public class MemberService {

    @Autowired
    MemberRepository mr;

    public Member getMember(String email) {
        Optional<Member> mem = mr.findByEmail(email);

        if (!mem.isPresent()) {
            return null;
        } else {
            return mem.get();
        }
    }

    public Member getMemberByNickname(String nickname) {
        Optional<Member> mem = mr.findByNickname(nickname);
        if (!mem.isPresent()) {
            return null;
        } else {
            return mem.get();
        }
    }

    public void insertMember(Member member) {
        mr.save(member);
    }

    public Member getMemberBySnsid(String id) {
        Optional<Member> mem = mr.findBySnsid(id);
        if( !mem.isPresent() ){
            return null;
        }else {
            return mem.get();
        }
    }
}
