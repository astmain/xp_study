package com.xupeng.ctrl_effective.a05_类型安全的异构容器;


import com.xupeng.tools.__;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class FinalDataBaseConfig {

	private Map<ConfigKey<?>, Object> configMap = new HashMap<>();

	// 存储配置参数
	public <T> void putConfig(Class<T> type, String key, T value) {
		//
		ConfigKey<T> tConfigKey = new ConfigKey<>(type, key);
		configMap.put(tConfigKey, value);

	}

	// 检索配置参数
	public <T> T getConfig(Class<T> type, String key) {
		//
		//ConfigKey<T> tConfigKey = new ConfigKey<>(type, key);
		//Object object = configMap.get(tConfigKey);
		//__.log("tConfigKey---:", tConfigKey);
		//__.log("object---:", object);
		//return type.cast(object);

		return type.cast(configMap.get(new ConfigKey<>(type, key)));
	}


}

class ConfigKey<T> {
	private final Class<T> type;
	private final String key;

	public ConfigKey(Class<T> type, String key) {
		this.type = type;
		this.key = key;
	}


	public Class<T> get_type() {
		return type;
	}

	public String set_key() {
		return key;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		//后面这段代码应该怎么写
		ConfigKey<?> that = (ConfigKey<?>) o;
		return type.equals(that.type) && key.equals(that.key);
	}

	@Override
	public int hashCode() {
		int result = type.hashCode();
		result = 31 * result + key.hashCode();
		return result;
	}


}


