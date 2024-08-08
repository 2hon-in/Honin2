package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.entity.view.SecondhandImagesSelectView;
import com.team2.honin.honinserver.service.SImagesService;
import com.team2.honin.honinserver.service.SecondHandService;
import com.team2.honin.honinserver.service.viewService.SecondhandImagesSelectViewService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SecondHandController {

    @Autowired
    SecondHandService shs;

    @Autowired
    SImagesService sis;

    @Autowired
    SecondhandImagesSelectViewService sivs;

    @GetMapping("/getSecondhandList")
    public HashMap<String, Object> getSecondhandList() {
        HashMap<String, Object> result = new HashMap<>();
        List<SecondhandImagesSelectView> shivList = sivs.getSecondhandList();
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
        SecondhandImagesSelectView shiv = sivs.getSecondhand(num);
        result.put("secondhand", shiv);
        return result;
    }

    @PostMapping("/updateSecondhand")
    public HashMap<String, Object> updateSecondhand(
            @RequestBody SecondhandImagesSelectView shiv,
            SecondHand SecondHand,
            SImages SImages) {
        HashMap<String, Object> result = new HashMap<>();

        SecondHand secondHand = shs.updateSecondhand(SecondHand, shiv.getSnum());
        SImages sImages = sis.updateSecondhand(SImages, shiv.getSnum());

        result.put("msg", "ok");
        result.put("secondHand", secondHand);
        result.put("sImages", sImages);

        return result;
    }


    @PostMapping("/insertSecondhand")
    public HashMap<String, Object> insertSecondhand(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("price") int price,
            @RequestParam("seller") String seller,
            @RequestParam("savefilename") List<String> savefilename) {

        HashMap<String, Object> result = new HashMap<>();

        // 게시물 객체 생성
        SecondHand secondHand = new SecondHand();
        secondHand.setTitle(title);
        secondHand.setContent(content);
        secondHand.setPrice(price);
        secondHand.setSeller(seller);

        // 게시물과 이미지 저장
        shs.insertSecondHand(secondHand, savefilename);

        result.put("msg", "ok");
        return result;
    }


}

