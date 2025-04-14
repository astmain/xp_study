package com.xupeng.ctrl_effective.a04_未检查警告;


import java.util.ArrayList;
import java.util.List;

public class Example {

	private  List<String> arr; //使用泛型类型


	// 抑制未检查的警告
	// @SuppressWarnings("unchecked")
	public Example() {
		arr = new ArrayList<>();//未使用泛型的初始化
	}

	public void addItem(String item) {
		arr.add(item); //只能添加 String 类型
	}

	public String getItem(int index) {
		return arr.get(index);//返回 String 类型，不需要类型转换
	}


}
