package com.xupeng.tools;


import java.util.Arrays;
import java.util.List;

public class str_split_listStr {
	//将 "1,2,3" 转成 [1,2,3]
	public static List<String> run(String str1, String dot_str) {
		//dot_str=",";
		String[] stringArray = str1.split(dot_str);
		List<String> list = Arrays.stream(stringArray).toList();
		return list;
	}

}
