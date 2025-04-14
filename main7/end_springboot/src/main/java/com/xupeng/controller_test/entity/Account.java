package com.xupeng.controller_test.entity;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import org.springframework.validation.annotation.Validated;//参数校验Validated和Valid配合使用

//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Size;
import java.util.Date;

@Data
@NoArgsConstructor//有什么作用
@AllArgsConstructor//有什么作用
@Table(value = "tb_account", dataSource = "my_datasource_test1", camelToUnderline = false)
public class Account {

	@Id(keyType = KeyType.Auto)
	private Long id;

	@Size(min = 2, max = 20, message = "Size---用户名长度需在2到10个字符之间")
	@NotBlank(message = "NotBlank---用户名不能为空")
	private String username;


	@NotNull(message = "NotNull---密码不能为空")
	@NotBlank(message = "NotBlank---密码不能为空")
	private String password;


	@NotNull(message = "NotNull---请输入正确的邮箱格式")
	@Email(message = "Email---请输入正确的邮箱格式2")
	private String email;

	private Integer age = 0;
	private Date birthday;
	private Integer gender = 0;


}