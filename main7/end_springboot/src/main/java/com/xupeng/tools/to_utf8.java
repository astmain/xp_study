package com.xupeng.tools;

import java.net.URLDecoder;

/**
 * @~ 类to_utf8
 * @: 2024/7/1__22:59
 */
public class to_utf8 {
	public static String run(String str1) {
		try {

			String str2 = URLDecoder.decode(str1, "UTF-8");
			return str2;
		} catch (Exception error) {
			__.log("error       :", error);
			return "";
		} finally {

		}


	}
}
