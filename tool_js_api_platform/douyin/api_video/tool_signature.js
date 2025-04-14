// tool_signature.js


const crypto = require('crypto')

// Helper functions
function formatIsoDate() {
	const date = new Date();
	return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
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

function canonicalHeaders(headers) {
	return Object.keys(headers)
	.map(key => `${key.toLowerCase()}:${headers[key]}`)
	.sort()
	.join('\n');
}

function sortHeadersKey(headers) {
	return Object.keys(headers)
	.map(key => key.toLowerCase())
	.sort()
	.join(';');
}

class GetSignature {
	constructor(accinfo, serviceName) {
		this.iosTime = formatIsoDate();
		this.region = "cn-north-1";
		this.aws = 'aws4_request';
		// 修改过
		this.serviceName = "vod";
		if (serviceName) {
			this.serviceName = serviceName
		}
		this.accinfo = accinfo;
		this.headers = {};
	}
	
	credentialString() {
		return [this.iosTime.slice(0, 8), this.region, this.serviceName, 'aws4_request'].join('/');
	}
	
	hexencode(body) {
		return crypto.createHash('sha256').update(body).digest('hex');
	}
	
	hexEncodedBodyHash(body = "") {
		if (this.headers['X-Amz-Content-Sha256']) {
			return this.headers['X-Amz-Content-Sha256'];
		}
		return this.hexencode(body);
	}
	
	addHeader(method = 'GET', body = '') {
		this.headers["X-Amz-Date"] = this.iosTime;
		this.headers["x-amz-security-token"] = this.accinfo.SessionToken;
		if (method === 'POST') {
			this.headers["X-Amz-Content-Sha256"] = this.hexEncodedBodyHash(body);
		}
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
	
	stringToSign(params, method = 'GET') {
		return ["AWS4-HMAC-SHA256", this.iosTime, this.credentialString(), this.hexencode(this.canonicalString(params, method))].join('\n');
	}
	
	getSigningKey() {
		const secret = calculateHmac("AWS4" + this.accinfo.SecretAccessKey, this.iosTime.slice(0, 8));
		const region = calculateHmac(secret, this.region);
		const serviceName = calculateHmac(region, this.serviceName);
		return calculateHmac(serviceName, this.aws);
	}
	
	get_authoration(params, method, body) {
		if (!method) method = "GET"
		if (!body) body = ""
		
		
		let auth = "AWS4-HMAC-SHA256 Credential=";
		const r = this.credentialString();
		this.addHeader(method, body);
		const signByte = this.getSigningKey();
		const strSign = this.stringToSign(params, method);
		const Signature = calculateHmac(signByte, strSign, true);
		
		let headersKeysStr = ', SignedHeaders=x-amz-date;x-amz-security-token, Signature=';
		if (method === 'POST') {
			headersKeysStr = ', SignedHeaders=x-amz-content-sha256;x-amz-date;x-amz-security-token, Signature=';
		}
		
		auth += this.accinfo.AccessKeyID + '/' + r + headersKeysStr + Signature;
		this.headers.authorization = auth;
		return this.headers;
	}
}

// Example usage:
/*
const accinfo = {
    AccessKeyID: "your-access-key",
    SecretAccessKey: "your-secret-key",
    SessionToken: "your-session-token"
};

const params = {
    Action: "ApplyUploadInner",
    Version: "2020-11-19",
    SpaceName: "aweme",
    FileType: "video",
    IsInner: "1",
    FileSize: "393402",
    app_id: "2906",
    user_id: "25986126326967",
    s: "btr7l9an4nn"
};

const signature = new GetSignature(accinfo);
const headers = signature.getAuthoration(params);
console.log(headers);
*/

module.exports = GetSignature;