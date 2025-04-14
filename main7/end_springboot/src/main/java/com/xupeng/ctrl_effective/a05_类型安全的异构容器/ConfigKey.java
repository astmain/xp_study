//package com.xupeng.ctrl_effective.a05_类型安全的异构容器;
//
//
//public class ConfigKey<T> {
//	private final Class<T> type;
//	private final String key;
//
//	public ConfigKey(Class<T> type, String key) {
//		this.type = type;
//		this.key = key;
//	}
//
//
//	public Class<T> get_type() {
//		return type;
//	}
//
//	public String set_key() {
//		return key;
//	}
//
//	@Override
//	public boolean equals(Object o) {
//		if (this == o) return true;
//		if (o == null || getClass() != o.getClass()) return false;
//		//后面这段代码应该怎么写
//		ConfigKey<?> that = (ConfigKey<?>) o;
//		return type.equals(that.type) && key.equals(that.key);
//	}
//
//	@Override
//	public int hashCode() {
//		int result = type.hashCode();
//		result = 31 * result + key.hashCode();
//		return result;
//	}
//
//
//}
