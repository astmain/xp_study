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
@Table(value = "TB_menu", dataSource = "my_datasource_MAIN", camelToUnderline = false)
public class TB_menu {

	@Id(keyType = KeyType.Auto)
	private Long id;
	private String menu;
	private String path;
	private String parent = "";

	@Column(ignore = true)
	private String real_menu;//真实的菜单
	@Column(ignore = true)
	private String real_path;//真实的路径

	@Column(ignore = true)
	private String edit_menu;//编辑的菜单
	@Column(ignore = true)
	private String edit_path;//编辑的路径


	@Column(ignore = true)
	private List<TB_menu> children = new ArrayList<TB_menu>();//菜单树


}