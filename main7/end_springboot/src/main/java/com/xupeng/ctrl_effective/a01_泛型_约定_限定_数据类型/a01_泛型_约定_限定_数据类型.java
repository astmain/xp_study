package com.xupeng.ctrl_effective.a01_泛型_约定_限定_数据类型;


import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ctrl_effective/a01_泛型_约定_限定_数据类型")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a01_泛型_约定_限定_数据类型 {
	//  http://127.0.0.1:22222/ctrl_effective/a01_泛型_约定_限定_数据类型/main1
	@GetMapping("/main1")
	public String main1() {
		Box box = new Box();
		box.addItem("小许");
		box.addItem(123);//编译时不会报错，但会导致运行时错误
		box.printItems();//运行时可能会抛出 ClassCastException
		return "ok";
	}

	//  http://127.0.0.1:22222/ctrl_effective/a01_泛型_约定_限定_数据类型/main2
	@GetMapping("/main2")
	public String main2() {
		Box2<String> box = new Box2<String>();     //泛型<String>
		box.addItem("小许");
		//box.addItem(123);//编辑的时候 泛型就会提示报错
		box.addItem("123");
		box.printItems();
		return "ok";
	}


	//  http://127.0.0.1:22222/ctrl_effective/a01_泛型_约定_限定_数据类型/main3
	@GetMapping("/main3")
	public String main3() {
		Box2<Integer> box = new Box2<Integer>();     //泛型<String>
		box.addItem(123);
		box.printItems();
		return "ok";
	}


}


