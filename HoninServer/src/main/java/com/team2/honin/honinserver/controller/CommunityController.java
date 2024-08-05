package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.service.CommunityService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@Log4j2
@RequestMapping("/board")
public class CommunityController {

    @Autowired
    CommunityService cs;

    @GetMapping("/getSecondhandList/{snum}")
    public HashMap<String, Object> getSecondhandList(@PathVariable("snum") Integer snum) {
        SecondHand sh = new SecondHand();
        sh.setSnum(snum);
        HashMap<String, Object> result = new HashMap<>();
        result.put("secondhandList", cs.getSecondhandList(snum));
        return result;
    }


}
