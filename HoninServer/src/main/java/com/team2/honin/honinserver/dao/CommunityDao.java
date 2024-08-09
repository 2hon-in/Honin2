package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.*;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CommunityDao {

    @Autowired
    EntityManager em;

    public List<?> getPostList(Paging paging, String tableName) {
        switch (tableName) {
            case "자유게시판":
                String cfSql = "SELECT cfr FROM Cfree cfr ORDER BY cfnum DESC";
                return em.createQuery(cfSql, Cfree.class)
                        .setFirstResult(paging.getStartNum()-1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            case "팁과노하우":
                String ctSql = "SELECT ct FROM Ctip ct ORDER BY ctnum DESC";
                return em.createQuery(ctSql, Ctip.class)
                        .setFirstResult(paging.getStartNum()-1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            case "업체추천":
                String crSql = "SELECT c FROM Crecommended c ORDER BY crnum DESC";
                return em.createQuery(crSql, Crecommended.class)
                        .setFirstResult(paging.getStartNum()-1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            case "고민상담":
                String caSql = "SELECT c FROM Canonymous c ORDER BY canum DESC";
                return em.createQuery(caSql, Canonymous.class)
                        .setFirstResult(paging.getStartNum()-1)
                        .setMaxResults(paging.getDisplayRow())
                        .getResultList();
            default:
                return null;
        }
    }
}
