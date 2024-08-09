//package com.team2.honin.honinserver.entity.view;
//
//import jakarta.persistence.*;
////import jakarta.validation.constraints.NotNull;
////import org.hibernate.annotations.CreationTimestamp;
//import lombok.Getter;
//import org.hibernate.annotations.Immutable;
//import org.hibernate.annotations.View;
//
//@Getter
//@Immutable
//@View(query = "CREATE VIEW Top10Posts AS " +
//        "WITH LikeCounts AS (" +
//        "  SELECT 'cfree' AS board_name, cfree.title AS title, cfree.cfnum AS cfnum, COUNT(cfreelike.cflnum) AS likecount " +
//        "  FROM honin.cfree " +
//        "  LEFT JOIN honin.cfreelike ON honin.cfree.cfnum = honin.cfreelike.cfnum " +
//        "  GROUP BY honin.cfree.cfnum, honin.cfree.title " +
//        "  UNION ALL " +
//        "  SELECT 'canonymous' AS board_name, canonymous.title AS title, canonymous.canum AS canum, COUNT(canonymouslike.calnum) AS likecount " +
//        "  FROM honin.canonymous " +
//        "  LEFT JOIN honin.canonymouslike ON honin.canonymous.canum = honin.canonymouslike.canum " +
//        "  GROUP BY honin.canonymous.canum, honin.canonymous.title " +
//        "  UNION ALL " +
//        "  SELECT 'crecommended' AS board_name, crecommended.title AS title, crecommended.crnum AS crnum, COUNT(crecommendedlike.crlnum) AS likecount " +
//        "  FROM honin.crecommended " +
//        "  LEFT JOIN honin.crecommendedlike ON honin.crecommended.crnum = honin.crecommendedlike.crnum " +
//        "  GROUP BY honin.crecommended.crnum, honin.crecommended.title " +
//        "  UNION ALL " +
//        "  SELECT 'ctip' AS board_name, ctip.title AS title, ctip.ctnum AS ctnum, COUNT(ctiplike.ctlnum) AS likecount " +
//        "  FROM honin.ctip " +
//        "  LEFT JOIN honin.ctiplike ON honin.ctip.ctnum = honin.ctiplike.ctnum " +
//        "  GROUP BY honin.ctip.ctnum, honin.ctip.title" +
//        ")" +
//        "SELECT board_name, title, likecount " +
//        "FROM LikeCounts " +
//        "ORDER BY likecount DESC " +
//        "LIMIT 10")
//@Table(name = "Top10Posts")
//@Entity
//public class Top10Posts {
//    @Id
//    @Column(name = "board_name")
//    private String boardName;
//
//    @Column(name = "title")
//    private String title;
//
//    @Column(name = "likecount")
//    private Long likeCount;
//}
