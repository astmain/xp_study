const yup = require('yup')

// 创建验证类
globalThis.yup = yup
globalThis.Form_check = class {
	// 验证方法
	static async check({rule, data}) {
		try {
			const validatedData = await rule.validate(data, {abortEarly: false});
			return {success: true, data: validatedData, error_info: null};
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				const formattedErrors = this.format_errors(error);
				return {success: false, data: null, error_info: formattedErrors};
			} else {
				return {success: false, data: null, error_info: error}
			}
		}
	}
	
	static async check_resp({req, resp, rule, data}) {
		let form_check_result = await Form_check.check({rule, data})
		// console.log(`check_resp---form_check_result:`,form_check_result)
		if (form_check_result.success == false) {
			let result_err = {code: 400, success: false, msg: `失败:数据检验异常`, url: url_decode(req.url)   , params: req.query, form_check_result}
			console.error(`result_err:`, result_err)
			return result_err
			// resp.json(result_err)
		} else {
			return {success: true}
		}
		
	}
	
	
	// 格式化错误信息
	static format_errors(error) {
		let error_info = error.inner.map(o => {
			let label_key = o.path
			let label = o.params.label ? o.params.label : `${label_key}未填写label()`
			let errors = o.errors
			let errors_str = o.errors.join("   ")
			return {label, label_key, errors, errors_str}
		})
		// console.log(`form_yup_validator---formatErrors---info:`, info)
		return error_info
	}
}

module.exports = Form_check

