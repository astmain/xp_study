package com.xupeng.ctrl_effective.a05_类型安全的异构容器;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class DataBaseConfig {

	private Map<Class<?>, Object> configMap = new HashMap<>();

	// 存储配置参数
	public <T> void putConfig(Class<T> type, Object value) {
		//

		Objects.requireNonNull(type);
		configMap.put(type, value);
	}

	// 检索配置参数
	public <T> T getConfig(Class<T> type) {
		//
		return type.cast(configMap.get(type));
	}


}
