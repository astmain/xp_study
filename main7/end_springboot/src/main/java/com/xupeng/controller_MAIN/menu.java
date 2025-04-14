package com.xupeng.controller_MAIN;


import com.mybatisflex.core.query.QueryWrapper;
import com.xupeng.SQL;
import com.xupeng.controller_MAIN.entity.*;
import com.xupeng.controller_MAIN.mapper.*;
import com.xupeng.tools.R;
import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RequestMapping("/controller_MAIN/menu")
@RestController
@RequiredArgsConstructor
public class menu {
	final DB_user db_user;
	final DB_user_role db_user_role;
	final DB_role db_role;
	final DB_role_menu db_role_menu;
	final DB_menu db_menu;

	/**
	 * @:菜单##########################################################################
	 */
	//查询菜单树
	@GetMapping("/find_menu_tree")
	public String find_menu_tree() {
		//数据库当前用户的所有菜单
		List<TB_menu> menu_list_all = db_menu.selectAll();
		////过滤得到父级菜单
		var menu_list = menu_list_all.stream().filter(menu -> menu.getParent() == null || menu.getParent().isEmpty()).collect(Collectors.toList());
		__.log("第1次父级菜单打印---menu_list:", __.json_obj_to_str(menu_list));
		//构建父子菜单树
		menu_list.forEach(curr_menu -> util_build_menu_tree.make(curr_menu, menu_list_all));
		__.log("第2次父级菜单打印---menu_list:", __.json_obj_to_str(menu_list));
		return R.success("msg", "成功:查询用户列表", "menu_tree", menu_list);
	}


	//查询菜单列表
	@GetMapping("/find_menu_list")
	public String find_menu_list(String menu) {
		//参数
		__.log("参数---menu:", menu);
		//1-查询菜单
		var sql1 = QueryWrapper.create().select().or(TB_menu::getMenu).like(menu).or(TB_menu::getParent).like(menu);
		__.log("sql1---:", sql1.toSQL());
		var menu_list_all = db_menu.selectListByQuery(sql1);

		//设置辅助字段path_original
		menu_list_all.stream().map(o -> {
			o.setReal_menu(o.getMenu());
			o.setReal_path(o.getPath());
			o.setEdit_menu(o.getMenu());
			o.setEdit_path(o.getPath());
			return o;
		}).collect(Collectors.toList());

		////过滤得到父级菜单
		var menu_tree = menu_list_all.stream().filter(o -> o.getParent() == null || o.getParent().isEmpty()).collect(Collectors.toList());
		__.log("第1次父级菜单打印---menu_tree:", __.json_obj_to_str(menu_tree));
		//构建父子菜单树
		menu_tree.forEach(curr_menu -> util_build_menu_tree.make(curr_menu, menu_list_all));
		__.log("第2次父级菜单打印---menu_tree:", __.json_obj_to_str(menu_tree));
		return R.success("msg", "成功:菜单树", "menu_tree", menu_tree);
	}

	//新增父菜单
	@GetMapping("/add_menu_parent")
	public String add_menu_parent(String menu, String path) {
		//参数
		__.log("参数---menu:", menu);
		__.log("参数---path:", path);
		//1-判断是否已经菜单名和路径
		long count1 = db_menu.selectCountByQuery(SQL.q().eq(TB_menu::getMenu, menu));
		long count2 = db_menu.selectCountByQuery(SQL.q().eq(TB_menu::getPath, path));
		if (count1 >= 1) return R.warn("msg", "警告-菜单-已经存在");
		if (count2 >= 1) return R.warn("msg", "警告-路径-已经存在");
		//2-新增父级菜单
		var new_menu = new TB_menu();
		new_menu.setMenu(menu);
		new_menu.setPath(path);
		var row2 = db_menu.insert(new_menu);
		return R.success("msg", "成功:新增父菜单", "row2", row2, "count1", count1, "count2", count2);
	}

	//新增父菜单
	@GetMapping("/add_menu_child")
	public String add_menu_child(String menu, String path, String parent) {
		//参数
		__.log("参数---menu:", menu);
		__.log("参数---path:", path);
		__.log("参数---parent:", parent);
		//1-判断是否已经
		long count1 = db_menu.selectCountByQuery(SQL.q().eq(TB_menu::getMenu, menu));
		long count2 = db_menu.selectCountByQuery(SQL.q().eq(TB_menu::getPath, path));
		if (count1 >= 1) return R.warn("msg", "警告-菜单-已经存在");
		if (count2 >= 1) return R.warn("msg", "警告-路径-已经存在");
		//2-新增子级菜单
		var new_menu = new TB_menu();
		new_menu.setMenu(menu);
		new_menu.setPath(path);
		new_menu.setParent(parent);
		var row2 = db_menu.insert(new_menu);
		return R.success("msg", "成功:新增子菜单", "row2", row2, "count1", count1, "count2", count2);
	}


	//删除菜单
	@GetMapping("/delete_menu")
	public String delete_menu(String menu) {
		//参数
		__.log("参数---menu:", menu);
		//1-删除菜单表
		var sql1 = SQL.q().and(TB_menu::getMenu).eq(menu).or(TB_menu::getParent).eq(menu);
		__.log("sql1---:", sql1.toSQL());
		int row1 = db_menu.deleteByQuery(sql1);
		////2-删除角色菜单表
		var sql2 = SQL.q().and(TB_role_menu::getMenu).eq(menu);
		__.log("sql2---:", sql2.toSQL());
		int row2 = db_role_menu.deleteByQuery(sql2);
		return R.success("msg", "成功:删除菜单", "row1", row1, "row2", row2);
	}

	//保存菜单
	@PostMapping("/save_menu")
	public String save_menu(@RequestBody TB_menu form) {
		//参数
		Long id = form.getId();
		String menu = form.getMenu();
		String path = form.getPath();
		String parent = form.getParent();
		String real_menu = form.getReal_menu();
		String real_path = form.getReal_menu();
		String edit_menu = form.getEdit_menu();
		String edit_path = form.getEdit_path();
		__.log("参数---id:", id);
		__.log("参数---menu:", menu);
		__.log("参数---path:", path);
		__.log("参数---parent:", parent);
		__.log("参数---real_menu:", real_menu);
		__.log("参数---real_path:", real_path);
		__.log("参数---edit_menu:", edit_menu);
		__.log("参数---edit_path:", edit_path);

		//如果父级菜单
		if (parent.isEmpty()) {
			__.log("如果父级菜单---:");
			var sql1 = SQL.q().eq(TB_menu::getMenu, real_menu);
			TB_menu menu_one = db_menu.selectOneByQuery(sql1);
			menu_one.setMenu(edit_menu);
			menu_one.setPath(edit_path);
			int row1 = db_menu.update(menu_one);
			__.log("row1---:", row1);

			var sql2 = SQL.q().eq(TB_menu::getParent, real_menu);
			List<TB_menu> menu_child_list = db_menu.selectListByQuery(sql2);
			for (int i = 0; i < menu_child_list.size(); i++) {
				TB_menu child = menu_child_list.get(i);
				child.setParent(edit_menu);
				int row1_child = db_menu.update(child);
				__.log("row1_child---:", row1_child);
			}
		}
		//如果子级菜单
		else {
			__.log("如果子级菜单---:");
			var sql1 = SQL.q().eq(TB_menu::getMenu, real_menu);
			TB_menu menu_one = db_menu.selectOneByQuery(sql1);
			menu_one.setMenu(edit_menu);
			menu_one.setPath(edit_path);
			int row1 = db_menu.update(menu_one);
			__.log("row1---:", row1);
		}

		//更新角色菜单表
		var sql2 = SQL.q().eq(TB_role_menu::getMenu, real_menu);
		List<TB_role_menu> role_menu_list = db_role_menu.selectListByQuery(sql2);
		for (int i = 0; i < role_menu_list.size(); i++) {
			var role_menu = role_menu_list.get(i);
			role_menu.setMenu(edit_menu);
			int row_role_menu = db_role_menu.update(role_menu);
			__.log("row_role_menu---:", row_role_menu);
		}


		return R.success("msg", "成功:修改菜单");
	}


}
