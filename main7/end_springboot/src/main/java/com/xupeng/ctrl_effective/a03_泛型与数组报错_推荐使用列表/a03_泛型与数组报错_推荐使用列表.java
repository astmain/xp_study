package com.xupeng.ctrl_effective.a03_泛型与数组报错_推荐使用列表;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ctrl_effective/a03_泛型与数组报错_推荐使用列表")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a03_泛型与数组报错_推荐使用列表 {
	//  http://127.0.0.1:22222/ctrl_effective/a03_泛型与数组报错_推荐使用列表/main1
	@GetMapping("/main1")
	public String main1() {
		Student[] students = {new Student("a小许"), new Student("c小林"), new Student("b小陈")};
		Teacher[] teachers = {new Teacher("z许老师"), new Teacher("y林老师"), new Teacher("x陈老师")};
		//排序Person的子类
		sort_Person_child(students);
		sort_Person_child(teachers);
		__.desc("1:students打印排序结果====================================================");
		for (var ele : students) {
			__.log("student    :", ele);
		}
		__.desc("2:teachers打印排序结果====================================================");
		for (var ele : teachers) {
			__.log("teacher    :", ele);
		}

		return "ok";
	}


	//  http://127.0.0.1:22222/ctrl_effective/a03_泛型与数组报错_推荐使用列表/main2
	@GetMapping("/main2")
	public String main2() {
		Fruit[] fruits = new Apple[10];
		//Apple[] apples = new Apple[10];

		fruits[0] = new Apple();//允许
		fruits[1] = new Orange();// 编译时通过，但运行时将导致 ArrayStoreException

		return "ok";
	}


	//容易出问题----通用的排序方法，适用于任何 Person 类型及其子类
	public static <T extends Person> void sort_Person_child(T[] array) {
		for (int i = 0; i < array.length; i++) {
			for (int j = 0; j < array.length - i - 1; j++) {
				if (array[j].getName().compareTo(array[j + 1].getName()) > 0) {
					T temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
				}
			}
		}
	}


}


