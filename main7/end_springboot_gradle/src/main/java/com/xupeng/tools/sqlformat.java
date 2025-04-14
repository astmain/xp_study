package com.xupeng.tools;

public class sqlformat {
	public static String run(String sql_str) {

		String str = cn.hutool.db.sql.SqlFormatter.format(sql_str);

		return str;
	}


}
