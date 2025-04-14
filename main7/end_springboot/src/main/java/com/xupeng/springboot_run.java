package com.xupeng;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@RequiredArgsConstructor
@SpringBootApplication(proxyBeanMethods = false)
@Slf4j
@MapperScan("com.xupeng.*")
public class springboot_run {
	public static void main(String[] args) {
		long startTime = System.currentTimeMillis();
		SpringApplication app = new SpringApplication(springboot_run.class);

		app.run(args);
		var desc_str = """
				项目地址                           path_project
				sqlite数据库地址                   path_sqlite
				官网*********************************************
				spring中文网                       https://springdoc.cn/
				创建项目springboot3                https://start.springboot.io/                          https://start.springboot.io/#!type=maven-project&language=java&platformVersion=3.3.1&packaging=jar&jvmVersion=17&groupId=com.spring3.web&artifactId=APP&name=APP&description=%E6%8F%8F%E8%BF%B0&packageName=com.spring3.web.project&dependencies=web,mysql,devtools,lombok,mybatis
				mybatis-spring-boot快速使用        https://github.com/mybatis/spring-boot-starter/blob/master/mybatis-spring-boot-autoconfigure/src/site/markdown/index.md
								
				帮助文档          knife4j                 http://127.0.0.1:8989/doc.html#/home                  http://127.0.0.8989:9999/swagger-ui.html
				德鲁伊                                    http://127.0.0.1:8989/druid/index.html                aaa/111
								
				课程*********************************************
				springboot3_石添的编程哲学          https://www.bilibili.com/video/BV16H4y1F7wa/?p=4
				遇见狂神课程表                      https://www.kuangstudy.com/course?cid=1							
				楠哥shiro失败                      https://www.bilibili.com/video/BV16C4y187S9/?p=2
				尚硅谷Shiro失败                    https://www.bilibili.com/video/BV11e4y1n7BH?p=6
				稻草daocao进行中                   https://www.bilibili.com/video/BV1zc411B7e1/?p=1



					http://127.0.0.1:9999/main.html
					http://127.0.0.1:9999/manage.html
					http://127.0.0.1:9999/administator.html
					
					
				graphql测试网址111	http://127.0.0.1:11111/graphiql?path=/graphql
					
					
				""".replace("path_project", __.path_project()).replace("path_sqlite", __.path_project() + "/src/main/resources/db_sqlite.db");
		__.log(desc_str);

		long endTime = System.currentTimeMillis();
		System.out.println("应用启动时间：" + (endTime - startTime) + " 毫秒");
	}

}
