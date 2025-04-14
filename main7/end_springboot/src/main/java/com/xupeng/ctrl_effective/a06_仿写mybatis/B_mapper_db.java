package com.xupeng.ctrl_effective.a06_仿写mybatis;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class B_mapper_db<T> implements B_mapper_interface<T> {


	private List<T> database = new ArrayList<>();


	@Override
	public void insert(T entity) {
		//
		database.add(entity);
	}

	@Override
	public Optional<T> selectOne(String query) {
		//
		return database.stream().filter(entity -> entity.toString().contains(query)).findFirst();
	}

	@Override
	public List<T> selectList(String query) {
		List<T> results = new ArrayList<>();
		for (T entity : database) {
			if (entity.toString().contains(query)) {
				results.add(entity);
			}
		}
		return results;
	}
}
