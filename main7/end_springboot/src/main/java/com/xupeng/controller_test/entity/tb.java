package com.xupeng.controller_test.entity;

import com.mybatisflex.core.query.QueryWrapper;


public class tb {
	public static QueryWrapper db = QueryWrapper.create();


	public static QueryWrapper qw() {
		QueryWrapper queryWrapper = QueryWrapper.create();
		return queryWrapper;
	}


}
