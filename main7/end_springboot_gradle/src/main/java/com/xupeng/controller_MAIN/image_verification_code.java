package com.xupeng.controller_MAIN;

import com.google.code.kaptcha.Producer;

import com.xupeng.tools.__;
import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;


@RequestMapping("/controller_MAIN")
@RestController
public class image_verification_code {

	//注入id引用名为captchaProducer的Producer接口的实现类DefaultKaptcha的bean对象
	@Resource(name = "captchaProducer")
	private Producer captchaProducer;
	//
	//注入redis模板
	@Autowired
	private StringRedisTemplate stringRedisTemplate;

	/**
	 * 生成验证码图片的url接口/captcha/captchaImage
	 */
	@GetMapping("/image_verification_code")
	public void getKaptchaImage(HttpServletResponse response) throws IOException {
		ServletOutputStream out = null;
		try {
			//禁止浏览器缓存验证码图片的响应头
			response.setDateHeader("Expires", 0);
			response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
			response.addHeader("Cache-Control", "post-check=0, pre-check=0");
			response.setHeader("Pragma", "no-cache");
			//响应正文为jpg图片即验证码图片
			response.setContentType("image/jpeg");

			//生成验证码文本
			String code_text = captchaProducer.createText();
			//生成验证码图片
			BufferedImage bi = captchaProducer.createImage(code_text);
			//将验证码文本存储到redis
			//stringRedisTemplate.opsForValue().set(code_text, code_text,60*30* TimeUnit.SECONDS);
			stringRedisTemplate.opsForValue().set(code_text, code_text);

			//将验证码图片响应给浏览器
			out = response.getOutputStream();
			ImageIO.write(bi, "jpg", out);
			out.flush();
			__.log("成功:生图片验证码");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}
}
