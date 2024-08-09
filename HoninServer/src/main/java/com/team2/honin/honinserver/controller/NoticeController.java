package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.dto.Paging;
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

    @GetMapping("/getNcareerList/{page}")
    public HashMap<String, Object> getNcareerList(@PathVariable("page") int page){
        HashMap<String, Object> result = new HashMap<>();
        Paging paging = new Paging();
        paging.setPage( page );
        paging.calPaging();
        result.put("ncareerList", ns.getNcareerList(paging));
        result.put("paging", paging);
        return result;
    }

    @GetMapping("/getNpolicyList/{page}")
    public HashMap<String, Object> getNpolicyList(@PathVariable("page") int page){
        HashMap<String, Object> result = new HashMap<>();
        Paging paging = new Paging();
        paging.setPage( page );
        paging.calPaging();
        result.put("npolicyList", ns.getNpolicyList(paging));
        result.put("paging", paging);
        return result;
    }

    @GetMapping("/getNcareer/{ncnum}")
    public HashMap<String, Object> getNcareer(@PathVariable("ncnum") int ncnum){
        HashMap<String, Object> result = new HashMap<>();
        result.put("ncareer",ns.getNcareer(ncnum));
        return result;
    }

    @GetMapping("/getNpolicy/{npnum}")
    public HashMap<String, Object> getNpolicy(@PathVariable("npnum") int npnum){
        HashMap<String, Object> result = new HashMap<>();
        result.put("npolicy",ns.getNpolicy(npnum));
        return result;
    }

    @GetMapping("/updateReadCount/{ncnum}")
    public void updateReadCount(@PathVariable("ncnum") int ncnum){
        ns.updateReadCount(ncnum);
    }

    @GetMapping("/updateReadCountNP/{npnum}")
    public void updateReadCountNP(@PathVariable("npnum") int npnum){
        ns.updateReadCountNP(npnum);
    }
}
