package com.xupeng.ctrl_effective.a08_当构造器参数较多时可以考虑生成器模式;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/ctrl_effective/a08_当构造器参数较多时可以考虑生成器模式")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a08_当构造器参数较多时可以考虑生成器模式 {


	//  视频教程 https://www.bilibili.com/video/BV1nEBzYmEQq?p=8
	//  http://127.0.0.1:22222/ctrl_effective/a08_当构造器参数较多时可以考虑生成器模式/main1
	@GetMapping("/main1")
	public String main1() {


		//普通的构造器参数很多
		Users user1 = new Users("小许", "123456", "15160315110");
		Users user2 = new Users("小许", "123456");
		Users user3 = new Users("小许");
		__.log("user1---:", __.json_obj_to_str(user1));
		__.log("user2---:", __.json_obj_to_str(user2));
		__.log("user3---:", __.json_obj_to_str(user3));


		//内部类构造基本写法
		var admin1 = new Admins.Builder("小林").build();
		var admin2 = new Admins.Builder("小林").password("654321").build();
		var admin3 = new Admins.Builder("小林").password("654321").phone("15374118110").build();
		__.log("admin1---:", __.json_obj_to_str(admin1));
		__.log("admin2---:", __.json_obj_to_str(admin2));
		__.log("admin3---:", __.json_obj_to_str(admin3));


		//内部类构造优化写法-很好用
		var acc1 = new Account.Builder().username("小林").password("654321").to_str();
		var acc2 = new Account.Builder().username("小林").to_obj();
		__.log("acc1---:", acc1);
		__.log("acc2---:", acc2);
		__.log("acc2---:", __.json_obj_to_str(acc2));


		return "ok";
	}


}


