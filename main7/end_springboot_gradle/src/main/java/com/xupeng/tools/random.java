package com.xupeng.tools;

import java.util.Random;

public class random {

	public static int run(int min , int max) {
		//int min = 50;
		//int max = 100;

		Random random = new Random();
		int randomNumber = random.nextInt(max - min + 1) + min;

		return randomNumber;


	}
}
