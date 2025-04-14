// signature.js

const crypto = require('crypto');
const dayjs = require('dayjs');
const {URLSearchParams} = require('url');

class GetSignature {
	constructor(accinfo, serviceName) {
		this.iosTime = format_iso_date();
		this.region = "cn-north-1";
		this.serviceName = serviceName;
		this.aws = 'aws4_request';
		this.accinfo = accinfo;
		this.headers = {};
	}
	
	
	credentialString() {
		return [this.iosTime.slice(0, 8), this.region, this.serviceName, 'aws4_request'].join('/');
	}
	
	hexEncodedBodyHash(body = '') {
		if (this.headers['X-Amz-Content-Sha256']) {
			let result = this.headers['X-Amz-Content-Sha256']
			return result
		} else {
			const body_encode = new TextEncoder().encode(body);
			let result = crypto.createHash('sha256').update(body_encode).digest('hex')
			return result
		}
		
	}
	
	add_header(method = 'GET', body = '') {
		this.headers["X-Amz-Date"] = this.iosTime;
		this.headers["x-amz-security-token"] = this.accinfo['SessionToken'];
		if (method === 'POST') {
			this.headers["X-Amz-Content-Sha256"] = this.hexEncodedBodyHash(body);
			let zzz = 1
		}
	}
	
	hexencode(body) {
		return crypto.createHash('sha256').update(body).digest('hex');
	}
	
	canonicalString(params, method = 'GET') {
		const sortedParams = Object.keys(params)
		.sort()
		.reduce((acc, key) => {
			acc[key] = params[key];
			return acc;
		}, {});
		
		const queryString = new URLSearchParams(sortedParams).toString();
		
		return [method.toUpperCase(), '/', queryString, canonicalHeaders(this.headers) + '\n', sortHeadersKey(this.headers), this.hexEncodedBodyHash()].join('\n');
	}
	
	
	getSigningKey() {
		const secret = calculateHmac("AWS4" + this.accinfo.SecretAccessKey, this.iosTime.slice(0, 8));
		const region = calculateHmac(secret, this.region);
		const serviceName = calculateHmac(region, this.serviceName);
		return calculateHmac(serviceName, this.aws);
	}
	
	stringToSign(params, method = 'GET') {
		return ["AWS4-HMAC-SHA256", this.iosTime, this.credentialString(), this.hexencode(this.canonicalString(params, method))].join('\n');
	}
	
	
	get_authoration({params, method = 'GET', body = ''}) {
		let auth = "AWS4-HMAC-SHA256 Credential=";
		const r = this.credentialString();
		this.add_header(method, body);
		const signByte = this.getSigningKey();
		const strSign = this.stringToSign(params, method);
		const signature = calculate_hmac(signByte, strSign, true);
		let headersKeysStr = ', SignedHeaders=x-amz-date;x-amz-security-token, Signature=';
		if (method === 'POST') {
			headersKeysStr = ', SignedHeaders=x-amz-content-sha256;x-amz-date;x-amz-security-token, Signature=';
		}
		auth += (this.accinfo['AccessKeyID'] + '/' + r + headersKeysStr);
		auth += signature;
		this.headers['authorization'] = auth;
		return this.headers;
	}
}

let tool_signature = GetSignature
module.exports = tool_signature


function format_iso_date(date = null) {
	// 如果未传入日期参数，则使用当前日期
	if (date === null) {
		date = new Date();
	}
	// 将日期对象格式化成 ISO 8601 格式的时间字符串，例如 "2023-07-28T12:34:56Z"
	let iso_string = date.getUTCFullYear().toString().padStart(4, '0') + (date.getUTCMonth() + 1).toString().padStart(2, '0') + date.getUTCDate().toString().padStart(2, '0') + 'T' + date.getUTCHours().toString().padStart(2, '0') + date.getUTCMinutes().toString().padStart(2, '0') + date.getUTCSeconds().toString().padStart(2, '0') + 'Z';
	// 返回格式化后的 ISO 时间字符串
	return iso_string;
}

function calculateHmac(key, string, isHex = false) {
	let hmac;
	if (Buffer.isBuffer(key)) {
		hmac = crypto.createHmac('sha256', key);
	} else {
		hmac = crypto.createHmac('sha256', Buffer.from(key, 'utf8'));
	}
	hmac.update(string);
	return isHex ? hmac.digest('hex') : hmac.digest();
}


function sortHeadersKey(headers) {
	return Object.keys(headers)
	.map(key => key.toLowerCase())
	.sort()
	.join(';');
}

function canonicalHeaders(headers) {
	return Object.keys(headers)
	.map(key => `${key.toLowerCase()}:${headers[key]}`)
	.sort()
	.join('\n');
}


function calculate_hmac(key, message, is_hex = false) {
	const hashAlgorithm = 'sha256';
	if (typeof key === 'string') {
		key = Buffer.from(key, 'utf-8');
	}
	if (typeof message === 'string') {
		message = Buffer.from(message, 'utf-8');
	}
	const hmac = crypto.createHmac(hashAlgorithm, key).update(message);
	return is_hex ? hmac.digest('hex') : hmac.digest();
}