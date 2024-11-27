//package com.a205.mafya.api.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestPart;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.time.LocalTime;
//import java.time.format.DateTimeFormatter;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/img")
//public class ImgController {
//
//    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> recognizeFace(@RequestPart(value = "file") MultipartFile multipartFile) {
//        LocalTime now = LocalTime.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH시 mm분 ss초");
//        String formatedNow = now.format(formatter);
//        System.out.println("[Face] " + formatedNow + ": " + multipartFile.getContentType() + " " + multipartFile.getOriginalFilename() + " " + multipartFile.getSize());
//
//        int status = 0;
//        //int status = 1;   //얼굴 인식 안 됨
//        String codeName = "0743111";
//
//        Map<String, String> result = new HashMap<>();
//        result.put("status", "" + status);
//        result.put("code_name", codeName);
//
//        return (new ResponseEntity<Map<String, String>>(result, HttpStatus.OK));
//    }
//
//    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
//    public ResponseEntity<?> recognizeMask(@RequestPart(value = "file") MultipartFile multipartFile, String codeName) {
//        LocalTime now = LocalTime.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH시 mm분 ss초");
//        String formatedNow = now.format(formatter);
//        System.out.println("[Mask] " + formatedNow + ": " + multipartFile.getContentType() + " " + multipartFile.getOriginalFilename() + " " + multipartFile.getSize());
//
//        int status = 0;
////        int status = 1; //얼굴 인식 안 됨
//        //int status = 2; //등록된 사용자 아님
//        String name = "기사 김무종";
//
//        Map<String, String> result = new HashMap<>();
//        result.put("status", "" + status);
//        result.put("name", name);
//
//        return (new ResponseEntity<Map<String, String>>(result, HttpStatus.OK));
//    }
//}
