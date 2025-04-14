package com.xupeng.controller_MAIN;



import com.xupeng.controller_MAIN.entity.TB_menu;

import java.util.List;
import java.util.stream.Collectors;

public class util_build_menu_tree {
	public static void make(TB_menu curr_menu, List<TB_menu> menu_list_all) {
		// 根据当前菜单的名称（menu）查找它的所有子菜单
		List<TB_menu> subMenus = menu_list_all.stream()//
				//过滤menu和parent配置的数据
				.filter(menu -> curr_menu.getMenu().equals(menu.getParent()))//
				//构造新的子菜单新的path
				.map(item -> {
					var newpath = curr_menu.getPath() + item.getPath();
					item.setPath(newpath);
					return item;
				}).collect(Collectors.toList());

		// 将子菜单添加到当前菜单的children列表中
		curr_menu.getChildren().addAll(subMenus);

		// 对每个子菜单继续递归构建子树
		subMenus.forEach(subMenu -> make(subMenu, menu_list_all));
	}
}
