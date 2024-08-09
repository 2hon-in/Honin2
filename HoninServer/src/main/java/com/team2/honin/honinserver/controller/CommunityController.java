package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.Paging;
import com.team2.honin.honinserver.dto.Post;
import com.team2.honin.honinserver.entity.Cfree;
import com.team2.honin.honinserver.entity.category.CommunityCategory;
import com.team2.honin.honinserver.service.CommunityService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

@Log4j2
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    CommunityService cs;

    @GetMapping("/getPostList/{page}/{tableName}")
    public HashMap<String, Object> getPostList(@PathVariable("page") int page, @PathVariable("tableName") String tableName){
        HashMap<String, Object> result = new HashMap<>();
        Paging paging = new Paging();
        paging.setPage( page );
        paging.setDisplayRow(6);
        paging.calPaging();
        result.put("postList", cs.getPostList(paging, tableName));
        result.put("paging", paging);
        return result;
    }

    @GetMapping("/getPostOne/{seq}/{seqNum}")
    public HashMap<String, Object> getPostOne(@PathVariable("seq") String seq, @PathVariable("seqNum") Integer seqNum){
        HashMap<String, Object> result = new HashMap<>();
        result.put("post", cs.getPostOne(seq, seqNum));
        return result;
    }

    @PostMapping("/updateReadCount/{seq}/{seqNum}")
    public void updateReadCount(@PathVariable("seq") String seq, @PathVariable("seqNum") Integer seqNum){
        cs.updateReadCount(seq, seqNum);
    }

    @GetMapping("/getCommunityCategoryList")
    public HashMap<String, Object> getCommunityCategoryList(){
        HashMap<String, Object> result = new HashMap<>();
        result.put("categoryList", CommunityCategory.values());
        return result;
    }

    @PostMapping("/writePost")
    public HashMap<String, Object> writePost(@RequestBody Post post){
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("post : " + post);
        result.put("num", cs.writePost(post));
        result.put("msg", "success");
        return result;
    }


    /* DB 초기화를 위한 메서드 */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String INIT_FILE_PATH = "src/main/resources/database/init.sql";
    private static final String VIEW_FILE_PATH = "src/main/resources/database/view.sql";

    @PostMapping("/initDb")
    public HashMap<String, Object> initDb() throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 파일을 읽어와서 각 쿼리문을 실행합니다.
            String sql = Files.readString(Path.of(INIT_FILE_PATH));
            String[] sqlStatements = sql.split(";");  // 쿼리문들을 세미콜론으로 분리

            for (String statement : sqlStatements) {
                if (!statement.trim().isEmpty()) {
                    jdbcTemplate.execute(statement);
                }
            }
            result.put("msg", "success");
            return result;
        } catch (Exception e) {
            throw new Exception("SQL 파일 실행 중 오류 발생: " + e.getMessage(), e);
        }
    }
    @PostMapping("/createView")
    public HashMap<String, Object> createView() throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        try {
            // 파일을 읽어와서 각 쿼리문을 실행합니다.
            String sql = Files.readString(Path.of(VIEW_FILE_PATH));
            String[] sqlStatements = sql.split(";");  // 쿼리문들을 세미콜론으로 분리

            for (String statement : sqlStatements) {
                if (!statement.trim().isEmpty()) {
                    jdbcTemplate.execute(statement);
                }
            }
            result.put("msg", "success");
            return result;
        } catch (Exception e) {
            throw new Exception("SQL 파일 실행 중 오류 발생: " + e.getMessage(), e);
        }
    }
}
