package com.xupeng;


import com.xupeng.tools.R;
import com.xupeng.tools.__;
import com.xupeng.tools.jwt_util;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public class web_preHandle implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//拦截器拦截options请求，导致无法获得自定义的请求头       https://blog.csdn.net/qq_41835813/article/details/113477586
		//为什么post请求前先发一个options 请求？                 https://blog.csdn.net/qq_38261174/article/details/90691058


		if (request.getMethod().equals("OPTIONS")) {
			response.setStatus(HttpServletResponse.SC_OK);
			//System.out.println("\u001B[32m" + "OPTIONS---url9:  " + request.getRequestURI() + "\u001B[0m");
			return true;
		} else {
			if (request.getRequestURI().equals("/favicon.ico")) {
				//__.log("不打印/favicon.ico");
			} else {
				__.log("\033[32m", "网络请求------", request.getMethod(), "------", request.getRequestURI(), "\033[0m");
			}
		}


		String url = request.getServletPath();
		String Atoken = request.getHeader("Atoken");
		//__.log("Atoken                     : ", Atoken);

		//knife4接口文档
		if (url.contains("doc") || url.contains("webjars")) {
			return true;
		}

		//超级token
		if (Atoken != null && Atoken.equals("Atoken123456")) {
			//__.log("成功:Atoken验证                     : ", 1);
			return true;
		}

		//真实token
		if (jwt_util.checkToken(Atoken) == true) {
			//__.log("成功:Atoken验证                     : ", 1);
			return true;
		}


		//__.log("失败:AAAtoken验证                     : ", 2);
		var json = R.fail("msg", "无效Atoken");
		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().println(json);
		return false;
	}
}
