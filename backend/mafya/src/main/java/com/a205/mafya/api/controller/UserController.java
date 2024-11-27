package com.a205.mafya.api.controller;

import com.a205.mafya.api.request.AddUserReq;
import com.a205.mafya.api.response.BasicResponse;
import com.a205.mafya.api.response.UserInfo;
import com.a205.mafya.api.response.UserListRes;
import com.a205.mafya.api.response.UserOneRes;
import com.a205.mafya.api.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/student")
public class UserController {

    @Autowired
    UserService userService;


    // 학생 추가, 이미지는 아직
    @PostMapping("")
    public ResponseEntity<?> AddStudent(@RequestBody AddUserReq userReq) throws Exception{

        userService.addUser(userReq);

        BasicResponse BR = BasicResponse.builder()
                .msg("SUCCESS")
                // 0 : 요청한 사용자 있음
                .resultCode(0)
                .build();
        return new ResponseEntity<>(BR, HttpStatus.OK);
    }

    // 학생 정보 지우기
    @DeleteMapping ("{id}")
    public ResponseEntity<?> DeleteStudent(@PathVariable int id) throws Exception{

        userService.deleteUser(id);

        BasicResponse BR = BasicResponse.builder()
                .msg("SUCCESS")
                // 0 : 요청한 사용자 있음
                .resultCode(0)
                .build();
        return new ResponseEntity<>(BR, HttpStatus.OK);
    }

    // 학생 정보 불러오기
    @GetMapping ("{id}")
    public ResponseEntity<?> GetStudentInfo(@PathVariable int id) throws Exception{

        UserOneRes UOR = (UserOneRes) UserOneRes.builder()
                .userInfo(userService.findUser(id))
                .msg("SUCCESS")
                .resultCode(0)
                .build();

        return new ResponseEntity<>(UOR, HttpStatus.OK);
    }

    // 학생 리스트 불러오기
    @GetMapping ("")
    public ResponseEntity<?> GetStudentList() throws Exception{

        UserListRes ULR = (UserListRes) UserListRes.builder()
                .userList(userService.findUserAll())
                .msg("SUCCESS")
                .resultCode(0)
                .build();

        return new ResponseEntity<>(ULR, HttpStatus.OK);
    }

    // 학번 중복 검사
    @GetMapping ("checkId/{userCode}")
    public ResponseEntity<?> UserCodeOverLapCheck(@PathVariable String userCode) throws Exception{
        userService.checkUserCodeOverlap(userCode);

        BasicResponse BR = BasicResponse.builder()
                .msg("SUCCESS")
                .resultCode(0)
                .build();

        return new ResponseEntity<>(BR, HttpStatus.OK);
    }

}
