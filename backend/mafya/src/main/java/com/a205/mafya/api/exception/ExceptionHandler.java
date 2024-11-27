package com.a205.mafya.api.exception;

import com.a205.mafya.api.response.BasicResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.NoSuchElementException;


@ControllerAdvice
@Slf4j
public class ExceptionHandler {

    // 이미 존재하는 userCode로 학생추가할때
    @org.springframework.web.bind.annotation.ExceptionHandler(UserCodeOverlapException.class)
    public ResponseEntity<BasicResponse> UserCodeOverlapException(UserCodeOverlapException e) {
        log.error("UserCodeOverlapException", e);
        log.error(e.getMessage());
        log.error(e.getLocalizedMessage());

        BasicResponse er = BasicResponse.builder()
                .msg(e.getLocalizedMessage())
                // 1 : 중복 학번 있음
                .resultCode(1)
                .build();

        return new ResponseEntity<>(er, HttpStatus.OK);
    }

    // 존재하지 않는 id에 접근할때
    @org.springframework.web.bind.annotation.ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<BasicResponse> NoSuchElementException(NoSuchElementException e) {
        log.error("NoSuchElementException", e);
        log.error(e.getMessage());
        log.error(e.getLocalizedMessage());

        BasicResponse er = BasicResponse.builder()
                .msg(e.getLocalizedMessage())
                // 1 : 요청한 사용자 없음
                .resultCode(1)
                .build();

        return new ResponseEntity<>(er, HttpStatus.OK);
    }

}
