package com.xupeng.controller_test;

import com.mybatisflex.core.query.QueryWrapper;
import com.xupeng.controller_test.entity.Account;
import com.xupeng.tools.Result;
import com.xupeng.tools.__;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;

@RestController
@RequestMapping("/controller_test")
@RequiredArgsConstructor
@Validated//GetMapping参数检查
public class sql00_参数校验 {
	final com.xupeng.controller_test.entity.mapper.AccountMapper dao_account;
	final com.xupeng.controller_test.entity.mapper.CartMapper dao_card;
	QueryWrapper qw = QueryWrapper.create();

	//  http://127.0.0.1:22222/controller_test/sql00_参数校验_post?id=1&username=xupeng&password=123456
	@PostMapping("/sql00_参数校验_post")
	public Result<Account> sql00_参数校验_post(@RequestBody @Valid Account account) {
		__.log("account---:", account);
		return Result.ok(account).message("成功");
	}

	//http://127.0.0.1:8989/controller_test/sql00_参数校验_get?id=1&username=xupeng&password=123456
	@GetMapping("/sql00_参数校验_get")
	public String sql00_参数校验_get(@NotBlank(message = "username不能为空") String username) {
		__.log("username---:", username);
		return username;
	}


}
