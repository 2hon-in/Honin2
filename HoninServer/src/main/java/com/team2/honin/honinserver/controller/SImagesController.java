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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SImagesController {

    @Autowired
    SImagesService sis;

    @Autowired
    ServletContext servletContext;

    @PostMapping("/uploadImages")
    public HashMap<String, Object> fileUpload(@RequestParam("image") String image, MultipartFile[] files) {
        HashMap<String, Object> result = new HashMap<>();
        List<String> savedFileNames = new ArrayList<>();
        List<String> thumbnailFileNames = new ArrayList<>();

        String path = servletContext.getRealPath("/uploads");

        for (MultipartFile file : files) {
            Calendar today = Calendar.getInstance();
            long dt = today.getTimeInMillis();

            String filename = file.getOriginalFilename();
            String fn1 = filename.substring(0, filename.indexOf("."));
            String fn2 = filename.substring(filename.indexOf("."));
            String saveFilename = fn1 + dt + fn2;
            String uploadPath = path + "/" + saveFilename;

            try {
                // 원본 파일 저장
                file.transferTo(new File(uploadPath));
                savedFileNames.add(saveFilename);

                // 썸네일 생성 및 저장
                String thumbnailFilename = fn1 + dt + "_thumbnail" + fn2;
                String thumbnailPath = path + "/" + thumbnailFilename;
                Thumbnails.of(uploadPath)
                        .size(1920, 1080) // 원하는 썸네일 크기 지정
                        .toFile(thumbnailPath);

                thumbnailFileNames.add(thumbnailFilename);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
                result.put("error", "File upload failed: " + e.getMessage());
                return result;
            }
        }

        result.put("savefilename", savedFileNames);
        result.put("thumbnailfilenames", thumbnailFileNames);
        return result;
    }

    @PostMapping("/insertImages")
    public HashMap<String, Object> insertImages(@RequestBody SImages sImages){
        HashMap<String, Object> result = new HashMap<>();
        sis.insertImages(sImages);
        return result;
    }


}
