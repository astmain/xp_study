package com.xupeng.ctrl_effective.a07_静态方法代替构造器;


public class Color {
	private final int red;
	private final int green;
	private final int blue;

	public Color(int red, int green, int blue) {
		this.red = red;
		this.green = green;
		this.blue = blue;
	}

	public static Color fromRGB(int red, int green, int blue) {
		return new Color(red, green, blue);
	}

	public static Color red() {
		return new Color(255, 0, 0);
	}

	public static Color green() {
		return new Color(0, 255, 0);
	}

	public static Color blue() {
		return new Color(0, 0, 255);
	}

	public int getRed() {
		return red;
	}

	public int getGreen() {
		return green;
	}

	public int getBlue() {
		return blue;
	}


}
