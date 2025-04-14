package com.xupeng.ctrl_effective.a08_当构造器参数较多时可以考虑生成器模式;


public class Users {
	private final String username;
	private final String password;
	private final String phone;


	public Users(String username, String password, String phone) {
		this.username = username;
		this.password = password;
		this.phone = phone;
	}

	public Users(String username, String password) {
		this(username, password, "");

	}

	public Users(String username) {
		this(username, "", "");
	}


}
