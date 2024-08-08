package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.NcareerDao;
import com.team2.honin.honinserver.dao.NcareerRepository;
import com.team2.honin.honinserver.dao.NpolicyDao;
import com.team2.honin.honinserver.dao.NpolicyRepository;
import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NPolicy;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class NoticeService {
    @Autowired
    NcareerRepository ncr;
    @Autowired
    NpolicyRepository npr;
    @Autowired
    NcareerDao ncdao;
    @Autowired
    NpolicyDao npdao;

    public List<NCareer> getNcareerList(Paging paging) {
        //return ncr.findAll(Sort.by(Sort.Direction.DESC, "ncnum"));
        //return ncr.findByPaging(paging);
        return ncdao.getNcareerList(paging);
    }

    public List<NPolicy> getNpolicyList(Paging paging) {
        return npdao.getNpolicyList(paging);
    }

    public NCareer getNcareer(int ncnum) {
        return ncr.findByNcnum(ncnum);
    }

    public NPolicy getNpolicy(int npnum) {
        return npr.findByNpnum(npnum);
    }
}
