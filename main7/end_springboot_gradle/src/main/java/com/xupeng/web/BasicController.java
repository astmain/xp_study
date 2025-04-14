

package com.xupeng.web;

import com.xupeng.tools.__;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.lang.String;

@RestController
@RequestMapping("/controller")
@RequiredArgsConstructor
public class BasicController {


	//  http://127.0.0.1:22222/controller/get?username=我的&password=我的&img_code=我的
	//  http://127.0.0.1:22222/controller/get?aaa=111
	@GetMapping("/get")
	//public String get(String aaa) {
	//public String get(@RequestParam("aaa") String aaa) {
	public String get( String aaa) {
		__.log("aaa---:" ,  aaa   );

		//参数
		//__.log("username---:", username);
		//__.log("password---:", password);
		//__.log("username---:", username);

		var aa = "sss";
		__.log("我的---:", 222);
		return "1111111";
	}


}
