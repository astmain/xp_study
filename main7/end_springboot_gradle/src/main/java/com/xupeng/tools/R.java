package com.xupeng.tools;


import cn.hutool.json.JSONObject;

public class R {


	public static String success(Object... keyValues) {
		JSONObject res = new JSONObject();
		res.set("code", 200);
		res.set("msg", "操作成功");
		for (int i = 0; i < keyValues.length; i += 2) {
			res.set((String) keyValues[i], keyValues[i + 1]);
		}
		var result = res.toString();
		__.log("result---:", result);
		return result;
	}


	public static String warn(Object... keyValues) {
		JSONObject result = new JSONObject();
		result.set("code", 201);
		result.set("msg", "操作失败");
		for (int i = 0; i < keyValues.length; i += 2) {
			result.set((String) keyValues[i], keyValues[i + 1]);
		}
		return result.toString();
	}

	public static String error(Object... keyValues) {
		JSONObject result = new JSONObject();
		result.set("code", 400);
		result.set("msg", "操作失败");
		for (int i = 0; i < keyValues.length; i += 2) {
			result.set((String) keyValues[i], keyValues[i + 1]);
		}
		return result.toString();
	}


	public static String fail(Object... keyValues) {
		JSONObject result = new JSONObject();
		result.set("code", 400);
		result.set("msg", "系统运行时异常111");
		for (int i = 0; i < keyValues.length; i += 2) {
			result.set((String) keyValues[i], keyValues[i + 1]);
		}
		return result.toString();
	}


}
