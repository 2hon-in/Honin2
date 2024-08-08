package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.NCareer;
import com.team2.honin.honinserver.entity.NPolicy;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NpolicyDao {

    @Autowired
    EntityManager em;

    public List<NPolicy> getNpolicyList(Paging paging) {
        String sql = "select np from NPolicy np order by npnum desc";
        List<NPolicy> list = em.createQuery(sql, NPolicy.class)
                .setFirstResult(paging.getStartNum()-1)
                .setMaxResults(paging.getDisplayRow())
                .getResultList();
        return list;
    }

}
