package com.xupeng.controller;

import com.xupeng.tools.R;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/controller")
@RequiredArgsConstructor
public class index {
	//  http://127.0.0.1:11111/controller/get?id=1&username=xupeng&password=123456
	@GetMapping("/get")
	public String get(Long id, String username, String password) {
		var user = new DataUser();
		user.setId(id);
		user.setUsername(username);
		user.setPassword(password);
		return R.success("msg", "get请求", "user", user);
	}

	//  http://127.0.0.1:33333/controller/get2?id=1&username=xupeng&password=123456
	@GetMapping("/get2")
	public String get2(Long id, String username, String password) {
		new aaa().log2.accept("111");
		return R.success("msg", "get请求", "user", 111);
	}




	/*
      let config = {
        method: 'post',
        url: 'http://127.0.0.1:8989/controller/post',
        data: { id: 111, username: '许鹏', password: '123456' },
        headers: { 'Content-Type': 'application/json' }, //java项目中必须这么写
      }
      let res = await axios_api(config)
      console.log('res.data---', res.data)
	*/
	//@PostMapping("/post")
	//public String post(@RequestBody SYS_admin user) {
	//	var result = R.success("msg", "成功:Post请求", "user", user);
	//	__.log("result---:", result);
	//	return result;
	//}


	@Data
	@NoArgsConstructor//能确保类具备这样的构造函数，避免出现找不到合适构造函数的错误。
	@AllArgsConstructor//  DataUser user = new DataUser(1L, "李四", "1234567");
	public static class DataUser {
		private Long id;
		private String username = "";
		private String password = "";
	}
}
