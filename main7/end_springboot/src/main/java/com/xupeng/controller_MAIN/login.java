package com.xupeng.controller_MAIN;


import com.mybatisflex.core.query.QueryWrapper;
import com.xupeng.controller_MAIN.entity.TB_menu;
import com.xupeng.controller_MAIN.entity.TB_user;
import com.xupeng.controller_MAIN.mapper.DB_user;
import com.xupeng.tools.R;
import com.xupeng.tools.__;
import com.xupeng.tools.jwt_util;
import com.xupeng.tools.md5;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequestMapping("/controller_MAIN")
@RestController
@RequiredArgsConstructor
public class login {
	@Autowired
	private StringRedisTemplate stringRedisTemplate;
	final DB_user tb_main_user;


	@GetMapping("/login")
	public String login(String username, String password, String img_code) {
		//参数
		__.log("username---:", username);
		__.log("password---:", password);
		__.log("username---:", username);
		__.log("hasKey---:", stringRedisTemplate.hasKey(img_code));
		//判断验证码
		if (stringRedisTemplate.hasKey(img_code) == false) {
			var result = R.fail("msg", "验证码错误");
			__.log("result---:", result);
			return result;
		}

		//密码md5处理	e10adc3949ba59abbe56e057f20f883e
		var password_encode = md5.encode(password);
		__.log("password_encode---:", password_encode);


		//查询用户
		var user = tb_main_user.selectOneByQuery(QueryWrapper.create().eq(TB_user::getUsername, username).eq(TB_user::getPassword, password_encode));
		__.log("user---:", user);
		//判断账号密码错误
		if (Objects.isNull(user)) {
			var result = R.fail("msg", "账号密码错误");
			__.log("result---:", result);
			return result;
		}


		//创建token
		var Atoken = jwt_util.creat_token(user.getUsername(), user.getPassword(), user.getId());
		__.log("Atoken---:", Atoken);


		//数据库当前用户的所有菜单
		List<TB_menu> all_list = tb_main_user.get_menu_list(username);
		__.log("all_list---:", __.json_obj_to_str(all_list));


		////过滤得到父级菜单
		var menu_list = all_list.stream().filter(menu -> menu.getParent() == null || menu.getParent().isEmpty()).collect(Collectors.toList());
		__.log("第1次父级菜单打印---menu_list:", __.json_obj_to_str(menu_list));


		//构建父子菜单树
		menu_list.forEach(curr_menu -> buildSubTree(curr_menu, all_list));
		__.log("第2次父级菜单打印---menu_list:", __.json_obj_to_str(menu_list));

		//返回数据
		return R.success("menu_list", menu_list, "user_info", user, "Atoken", Atoken);

	}

	// 递归构建子树的方法，接收当前菜单节点和完整菜单列表作为参数
	private static void buildSubTree(TB_menu curr_menu, List<TB_menu> all_list) {
		// 根据当前菜单的名称（menu）查找它的所有子菜单
		List<TB_menu> subMenus = all_list.stream()//
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
		subMenus.forEach(subMenu -> buildSubTree(subMenu, all_list));
	}


}
