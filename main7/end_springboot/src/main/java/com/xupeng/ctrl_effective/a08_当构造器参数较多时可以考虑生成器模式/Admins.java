package com.xupeng.ctrl_effective.a08_当构造器参数较多时可以考虑生成器模式;


public class Admins {
	public  String username;
	public  String password;
	public  String phone;


	public Admins(Builder builder) {
		this.username = builder.username;
		this.password = builder.password;
		this.phone = builder.phone;
	}


	public static class Builder {
		private String username;
		private String password;
		private String phone;

		public Builder(String username) {
			this.username = username;
		}

		public Builder password(String password) {
			this.password = password;
			return this;
		}

		public Builder phone(String phone) {
			this.phone = phone;
			return this;
		}

		public Admins build() {
			return new Admins(this);
		}


	}


}
