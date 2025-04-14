package com.xupeng.tools;

public class log_error {
	public static String run(Object... args) {
		//System.out.println("args     :" + args);

		//System.out.printf("[%s] " + message + "%n", Thread.currentThread().getName(), args);


		//System.out.println("[" + Thread.currentThread().getName() + "] " + String.format(message, args));
		//System.out.println(String.format(message, args));


		//StringBuilder sb = new StringBuilder("[").append(Thread.currentThread().getName()).append("] ");
		//sb.append(String.format(message, args));
		//System.out.println(sb.toString());


		String str1 = "";
		//
		//for (Object arg : args) {
		//
		//    str1 = str1 + arg.toString() + "   ";
		//    System.out.println("Argument: " + arg.toString());
		//}

		for (int i = 0; i < args.length; i++) {
			//String ele = args[i].toString(); //可能会保存
			String ele = String.valueOf(args[i]); // 结果为 "null"
			if (i == 0) {
				str1 = str1 + ele;
			} else {
				str1 = str1 + ele + "  ";
			}


		}


		//System.out.println(str1);
		System.out.println("\033[31m" + str1 + "\033[0m");
		return "log_error  " + str1;


	}
}
