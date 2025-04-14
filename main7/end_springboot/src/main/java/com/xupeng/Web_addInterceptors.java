package com.xupeng;

import com.xupeng.tools.__;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Web_addInterceptors implements WebMvcConfigurer {


	@Override
	public void addCorsMappings(CorsRegistry registry) {
		__.log("开启跨域请求---registry:", registry);
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*").allowCredentials(false);
	}


	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		__.log("开启接口拦截和放行---registry:", registry);
		registry.addInterceptor(new web_preHandle())//
				//拦截接口
				.addPathPatterns("/**")


				//放行接口-登陆,图片验证码
				.excludePathPatterns("/controller_MAIN/login")                    //登陆
				.excludePathPatterns("/controller_MAIN/image_verification_code")  //图片验证码


				//放行接口-graphql调试
				.excludePathPatterns("/graphiql**")//排除graphiql文档
				.excludePathPatterns("/graphql**")//排除graphql接口


				//放行接口-测试
				.excludePathPatterns("/ctrl_effective/**")//
				.excludePathPatterns("/controller_test/**")//
				.excludePathPatterns("/controller/**");//

	}


}