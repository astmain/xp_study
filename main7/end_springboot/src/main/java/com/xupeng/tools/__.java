package com.xupeng.tools;


import cn.hutool.json.JSONObject;

import java.util.List;

public class __ {
	//打印

	public static String log(Object... args) {
		return log.run(args);
	}
	public static String log_error(Object... args) {
		return log_error.run(args);
	}

	public static String path_project() {
		return path_project.run();
	}

	//sql格式
	public static String sqlformat(String sql_str) {
		return sqlformat.run(sql_str);
	}

	//__类型__[String]
	public static String type(Object... args) {
		return type.run(args);
	}


	//__类型__[String]
	public static int random(int min, int max) {
		return random.run(min, max);
	}

	//to_utf8
	public static String to_utf8(String str1) {
		return to_utf8.run(str1);
	}

	//to_utf8
	public static String json_obj_to_str(Object obj1) {
		return json_obj_to_str.run(obj1);
	}

	//to_utf8
	public static JSONObject json_str_to_obj(String str1) {
		return json_str_to_obj.run(str1);
	}

	//uuid
	public static String uuid() {
		return uuid.run();
	}

	//描述1
	public static void desc(Object... args) {
		desc.run(args);
	}

	//描述1
	public static void DESCP(Object... args) {
		desc.run(args);
	}

	//错误信息字符
	public static String error_stack_to_str(Throwable error) {
		return error_stack_to_str.get(error);
	}

	////错误信息字符
	//public static class fs {
	//	static String read(String my_path) {
	//		return fs.read(my_path);
	//	}
	//}


	public static String fs_read(String my_path) {
		return fs.read(my_path);
	}

	public static String fs_write(String my_path, String my_text) {
		return fs.write(my_path, my_text);
	}

	public static String fs_write_add(String my_path, String my_text) {
		return fs.write_add(my_path, my_text);
	}

	public static String fs_copy_file(String path_in, String path_out) {
		return fs.copy_file(path_in, path_out);
	}

	public static int[] str_split_listInt(String str1, String dot_str) {
		return str_split_listInt.run(str1, dot_str);
	}

	public static List<String> split_str_listStr(String str1, String dot_str) {
		return str_split_listStr.run(str1, dot_str);
	}

}
