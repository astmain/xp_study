package com.xupeng.tools;

import java.nio.file.Path;
import java.nio.file.Paths;

public class path_project {
	public static String run() {
		Path currentPath111 = Paths.get("");
		String currentDirectory = currentPath111.toAbsolutePath().toString();
		return currentDirectory.replace("\\", "/");
	}


}
