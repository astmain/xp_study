package com.xupeng;


import com.mybatisflex.core.query.QueryWrapper;

public class SQL {


	public static QueryWrapper __ = QueryWrapper.create();


	public SQL() {


	}

	public static QueryWrapper q() {
		QueryWrapper queryWrapper = QueryWrapper.create();
		return queryWrapper;
	}


}
