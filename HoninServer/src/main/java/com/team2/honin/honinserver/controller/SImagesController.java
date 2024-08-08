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
    public HashMap<String, Object> uploadImages(@RequestParam("image") MultipartFile[] files) {
        HashMap<String, Object> result = new HashMap<>();
        List<String> savedFileNames = new ArrayList<>();
        List<String> thumbnailFileNames = new ArrayList<>();

        String path = servletContext.getRealPath("/uploads/secondhand");

        for (MultipartFile file : files) {
            String filename = generateUniqueFilename(file.getOriginalFilename());
            String uploadPath = path + "/" + filename;

            try {
                // 원본 파일 저장
                file.transferTo(new File(uploadPath));
                savedFileNames.add(filename);

                // 썸네일 생성 및 저장
                String thumbnailFilename = createThumbnail(uploadPath, filename);
                thumbnailFileNames.add(thumbnailFilename);

            } catch (IOException e) {
                log.error("File upload failed", e);
                result.put("error", "File upload failed: " + e.getMessage());
                return result;
            }
        }

        result.put("savefilename", savedFileNames);
        result.put("thumbnailfilenames", thumbnailFileNames);
        return result;
    }

    private String generateUniqueFilename(String originalFilename) {
        Calendar today = Calendar.getInstance();
        long dt = today.getTimeInMillis();

        String filenameWithoutExtension = originalFilename.substring(0, originalFilename.lastIndexOf("."));
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return filenameWithoutExtension + dt + extension;
    }

    private String createThumbnail(String uploadPath, String filename) throws IOException {
        String path = servletContext.getRealPath("/uploads/secondhand");
        String thumbnailFilename = filename.replace(".", "_thumbnail.");

        Thumbnails.of(uploadPath)
                .size(1920, 1080)
                .toFile(path + "/" + thumbnailFilename);

        return thumbnailFilename;
    }


    @GetMapping("/getImages/{num}")
    public Optional<SImages> getImagesBySecondhandSnum(@PathVariable int num) {
        return sis.findBySnum(num);
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
