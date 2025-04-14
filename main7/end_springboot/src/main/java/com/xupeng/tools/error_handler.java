//package com.xupeng.web.tools;
//
//import jakarta.servlet.http.HttpServletResponse;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class error_handler {
//	private Logger logger = LoggerFactory.getLogger(getClass());
//
//	@ExceptionHandler(value = Exception.class)
//	public String exceptionHandler(HttpServletResponse response, Exception e) {
//		//response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
//		__.log("response                     : " ,  response   );
//		logger.info("服务器异常", e);
//		__.log("e                     : ", e);
//		return R.fail("msg_error_info", __.error_stack_to_str(e));
//		//return Result.fail("服务器异常");
//	}
//}
