package com.xupeng.ctrl_effective.a05_类型安全的异构容器;


import java.util.HashMap;
import java.util.Map;

public class DbConfig {

	private Map<Object, Object> configMap = new HashMap<>();

	// 存储配置参数
	public void putConfig(String key, Object value) {
		//
		configMap.put(key, value);
	}
	// 检索配置参数
	public Object getConfig(String key) {
		//
		return configMap.get(key);
	}


}
