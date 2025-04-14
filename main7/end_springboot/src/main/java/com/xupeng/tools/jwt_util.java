package com.xupeng.tools;


import cn.hutool.json.JSONUtil;
import io.jsonwebtoken.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class jwt_util {

	static long time = 1000 * 60 * 60 * 60;
	//static long time = 1000 * 30;
	static String sign = "qwertyuioplkjhgfdsazxcvbnm";


	//生产token
	public static String creat_token(String username, String password, Long id) {
		JwtBuilder builder = Jwts.builder();
		var jwtToken = builder
				//头部
				.setHeaderParam("typ", "JWT").setHeaderParam("alg", "HS256")
				//载荷
				.claim("username", username)//账号
				.claim("password", password)//密码
				.claim("id", id)//密码
				.setSubject("admin_test")
				//过期时间
				.setExpiration(new Date(System.currentTimeMillis() + time))
				//id
				.setId(UUID.randomUUID().toString().replaceAll("-", ""))
				//.setId(UUID.randomUUID().toString())
				//签名
				.signWith(SignatureAlgorithm.HS256, sign)
				//使用点链接
				.compact();
		//__.log("jwtToken                     : ", jwtToken);
		return jwtToken;
	}


	//检查token是否过期
	public static String parse(String token) {
		if (token == null && token == "") {
			return "";
		}

		try {
			var claims = Jwts.parser().setSigningKey(sign).parseClaimsJws(token).getBody();
			__.log("claims                     : ", claims);
			var username = claims.get("username", String.class);
			var password = claims.get("password", String.class);
			var id = claims.get("id", Long.class);
			__.log("username ", username);
			__.log("password ", password);
			__.log("id ", id);


			// 创建一个 Map 来表示数据
			Map<String, Object> userMap = new HashMap<>();
			userMap.put("username", username);
			userMap.put("password", password);
			userMap.put("id", id);

			// 使用 Hutool 的 JSONUtil 将 Map 转换为 JSON 字符串
			var user_json_str = JSONUtil.toJsonStr(userMap);
			System.out.println(user_json_str);

			return user_json_str;//没有过期
		} catch (Exception error) {
			return "";//过期了
		}

	}



	//检查token是否过期
	public static boolean checkToken(String token) {
		if (token == null && token == "") {
			return false;
		}

		try {
			var	claims=	Jwts.parser().setSigningKey(sign).parseClaimsJws(token).getBody();
			return true;//没有过期
		} catch (Exception error) {
			return false;//过期了
		}

	}



}
