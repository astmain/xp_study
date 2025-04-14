package com.xupeng.ctrl_effective.a02_泛型_上界通配符_下界通配符;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/ctrl_effective/a02_泛型_上界通配符_下界通配符")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a02_泛型_上界通配符_下界通配符 {
	//  http://127.0.0.1:22222/ctrl_effective/a02_泛型_上界通配符_下界通配符/main1
	@GetMapping("/main1")
	public String main1() {
		List<Fruit> fruitist = new ArrayList<Fruit>();
		fruitist.add(new Apple());
		fruitist.add(new Orange());
		fruitist.add(new RedApple());
		__.log("fruitist---:", fruitist);

		return "ok";
	}

	//  http://127.0.0.1:22222/ctrl_effective/a02_泛型_上界通配符_下界通配符/main2
	@GetMapping("/main2")
	public String main2() {
		List<Fruit> fruitist = new ArrayList<Fruit>();
		fruitist.add(new Apple());
		fruitist.add(new Orange());
		fruitist.add(new RedApple());
		__.log("fruitist---:", fruitist);
		Cover.Up_fruitList(fruitist);
		return "ok";
	}


	//  http://127.0.0.1:22222/ctrl_effective/a02_泛型_上界通配符_下界通配符/main3
	@GetMapping("/main3")
	public String main3() {
		List<Fruit> fruitist = new ArrayList<Fruit>();
		fruitist.add(new Apple());
		fruitist.add(new Orange());
		fruitist.add(new RedApple());
		__.log("fruitist---:", fruitist);
		Cover.Down_fruitList(fruitist);
		return "ok";
	}


}


