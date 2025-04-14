package com.xupeng.controller_MAIN;


import com.mybatisflex.core.query.QueryWrapper;

import com.xupeng.SQL;
import com.xupeng.controller_MAIN.entity.TB_role;
import com.xupeng.controller_MAIN.entity.TB_role_menu;
import com.xupeng.controller_MAIN.entity.TB_user;
import com.xupeng.controller_MAIN.entity.TB_user_role;
import com.xupeng.controller_MAIN.mapper.*;
import com.xupeng.tools.R;
import com.xupeng.tools.__;
import com.xupeng.tools.md5;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RequestMapping("/controller_MAIN/user")
@RestController
@RequiredArgsConstructor
public class user {
	final DB_user db_user;
	final DB_user_role db_user_role;
	final DB_role db_role;
	final DB_role_menu db_role_menu;
	final DB_menu db_menu;

	/**
	 * @:用户##########################################################################
	 */
	//查询用户
	@GetMapping("/find_user_list")
	public String find_user_list(String username, String nickname) {
		//参数
		__.log("参数---username---:", username);
		__.log("参数---nickname---:", nickname);
		//1-查询用户表
		var sql1 = QueryWrapper.create().like(TB_user::getUsername, username).like(TB_user::getUsername, nickname);
		var list = db_user.selectListByQuery(sql1);
		__.log("list---:", list);
		for (int i = 0; i < list.size(); i++) {
			var one = list.get(i);
			//2-查询角色表
			List<TB_role> Role_list = db_role.selectAll();
			one.setRole_list(Role_list);
			//3-查询用户角色表
			List<TB_user_role> user_role = db_user_role.selectListByQuery(QueryWrapper.create().eq(TB_user_role::getUsername, one.getUsername()));
			ArrayList<String> user_role_str_arr = new ArrayList<>();
			for (int x = 0; x < user_role.size(); x++) {
				var one222 = user_role.get(x);
				user_role_str_arr.add(one222.getRole());
			}
			one.setChecked_role_list(user_role_str_arr);
		}
		return R.success("msg", "成功:查询用户列表", "userinfo_list", list);
	}

	//添加用户
	@PostMapping("/add_user")
	public String add_user(@RequestBody TB_user user) {
		__.log("参数---:user", user);
		//添加用户_设置密码
		user.setPassword(md5.encode("123456"));
		int row1 = db_user.insertOrUpdate(user);

		//添加用户的角色
		int row2s = 0;
		for (var role_str : user.getChecked_role_list()) {
			var new_user_role = new TB_user_role();
			new_user_role.setRole(role_str);
			new_user_role.setUsername(user.getUsername());
			int row2 = db_user_role.insertOrUpdate(new_user_role);
			row2s = row2s + row2;
		}
		return R.success("msg", "成功:新增用户", "row1", row1, "row2s", row2s);
	}

	//删除用户
	@GetMapping("/delete_user")
	public String delete_user(String username) {
		__.log("参数---username:", username);
		////删除用户表
		var sql1 = SQL.q().where(TB_user::getUsername).eq(username);
		int row1 = db_user.deleteByQuery(sql1);
		__.log("row1---:", row1);
		////删除用户角色表
		var sql2 = SQL.q().where(TB_user_role::getUsername).eq(username);
		var row2 = db_user_role.deleteByQuery(sql2);
		__.log("row2---:", row2);
		return R.success("msg", "成功:删除用户", "row1", row1, "row2", row2);
	}

	//保存用户
	@PostMapping("/save_user")
	public String save_user(@RequestBody TB_user user) {
		//1-更新用户表
		int row1 = db_user.update(user);
		//2-先删除用户角色表
		var sql2 = SQL.q().where(TB_user_role::getUsername).eq(user.getUsername());
		var row2 = db_user_role.deleteByQuery(sql2);
		//3-然后新增新的用户角色
		var row3s = 0;
		for (int i = 0; i < user.getChecked_role_list().size(); i++) {
			String role_str = user.getChecked_role_list().get(i);
			var user_role = new TB_user_role();
			user_role.setUsername(user.getUsername());
			user_role.setRole(role_str);
			var row3 = db_user_role.insert(user_role);
			row3s += row3;
		}
		return R.success("msg", "成功:保存数据", "row1", row1, "row2", row2, "row3s", row3s);

	}

	/**
	 * @:角色##########################################################################
	 */
	//查询角色返回数组字符
	@GetMapping("/find_role_list_str")
	public String find_role_list_str() {
		__.log("参数---空:", "");
		//1-查询角色
		List<TB_role> roles = db_role.selectAll();
		return R.success("msg", "成功:查询用户列表", "role_list", roles);
	}

	//查询角色
	@GetMapping("/find_role_list")
	public String find_role_list(String role) {
		__.log("参数---role:", role);
		//1-查找角色表
		var sql1 = SQL.q().like(TB_role::getRole, role);
		var role_list = db_role.selectListByQuery(sql1);
		//2-遍历角色菜单树
		for (int i = 0; i < role_list.size(); i++) {
			var role_one = role_list.get(i);
			var role_name = role_one.getRole();
			__.log("role_name---:", role_name);
			var sql2 = QueryWrapper.create().eq(TB_role_menu::getRole, role_name);
			var menu_list = db_role_menu.selectListByQuery(sql2);
			__.log("menu_list---:", __.json_obj_to_str(menu_list));
			var checked_menu_list = menu_list.stream().map(TB_role_menu::getMenu).collect(Collectors.toCollection(ArrayList::new));
			role_one.setChecked_menu_list(checked_menu_list);
		}
		return R.success("msg", "成功:查询角色表", "role_list", role_list);
	}


	//保存角色
	@GetMapping("/update_role")
	public String save_role(@RequestBody TB_role role) {
		__.log("参数---role:", role);
		//1-更新_角色表
		var row1 = db_role.update(role);
		//2-先删除角色菜单表
		var sql2 = SQL.q().where(TB_role_menu::getRole).eq(role.getRole());
		var row2 = db_role_menu.deleteByQuery(sql2);
		//3-然后新增角色菜单表
		var row3s = 0;
		for (var menu : role.getChecked_menu_list()) {
			var new_role_menu = new TB_role_menu();
			new_role_menu.setRole(role.getRole());
			new_role_menu.setMenu(menu);
			var row3 = db_role_menu.insert(new_role_menu);
			row3s += row3;
		}
		return R.success("msg", "成功:添加角色", "row1", row1, "row2", row2, "row3s", row3s);
	}


	//添加角色
	@PostMapping("/add_role")
	public String add_role(@RequestBody TB_role role) {
		__.log("参数---role:", role);
		//1-判断是否已经存在角色
		var sql1 = SQL.q().eq(TB_role::getRole, role.getRole());
		long count = db_role.selectCountByQuery(sql1);
		if (count >= 1) return R.warn("msg", "警告-添加[角色]-已经存在");
		//2-新增_角色表
		var new_role = new TB_role();
		new_role.setRole(role.getRole());
		var row1 = db_role.insert(new_role);
		//3-新增_角色菜单表
		var row2s = 0;
		for (var menu : role.getChecked_menu_list()) {
			var new_role_menu = new TB_role_menu();
			new_role_menu.setRole(role.getRole());
			new_role_menu.setMenu(menu);
			var row2 = db_role_menu.insert(new_role_menu);
			row2s += row2;
		}
		return R.success("msg", "成功:添加角色", "row1", row1, "row2s", row2s);
	}

	//删除角色
	@GetMapping("/delete_role")
	public String delete_role(String role) {
		__.log("参数---role:", role);
		//1-删除角色表
		var sql1 = SQL.q().where(TB_role::getRole).eq(role);
		int row1 = db_role.deleteByQuery(sql1);
		//2-删除角色菜单表
		var sql2 = SQL.q().where(TB_role_menu::getRole).eq(role);
		var row2 = db_role_menu.deleteByQuery(sql2);
		return R.success("msg", "成功:删除_角色表_角色关联菜单表", "row1", row1, "row2", row2);
	}





}
