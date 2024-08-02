package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.nickname = :nickname")
    Member getWithRoles(@Param("nickname") String nickname);
}
