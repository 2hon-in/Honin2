package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    NoticeService ns;

    @GetMapping("/getNcareerList")
    public HashMap<String, Object> getNcareerList(){
        HashMap<String, Object> result = new HashMap<>();
        result.put("ncareerList", ns.getNcareerList());
        return result;
    }

    @GetMapping("/getNpolicyList")
    public HashMap<String, Object> getNpolicyList(){
        HashMap<String, Object> result = new HashMap<>();
        result.put("npolicyList", ns.getNpolicyList());
        return result;
    }

    @GetMapping("/getNcareer/{ncnum}")
    public HashMap<String, Object> getNcareer(@PathVariable("ncnum") int ncnum){
        HashMap<String, Object> result = new HashMap<>();
        result.put("ncareer",ns.getNcareer(ncnum));
        return result;
    }
}
