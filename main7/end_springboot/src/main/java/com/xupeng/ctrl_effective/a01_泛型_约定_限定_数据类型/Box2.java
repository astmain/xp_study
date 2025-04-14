package com.xupeng.ctrl_effective.a01_泛型_约定_限定_数据类型;

import java.util.ArrayList;
import java.util.List;

public class Box2<T> {
	private List<T> items; //使用泛型类型  T E KV

	public Box2() {
		//
		items = new ArrayList<>();
	}

	public void addItem(T item) {
		//
		items.add(item);// 可以添加任何类型的对象
	}

	public void printItems() {
		for (T item : items) {
			//需要进行类型转换
			System.out.println(item);
			//try {
			//	String item = (String) obj;
			//	System.out.println(item);
			//} catch (Exception error) {
			//	System.out.println("error:" + error.getMessage());
			//}
		}

	}

	public static void main(String[] args) {
		Box2 box = new Box2();
		box.addItem("小许");
		box.addItem(123);//编译时不会报错，但会导致运行时错误
		box.printItems();//运行时可能会抛出 ClassCastException
	}


}