package com.xupeng.ctrl_effective.a05_类型安全的异构容器;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ctrl_effective/a05_类型安全的异构容器")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a05_类型安全的异构容器 {
	//  http://127.0.0.1:22222/ctrl_effective/a05_类型安全的异构容器/main1
	@GetMapping("/main1")
	public String main1() {
		//存储不同类型的配置参数
		DbConfig config = new DbConfig();
		config.putConfig("poolSize", 20);// 连接池大小
		config.putConfig("timeout", 3000L);//超时时间
		config.putConfig("dbUrl", "jdbc:mysql://127.0.0.1:3306.mydb");// 数据库URL

		//检索配置参数并进行强制类型转换---不推荐这样封装(强制类型转化,编译时如果写错了不会提示报错,要等到运行时才能发现报错)
		Integer poolSize = (Integer) config.getConfig("poolSize");
		Long timeout = (Long) config.getConfig("timeout");
		String dbUrl = (String) config.getConfig("dbUrl");

		//输出结果
		__.log("poolSize---:", poolSize);
		__.log("timeout---:", timeout);
		__.log("dbUrl---:", dbUrl);
		return "ok";
	}

	//  http://127.0.0.1:22222/ctrl_effective/a05_类型安全的异构容器/main2
	@GetMapping("/main2")
	public String main2() {
		//存储不同类型的配置参数
		DataBaseConfig config = new DataBaseConfig();
		config.putConfig(Integer.class, 20);// 连接池大小
		config.putConfig(Long.class, 3000L);//超时时间
		config.putConfig(String.class, "jdbc:mysql://127.0.0.1:3306.mydb");// 数据库URL

		// 检索配置参数，无需强制类型转换(如果写错了,编译时就提示报错,不用等到运行时才发现报错)
		Integer poolSize = config.getConfig(Integer.class);
		Long timeout = config.getConfig(Long.class);
		String dbUrl = config.getConfig(String.class);

		//输出结果
		__.log("poolSize---:", poolSize);
		__.log("timeout---:", timeout);
		__.log("dbUrl---:", dbUrl);
		return "ok";
	}

	//  http://127.0.0.1:22222/ctrl_effective/a05_类型安全的异构容器/main3
	@GetMapping("/main3")
	public String main3() {
		//存储不同类型的配置参数ConfigKey转化类型
		FinalDataBaseConfig config = new FinalDataBaseConfig();
		config.putConfig(Integer.class, "poolSize", 20);// 连接池大小
		config.putConfig(Long.class, "timeout", 3000L);//超时时间
		config.putConfig(String.class, "dbUrl", "jdbc:mysql://127.0.0.1:3306.mydb");// 数据库URL
		config.putConfig(String.class, "username", "root");// 账号
		config.putConfig(String.class, "password", "123456");// 密码

		// 检索配置参数
		Integer poolSize = config.getConfig(Integer.class, "poolSize");
		Long timeout = config.getConfig(Long.class, "timeout");
		String dbUrl = config.getConfig(String.class, "dbUrl");
		String username = config.getConfig(String.class, "username");
		String password = config.getConfig(String.class, "password");

		//输出结果
		__.log("poolSize---:", poolSize);
		__.log("timeout---:", timeout);
		__.log("dbUrl---:", dbUrl);
		__.log("username---:", username);
		__.log("password---:", password);
		return "ok";
	}


}


