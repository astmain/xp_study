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
@Table(value = "TB_user", dataSource = "my_datasource_MAIN", camelToUnderline = false)
public class TB_user {

	@Id(keyType = KeyType.Auto)
	private Long id;
	private String username;
	private String nickname;
	private String password;
	private String avatar = "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";


	@Column(ignore = true)
	List<TB_role> role_list;
	@Column(ignore = true)
	private ArrayList<String> checked_role_list = new ArrayList<>();


}