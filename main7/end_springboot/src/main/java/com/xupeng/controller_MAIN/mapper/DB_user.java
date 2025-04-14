package com.xupeng.controller_MAIN.mapper;

import com.mybatisflex.core.BaseMapper;
import com.xupeng.controller_MAIN.entity.TB_menu;
import com.xupeng.controller_MAIN.entity.TB_user;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DB_user extends BaseMapper<TB_user> {


	@Select("""
			select distinct TB_menu.* from
			TB_user_role       TB_user_role,
			TB_role            TB_role,
			TB_role_menu       TB_role_menu,
			TB_menu            TB_menu
			where  #{username}            =   TB_user_role     .username
			and    TB_user_role  .role    =   TB_role          .role
			and    TB_role        .role    =   TB_role_menu     .role
			and    TB_role_menu  .menu    =   TB_menu          .menu
			""")
	List<TB_menu> get_menu_list(String username);

}