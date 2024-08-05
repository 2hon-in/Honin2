package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.service.SecondHandBoardService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping("/sboard")
public class SecondHandBoardController {

    @Autowired
    SecondHandBoardService sbs;
}
