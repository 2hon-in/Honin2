package com.team2.honin.honinserver.dao;


import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.entity.NCareer;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NcareerRepository extends JpaRepository<NCareer, Integer> {

    NCareer findByNcnum(int ncnum);

//    @Query("select nc from NCareer nc order by ") ???
//    List<NCareer> findByPaging(@Param("paging") Paging paging); ??
}
