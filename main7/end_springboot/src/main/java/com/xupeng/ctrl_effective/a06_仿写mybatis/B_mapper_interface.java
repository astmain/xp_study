package com.xupeng.ctrl_effective.a06_仿写mybatis;


import java.util.List;
import java.util.Optional;

public interface B_mapper_interface<T> {

	void insert(T entity);

	Optional<T> selectOne(String query);

	List<T> selectList(String query);
}
