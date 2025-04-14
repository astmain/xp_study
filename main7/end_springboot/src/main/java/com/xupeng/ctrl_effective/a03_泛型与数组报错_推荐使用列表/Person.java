package com.xupeng.ctrl_effective.a03_泛型与数组报错_推荐使用列表;


class Person {
	private String name;


	public Person(String name) {
		this.name = name;
	}


	public String getName() {
		return name;

	}

	@Override
	public String toString() {
		return name;
	}

}

class Student extends Person {
	public Student(String name) {
		super(name);
	}
}

class Teacher extends Person {
	public Teacher(String name) {
		super(name);
	}
}
