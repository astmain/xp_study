package com.xupeng.controller_test.entity.mapper;

import com.mybatisflex.core.BaseMapper;
import com.xupeng.controller_test.entity.Account;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


public interface AccountMapper extends BaseMapper<Account> {
	@Select("select * from tb_account where id = #{id}")
	Account select_By_Id(@Param("id") Object id);


	@Select("select * from tb_account")
	List<Account> select_list(@Param("id") Object id);
}