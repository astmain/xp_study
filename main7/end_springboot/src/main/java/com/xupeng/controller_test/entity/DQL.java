package com.xupeng.controller_test.entity;

import com.mybatisflex.core.query.QueryWrapper;


public class DQL {
	public static QueryWrapper db = QueryWrapper.create();


	public static QueryWrapper qw() {
		QueryWrapper queryWrapper = QueryWrapper.create();
		return queryWrapper;
	}


}
