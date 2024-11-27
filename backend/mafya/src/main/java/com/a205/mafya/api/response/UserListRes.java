package com.a205.mafya.api.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserListRes extends BasicResponse{

    private List<UserInfo> userList;
}
