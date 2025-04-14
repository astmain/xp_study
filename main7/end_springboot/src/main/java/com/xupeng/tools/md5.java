package com.xupeng.tools;


public class md5 {

	public static String encode(String input) {
		try {
			byte[] messageDigest = MessageDigestHelper.getMD5Digest(input.getBytes());
			return hexToString(messageDigest);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private static String hexToString(byte[] bytes) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bytes) {
			sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
		}
		return sb.toString();
	}


	private static class MessageDigestHelper {
		private static byte[] getMD5Digest(byte[] input) throws Exception {
			java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
			return md.digest(input);
		}
	}

}
