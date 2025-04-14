package com.xupeng.controller_MAIN.entity;

import com.mybatisflex.annotation.Column;
import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(value = "TB_role", dataSource = "my_datasource_MAIN", camelToUnderline = false)
public class TB_role {

	@Id(keyType = KeyType.Auto)
	private Long id;
	private String role;

	@Column(ignore = true)
	private ArrayList<String> checked_menu_list = new ArrayList<>();
}