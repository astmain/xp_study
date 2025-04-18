package com.xupeng.tools;

import lombok.Data;

/**
 * 全局统一返回结果类
 */
@Data
public class Result<T> {
	private Boolean success;//是否成功
	private Integer code;//状态码
	private String message;//返回消息
	private T data;//返回数据

	/**
	 * 私有化构造方法，禁止在其它类创建对象
	 */
	private Result() {
	}

	/**
	 * 成功执行，不返回数据---不带数据
	 *
	 * @return
	 */
	public static <T> Result<T> ok() {
		Result<T> result = new Result<T>();
		result.setSuccess(true);
		result.setCode(200);//成功状态码
		result.setMessage("执行成功");
		return result;
	}

	/**
	 * 成功执行，并返回数据---带数据
	 *
	 * @param data
	 * @param <T>
	 * @return
	 */
	public static <T> Result<T> ok(T data) {
		Result<T> result = new Result<T>();
		result.setSuccess(true);
		result.setCode(200);//成功状态码
		result.setMessage("执行成功");
		result.setData(data);
		return result;
	}

	/**
	 * 失败
	 *
	 * @return
	 */
	public static <T> Result<T> error() {
		Result<T> result = new Result<T>();
		result.setSuccess(false);
		result.setCode(500);//失败状态码
		result.setMessage("执行失败");
		return result;
	}

	/**
	 * 设置是否成功
	 *
	 * @param success
	 * @return
	 */
	public Result<T> success(Boolean success) {
		this.setSuccess(success);
		return this;
	}

	/**
	 * 设置状态码
	 *
	 * @param code
	 * @return
	 */
	public Result<T> code(Integer code) {
		this.setCode(code);
		return this;
	}

	/**
	 * 设置返回消息
	 *
	 * @param message
	 * @return
	 */
	public Result<T> message(String message) {
		this.setMessage(message);
		return this;
	}

	/**
	 * 是否存在
	 *
	 * @return
	 */
	public static <T> Result<T> exist() {
		Result<T> result = new Result<T>();
		result.setSuccess(true);
		result.setCode(600);//未登录状态码
		result.setMessage("执行成功");
		return result;
	}
}
