package com.xupeng.ctrl_effective.a04_未检查警告;


import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ctrl_effective/a04_未检查警告")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class a04_未检查警告 {
	//  http://127.0.0.1:22222/ctrl_effective/a04_未检查警告/main1
	@GetMapping("/main1")
	public String main1() {
		Example example = new Example();

		example.addItem("hello");
		String item = example.getItem(0);

		__.log("111---:", item);
		return "ok";
	}


}


