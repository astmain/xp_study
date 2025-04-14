package com.xupeng.myapplication.Tool;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

public class json_str_to_obj {


	public static JSONObject run(String json_str) {


		JSONObject jsonObject = JSONUtil.parseObj(json_str);
		return jsonObject;
	}
}
