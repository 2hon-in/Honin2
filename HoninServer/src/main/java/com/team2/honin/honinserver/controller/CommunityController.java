package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.category.CommunityCategory;
import com.team2.honin.honinserver.service.CommunityService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Log4j2
@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    CommunityService cs;

    @GetMapping("/getPostList/{tableName}")
    public HashMap<String, Object> getPostList(@PathVariable("tableName") String tableName){
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("postList : " + cs.getPostList(tableName));
        result.put("postList", cs.getPostList(tableName));
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
}
