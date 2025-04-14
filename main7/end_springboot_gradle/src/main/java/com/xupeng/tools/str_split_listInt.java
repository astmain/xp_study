package com.xupeng.tools;


public class str_split_listInt {
	//将 "1,2,3" 转成 [1,2,3]
	public static int[] run(String str1, String dot_str) {
		//dot_str=",";
		String[] stringArray = str1.split(dot_str);
		int[] intArray = new int[stringArray.length];
		for (int i = 0; i < stringArray.length; i++) {
			intArray[i] = Integer.parseInt(stringArray[i]);
		}
		return intArray;
	}

}
