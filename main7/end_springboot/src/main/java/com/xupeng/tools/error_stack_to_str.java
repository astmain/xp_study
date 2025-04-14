package com.xupeng.tools;

import java.io.PrintWriter;
import java.io.StringWriter;

public class error_stack_to_str {
	public static String get(Throwable error) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		error.printStackTrace(pw);
		return sw.toString();
	}

}
