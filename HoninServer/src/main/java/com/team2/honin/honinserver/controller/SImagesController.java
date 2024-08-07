package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.service.SImagesService;
import jakarta.servlet.ServletContext;
import lombok.extern.log4j.Log4j2;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SImagesController {

    @Autowired
    SImagesService sis;

    @Autowired
    ServletContext servletContext;

//    @PostMapping("/imgup")
//    public HashMap<String, Object> fileUpload(@RequestParam("image") MultipartFile[] files){
//        HashMap<String, Object> result = new HashMap<>();
//
//        String path = servletContext.getRealPath("/uploads");
//
//        for (MultipartFile file : files) {
//            Calendar today = Calendar.getInstance();
//            long dt = today.getTimeInMillis();
//
//            String filename = file.getOriginalFilename();
//            String fn1 = filename.substring(0, filename.indexOf("."));
//            String fn2 = filename.substring(filename.indexOf("."));
//            String saveFilename = fn1 + dt + fn2;
//            String uploadPath = path + "/" + saveFilename;
//
//            try {
//                // Save the original file
//                file.transferTo(new File(uploadPath));
//
//                // Compress/resize the image using Thumbnailator
//                Thumbnails.of(uploadPath)
//                        .size(1920, 1080) // Set the desired size (HD resolution)
//                        .toFile(uploadPath);
//
//                savedFileNames.add(saveFilename);
//            } catch (IllegalStateException | IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        result.put("savefilenames", savedFileNames);
//        return result;
//    }



    @PostMapping("/uploadImage")
    public HashMap<String, Object> uploadImage(@RequestBody SImages simages) {
        HashMap<String, Object> result = new HashMap<>();
        sis.insertImages(simages);
        return result;

    }
}
