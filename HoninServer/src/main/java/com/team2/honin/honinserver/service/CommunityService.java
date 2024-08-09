package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.*;
import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.dto.Post;
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
    @Autowired
    CommunityDao cdao;

    public List<?> getPostList(Paging paging, String tableName) {
        return cdao.getPostList(paging, tableName);
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

    public int writePost(Post post) {
        switch (post.getSeqname()) {
            case "cfnum":
                Cfree cfree = (Cfree) cfr.findByCfnum(1);
                cfree.setReadcount(cfree.getReadcount() + 1);
                cfr.save(cfree);
                return cfree.getCfnum();
            case "ctnum":
                Ctip ctip = (Ctip) ctr.findByCtnum(1);
                ctip.setReadcount(ctip.getReadcount() + 1);
                ctr.save(ctip);
                return ctip.getCtnum();
            case "crnum":
                Crecommended crec = (Crecommended) crr.findByCrnum(1);
                crec.setReadcount(crec.getReadcount() + 1);
                crr.save(crec);
                return crec.getCrnum();
            case "canum":
                Canonymous cano = (Canonymous) car.findByCanum(1);
                cano.setReadcount(cano.getReadcount() + 1);
                car.save(cano);
                return cano.getCanum();
            default:
                return 1;
        }
    }
}
