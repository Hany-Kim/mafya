package com.a205.mafya.api.request;

import lombok.*;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddUserReq {
    private String name;

    private String userCode;

    private String password;

    private String teamCode;

    private String classCode;

    private String phoneNum;

    private boolean teamLeader;
}
