package com.xupeng.ctrl_effective.a06_仿写mybatis;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ctrl_effective/a06_仿写mybatis")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a06_仿写mybatis {

	final B_mapper_db __user = new B_mapper_db<User>();

	//  视频教程 https://www.bilibili.com/video/BV1nEBzYmEQq?p=7
	//  http://127.0.0.1:22222/ctrl_effective/a06_仿写mybatis/main1
	@GetMapping("/main1")
	public String main1() {

		//B_mapper_impl __user = new B_mapper_impl<User>();
		__user.insert(new User(1, "小许"));
		__user.insert(new User(2, "小林"));
		__user.insert(new User(2, "小许2"));

		var user = __user.selectOne("小许");
		var users = __user.selectList("小许");
		__.log("user---:", user);
		__.log("users---:", users);

		return "ok";
	}


}


