package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.CanonymousRepository;
import com.team2.honin.honinserver.dao.CfreeRepository;
import com.team2.honin.honinserver.dao.CrecommendedRepository;
import com.team2.honin.honinserver.dao.CtipRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CommunityService {

    @Autowired
    CfreeRepository cfr;
    @Autowired
    CtipRepository ctr;
    @Autowired
    CrecommendedRepository crr;
    @Autowired
    CanonymousRepository car;

    public List<?> getPostList(String tableName) {
        switch (tableName) {
            case "cfree":
                return cfr.findAll(Sort.by(Sort.Direction.DESC, "cfnum"));
            case "ctip":
                return ctr.findAll(Sort.by(Sort.Direction.DESC, "ctnum"));
            case "crecommended":
                return crr.findAll(Sort.by(Sort.Direction.DESC, "crnum"));
            case "canonymous":
                return car.findAll(Sort.by(Sort.Direction.DESC, "canum"));
            default:
                return null;
        }
    }
}
