package com.xupeng.controller_MAIN.entity;

import com.mybatisflex.annotation.Column;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(value = "TB_role_menu", dataSource = "my_datasource_MAIN", camelToUnderline = false)
public class TB_role_menu {

	@Id(keyType = KeyType.Auto)
	private Long id;
	private String menu;
	private String role;




}