package com.xupeng.tools;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class fs {
	public static String read(String my_path) {
		try (FileInputStream fis_all = new FileInputStream(my_path)) {
			//fis_all = new FileInputStream(__.path_project() + "/史上最全正则表达式.md");
			byte[] bytes_all = new byte[fis_all.available()];
			int read_all = fis_all.read(bytes_all);
			System.out.println(new String(bytes_all, 0, read_all));
			//__.log("全部数据                     :", new String(bytes_all, 0, read_all));
			return new String(bytes_all, 0, read_all);

		} catch (FileNotFoundException e) {
			//throw new RuntimeException(e);
			return "";
		} catch (IOException e) {
			//throw new RuntimeException(e);
			return "";
		}
		//throw new RuntimeException(e);

	}

	public static String write(String my_path, String my_text) {
		// 创建文件字节输出流对象
		FileOutputStream out = null;
		try {
			out = new FileOutputStream(my_path, false); //不追加写入,覆盖原本内容 false
			//byte[] bs = "动力节点，一家只教授Java的培训机构".getBytes();
			byte[] bs = my_text.getBytes();
			out.write(bs);

			// 记着刷新
			out.flush();
			return my_text;
		} catch (IOException e) {
			//throw new RuntimeException(e);
			return "";
		} finally {
			// 关闭资源
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					//throw new RuntimeException(e);
					return "";
				}
			}
		}


	}


	public static String write_add(String my_path, String my_text) {
		// 创建文件字节输出流对象
		FileOutputStream out = null;
		try {
			out = new FileOutputStream(my_path, true);//追加写入 true
			//byte[] bs = "动力节点，一家只教授Java的培训机构".getBytes();
			byte[] bs = my_text.getBytes();
			out.write(bs);

			// 记着刷新
			out.flush();
			return my_text;
		} catch (IOException e) {
			//throw new RuntimeException(e);
			return "";
		} finally {
			// 关闭资源
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					//throw new RuntimeException(e);
					return "";
				}
			}
		}


	}


	public static String copy_file(String path_in, String path_out) {
		// Java7之后（包括Java7），新特性：try-with-resources
		long time1 = System.currentTimeMillis();
		try (
				//资源自动管理关闭
				FileInputStream in = new FileInputStream(path_in);//复制的文件
				FileOutputStream out = new FileOutputStream(path_out)//粘贴的文件

		) {

			// 一边读一边写
			byte[] bytes = new byte[1024];
			int readCount = 0;
			while ((readCount = in.read(bytes)) != -1) {
				out.write(bytes, 0, readCount);
			}

			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			long time2 = System.currentTimeMillis();
			return "复制文件完成222:" + (time2 - time1) + "毫秒";
		}


	}

}
