package com.team2.honin.honinserver.controller;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import com.team2.honin.honinserver.service.SImagesService;
import jakarta.servlet.ServletContext;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@Log4j2
@RequestMapping("/secondhand")
public class SImagesController {

    @Autowired
    private SImagesService sis;

    @Autowired
    private ServletContext servletContext;

    @PostMapping("/uploadImages")
    public HashMap<String, Object> uploadImages(@RequestParam("image") List<MultipartFile> files) {
        HashMap<String, Object> result = new HashMap<>();
        List<String> savedFileNames = new ArrayList<>();

        String path = servletContext.getRealPath("/uploads/secondhand");

        for (MultipartFile file : files) {
            String filename = generateUniqueFilename(file.getOriginalFilename());
            String uploadPath = path + "/" + filename;

            try {
                // 원본 파일 저장
                file.transferTo(new File(uploadPath));
                savedFileNames.add(filename);


            } catch (IOException e) {
                log.error("File upload failed", e);
                result.put("error", "File upload failed: " + e.getMessage());
                return result;
            }
        }

        result.put("savefilename", savedFileNames);
        return result;
    }

    private String generateUniqueFilename(String originalFilename) {
        Calendar today = Calendar.getInstance();
        long dt = today.getTimeInMillis();

        String filenameWithoutExtension = originalFilename.substring(0, originalFilename.lastIndexOf("."));
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return filenameWithoutExtension + dt + extension;
    }


    @GetMapping("/getImages/{num}")
    public List<SImages> getImagesBySecondhand(SecondHand secondHand) {
        return sis.findBySecondhand(secondHand);
    }

    @DeleteMapping("/deleteImage/{num}")
    public HashMap<String, Object> deleteImage(@PathVariable int num) {
        HashMap<String, Object> result = new HashMap<>();

        try {
            Optional<SImages> sImagesOptional = sis.findById(num);
            if (sImagesOptional.isPresent()) {
                sis.deleteImage(num);
                deleteFile(sImagesOptional.get().getSavefilename());
                result.put("status", "success");
            } else {
                result.put("error", "Image not found");
            }
        } catch (Exception e) {
            log.error("Image deletion failed", e);
            result.put("error", "Image deletion failed: " + e.getMessage());
        }

        return result;
    }

    private void deleteFile(String savefilename) {
        String path = servletContext.getRealPath("/uploads/secondhand");
        File file = new File(path + "/" + savefilename);
        if (file.exists() && file.isFile()) {
            file.delete();
        }
    }
}
