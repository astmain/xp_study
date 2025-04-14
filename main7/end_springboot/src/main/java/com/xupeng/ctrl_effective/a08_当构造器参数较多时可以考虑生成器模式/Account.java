package com.xupeng.ctrl_effective.a08_当构造器参数较多时可以考虑生成器模式;


import com.xupeng.tools.__;

public class Account {
	public String username;
	public String password;
	public String phone;


	public Account(Builder builder) {
		this.username = builder.username;
		this.password = builder.password;
		this.phone = builder.phone;
	}


	public static class Builder {
		private String username;
		private String password;
		private String phone;


		public Builder username(String username) {
			this.username = username;
			return this;
		}

		public Builder password(String password) {
			this.password = password;
			return this;
		}

		public Builder phone(String phone) {
			this.phone = phone;
			return this;
		}

		public String to_str() {
			return __.json_obj_to_str(new Account(this));
		}
		public Account to_obj() {
			return new Account(this);
		}



	}


}
