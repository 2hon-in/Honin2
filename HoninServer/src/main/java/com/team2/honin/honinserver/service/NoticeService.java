package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.NcareerRepository;
import com.team2.honin.honinserver.dao.NpolicyRepository;
import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NPolicy;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class NoticeService {
    @Autowired
    NcareerRepository ncr;

    @Autowired
    NpolicyRepository npr;

    public List<NCareer> getNcareerList() {
        return ncr.findAll(Sort.by(Sort.Direction.DESC, "ncnum"));
    }

    public List<NPolicy> getNpolicyList() {
        return npr.findAll(Sort.by(Sort.Direction.DESC, "npnum"));
    }
}
