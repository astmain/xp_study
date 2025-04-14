package com.xupeng.myapplication.Tool;

import cn.hutool.json.JSONUtil;

public class json_obj_to_str {
	public static String run(Object obj1) {
		String res = JSONUtil.toJsonStr(obj1);
		return res;
	}
}
