package com.xupeng.controller_test.entity.listener;

import com.mybatisflex.annotation.InsertListener;
import com.mybatisflex.annotation.UpdateListener;
import com.xupeng.controller_test.entity.Card;


public class CardListener implements InsertListener, UpdateListener {

	@Override
	public void onInsert(Object entity) {
		Card card = (Card) entity;
		card.setEmail("111onInsert");

	}

	@Override
	public void onUpdate(Object entity) {
		Card card = (Card) entity;
		card.setEmail("222onUpdate");
	}

}