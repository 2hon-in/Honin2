package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class MemberService {
    @Autowired
    MemberRepository mr;

}
