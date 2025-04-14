//package com.xupeng;
//
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.Around;
//import org.aspectj.lang.annotation.Aspect;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class StartupTimeAspect {
//
//	@Around("execution(public static void org.springframework.boot.SpringApplication.run(..))")
//	public void measureStartupTime(ProceedingJoinPoint joinPoint) throws Throwable {
//		long startTime = System.currentTimeMillis();
//		joinPoint.proceed();
//		long endTime = System.currentTimeMillis();
//		System.out.println("应用启动时间：" + (endTime - startTime) + " 毫秒");
//	}
//}