package com.xupeng.ctrl_effective.a02_泛型_上界通配符_下界通配符;

import java.util.ArrayList;
import java.util.List;

class Fruit {

}

class Apple extends Fruit {
}


class Orange extends Fruit {

}


class RedApple extends Apple {
}


public class Cover {

	public static void main(String[] args) {
		//使用父类做泛型，直接添加子类
		List<Fruit> fruitist = new ArrayList<Fruit>();
		fruitist.add(new Apple());
		fruitist.add(new Orange());
		fruitist.add(new RedApple());

		//使用父类的其中一个子类
		List<Apple> appleList = new ArrayList<Apple>();
		fruitist.add(new Apple());

		//使用父类的其中一个子类
		List<Orange> orangeList = new ArrayList<Orange>();
		fruitist.add(new Orange());
	}

	//上界通配符只能读取，不能添加，因为无法确认添加的具体的子类类型
	public static void Up_fruitList(List<? extends Fruit> fruitList) {
		//fruitList.add(new Orane()); //编译器报错，上界通配符只能读取，不能添加，因为无法确认添加的具体的子类类型
		//Fruit fruit1 = fruitList.get(0);//读取正常
		//fruitList.add(fruit1);//添加报错
		for (Fruit fruit : fruitList) {
			System.out.println(fruit.getClass().getSimpleName());
		}
	}

	///下界通配符的作用是用来给列表安全的添加元素，可以添加Apple本身，以及Apple的子类
	public static void Down_fruitList(List<? super Apple> fruitList) {
		fruitList.add(new Apple());
		fruitList.add(new RedApple());
		//fruitList.add(new Fruit());
		for (Object fruit : fruitList) {
			System.out.println(fruit.getClass().getSimpleName());
		}
	}

}