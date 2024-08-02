package com.team2.honin.honinserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class MemberRepository{

    @Autowired
    MemberRepository mr;
}
