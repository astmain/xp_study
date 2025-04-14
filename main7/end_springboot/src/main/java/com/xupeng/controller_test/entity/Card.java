package com.xupeng.controller_test.entity;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import com.xupeng.controller_test.entity.listener.CardListener;
import lombok.Data;

import java.time.LocalDateTime;

@Data

@Table(value = "tb_card", dataSource = "my_datasource_test2", camelToUnderline = false, onInsert = {CardListener.class}, onUpdate = {CardListener.class})
//camelToUnderline = false   名称统一和数据一直,关闭字段转下划线

public class Card {
	@Id(keyType = KeyType.Auto)
	private Long id;
	private String id_number;
	private String location;
	private String email;
	private String card_name;
	private LocalDateTime createTime;
	private LocalDateTime updateTime;
}