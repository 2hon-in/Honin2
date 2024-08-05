package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

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
}
