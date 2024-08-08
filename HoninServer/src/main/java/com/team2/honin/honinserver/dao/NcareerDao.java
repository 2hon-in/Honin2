package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.NCareer;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NcareerDao {

    @Autowired
    EntityManager em;

    public List<NCareer> getNcareerList(Paging paging) {
        String sql = "select nc from NCareer nc order by ncnum desc";
        List<NCareer> list = em.createQuery(sql, NCareer.class)
                .setFirstResult(paging.getStartNum()-1)
                .setMaxResults(paging.getDisplayRow())
                .getResultList();
        return list;
    }
}
