package com.xupeng.ctrl_effective.a07_静态方法代替构造器;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/ctrl_effective/a07_静态方法代替构造器")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a07_静态方法代替构造器 {


	//  视频教程 https://www.bilibili.com/video/BV1nEBzYmEQq?p=8
	//  http://127.0.0.1:22222/ctrl_effective/a07_静态方法代替构造器/main1
	@GetMapping("/main1")
	public String main1() {

		Color red = new Color(255, 0, 0);
		Color green = new Color(0, 255, 0);
		Color blue = new Color(0, 0, 255);
		__.log("red---:", red);
		__.log("green---:", green);
		__.log("blue---:", blue);
		__.log("Color.red()---:", Color.red());
		__.log("Color.fromRGB(142,111,29)---:", Color.fromRGB(142, 111, 29));
		return "ok";
	}


}


