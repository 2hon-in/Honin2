package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.view.ShimageSelectView;
import com.team2.honin.honinserver.service.SImageService;
import com.team2.honin.honinserver.service.SecondHandService;
import com.team2.honin.honinserver.service.viewService.ShimageSelectViewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SecondHandController {

    @Autowired
    SecondHandService shs;

    @Autowired
    SImageService sis;

    @Autowired
    ShimageSelectViewService sivs;

    @GetMapping("/getSecondhandList")
    public HashMap<String, Object> getSecondhandList() {
        HashMap<String, Object> result = new HashMap<>();
        List<ShimageSelectView> shivList = sivs.getSecondhandList();
        result.put("secondhandList", shivList);

        return result;
    }

    @GetMapping("/updateReadCount/{num}")
    public HashMap<String, Object> updateReadCount(@PathVariable ("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        sivs.updateReadCount(num);
        return result;
    }

    @GetMapping("/getSecondHand/{num}")
    public HashMap<String, Object> getSecondHand(@PathVariable ("num") int num) {
        HashMap<String, Object> result = new HashMap<>();
        ShimageSelectView shiv = sivs.getSecondhand(num);
        result.put("secondhand", shiv);
        return result;
    }


}
