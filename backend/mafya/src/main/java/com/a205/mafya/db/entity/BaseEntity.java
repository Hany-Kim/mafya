package com.a205.mafya.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@EntityListeners(value = AuditingEntityListener.class)	//Entity가  DB로 Load, Persist 되기 전 후에 커스텀 로직을 선언하는 인터페이스
//AuditingEntityListener는 Spring에서 제공하는 구현클래스로 createdDate LastModifiedDate 같은 어노테이션을 탐색해 엔티티 변경 시 해당 값을 자동으로 업데이트
@MappedSuperclass    //이 클래스가 SuperClass라는걸 알리는 마커 어노테이션
@EqualsAndHashCode(callSuper=false)
@Data
public class BaseEntity {
    @ApiModelProperty(value = "신경 x")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ApiModelProperty(value = "신경 x")
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ApiModelProperty(value = "신경 x")
    @LastModifiedDate
    private LocalDateTime updatedAt;

}