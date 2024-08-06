package com.team2.honin.honinserver.controller;

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
    SecondHandService shs;

    @GetMapping("/getSecondhandList")
    public HashMap<String, Object> getSecondhandList() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("secondhandList", shs.getSecondhandList());
        return result;
    }

    @GetMapping("/updateReadCount/{num}")
    public HashMap<String, Object> updateReadCount(@PathVariable ("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        shs.updateReadCount(num);
        return result;
    }

    @GetMapping("/getSecondHand/{num}")
    public HashMap<String, Object> getSecondHand(@PathVariable ("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("secondhand", shs.getSecondhand(num));
        return result;
    }

}
