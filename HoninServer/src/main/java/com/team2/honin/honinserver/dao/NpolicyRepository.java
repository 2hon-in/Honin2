package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.NPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NpolicyRepository extends JpaRepository<NPolicy, Integer> {
    NPolicy findByNpnum(int npnum);
}
