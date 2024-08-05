package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.service.SecondHandService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SecondHandController {

    @Autowired
    SecondHandService cs;

    @GetMapping("/getSecondhandList")
    public HashMap<String, Object> getSecondhandList() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("secondhandList", cs.getSecondhandList());
        return result;
    }


}
