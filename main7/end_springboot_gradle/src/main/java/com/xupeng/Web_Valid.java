package com.xupeng;


import com.xupeng.tools.__;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class Web_Valid {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException error, HttpServletRequest request) {
		Map<String, Object> obj = new HashMap<>();
		obj.put("url", request.getRequestURI());
		error.getBindingResult().getAllErrors().forEach((err) -> {
			String field = ((FieldError) err).getField();
			String errorMessage = err.getDefaultMessage();
			obj.put("code", 400);
			obj.put("msg", "参数异常");
			obj.put(field, errorMessage);
		});

		__.log_error("参数异常---:", obj);
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}


}