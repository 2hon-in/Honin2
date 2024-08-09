package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.CanonymousRepository;
import com.team2.honin.honinserver.dao.CfreeRepository;
import com.team2.honin.honinserver.dao.CrecommendedRepository;
import com.team2.honin.honinserver.dao.CtipRepository;
import com.team2.honin.honinserver.entity.Canonymous;
import com.team2.honin.honinserver.entity.Cfree;
import com.team2.honin.honinserver.entity.Crecommended;
import com.team2.honin.honinserver.entity.Ctip;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            case "자유게시판":
                return cfr.findAll(Sort.by(Sort.Direction.DESC, "cfnum"));
            case "팁과노하우":
                return ctr.findAll(Sort.by(Sort.Direction.DESC, "ctnum"));
            case "업체추천":
                return crr.findAll(Sort.by(Sort.Direction.DESC, "crnum"));
            case "고민상담":
                return car.findAll(Sort.by(Sort.Direction.DESC, "canum"));
            default:
                return null;
        }
    }

    public Object getPostOne(String seq, Integer seqNum) {
        switch (seq) {
            case "cfnum":
                return cfr.findByCfnum(seqNum);
            case "ctnum":
                return ctr.findByCtnum(seqNum);
            case "crnum":
                return crr.findByCrnum(seqNum);
            case "canum":
                return car.findByCanum(seqNum);
            default:
                return null;
        }
    }

    public void updateReadCount(String seq, Integer seqNum) {
        switch (seq) {
            case "cfnum":
                Cfree cfree = (Cfree) cfr.findByCfnum(seqNum);
                cfree.setReadcount(cfree.getReadcount() + 1);
                cfr.save(cfree);
                break;
            case "ctnum":
                Ctip ctip = (Ctip) ctr.findByCtnum(seqNum);
                ctip.setReadcount(ctip.getReadcount() + 1);
                ctr.save(ctip);
                break;
            case "crnum":
                Crecommended crec = (Crecommended) crr.findByCrnum(seqNum);
                crec.setReadcount(crec.getReadcount() + 1);
                crr.save(crec);
                break;
            case "canum":
                Canonymous cano = (Canonymous) car.findByCanum(seqNum);
                cano.setReadcount(cano.getReadcount() + 1);
                car.save(cano);
                break;
            default:
                break;
        }
    }

}
