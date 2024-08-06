package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.service.SImageService;
import com.team2.honin.honinserver.service.SecondHandService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SecondHandController {

    @Autowired
    SecondHandService shs;

    @Autowired
    SImageService sis;

    @GetMapping("/getSecondhandList")
    public HashMap<String, Object> getSecondhandList() {
        HashMap<String, Object> result = new HashMap<>();
        List<SecondHand> shList = shs.getSecondhandList();
//        result.put("shList", shList);
//        List<SImages> sImagesList = sis.getSImagesList();
//        result.put("sImagesList", sImagesList);
        result.put("secondhandList", shList);

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
