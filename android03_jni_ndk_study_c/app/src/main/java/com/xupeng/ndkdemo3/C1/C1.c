#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <jni.h>
#include <string.h>
#include <android/log.h>


//__VA_ARGS__  表式 ...的可变参数  ,define 定义宏
#define  TAG "ME---"
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG,TAG,__VA_ARGS__);
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,TAG,__VA_ARGS__);
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,TAG,__VA_ARGS__);


jstring Java_com_xupeng_ndkdemo3_C1_sayHello(JNIEnv *env, jobject jobj) {
    char *text = "i amd from c";
    return (*env)->NewStringUTF(env, text);
}

jint Java_com_xupeng_ndkdemo3_C1_add(JNIEnv *env, jobject jobj, jint a1, jint a2) {
    int result = a1 + a2;
    return result;

}


JNIEXPORT jstring JNICALL
Java_com_xupeng_ndkdemo3_C1_str_1join(JNIEnv *env, jobject thiz, jstring a1, jstring a2) {
    const char *cStr1 = (*env)->GetStringUTFChars(env, a1, 0);
    const char *cStr2 = (*env)->GetStringUTFChars(env, a2, 0);
    size_t len = strlen(cStr1) + strlen(cStr2) + 1;
    char *result = (char *) malloc(len);
    if (result == NULL) return NULL;  // 内存分配失败
    strcpy(result, cStr1);
    strcat(result, cStr2);
    jstring jResult = (*env)->NewStringUTF(env, result);
    free(result);
    return jResult;
}


JNIEXPORT jintArray JNICALL
Java_com_xupeng_ndkdemo3_C1_arr_1add100(JNIEnv *env, jobject thiz, jintArray arr) {
    jsize size = (*env)->GetArrayLength(env, arr);
    jint *arr2 = (*env)->GetIntArrayElements(env, arr, JNI_FALSE);
    int i;
    for (i = 0; i < size; ++i) {
//        *(arr2 + i) += 100;
        *(arr2 + i) = *(arr2 + i) + 100;

    }
    return arr;
}

JNIEXPORT jint JNICALL
Java_com_xupeng_ndkdemo3_C1_check_1password(JNIEnv *env, jobject thiz, jstring password) {
    char *origin = "123456";
    char *str1 = (*env)->GetStringUTFChars(env, password, 0);
    int code = strcmp(origin, str1);
    if (code == 0) {
        return 200;
    } else {
        return 400;
    }
}


JNIEXPORT jint JNICALL
Java_com_xupeng_ndkdemo3_C1_call_1add2(JNIEnv *env, jobject thiz, jint a1, jint a2) {

    //找到Java类
    jclass cls = (*env)->FindClass(env, "com/xupeng/ndkdemo3/C1");
    //得到方法
    jmethodID mid = (*env)->GetMethodID(env, cls, "add2", "(II)I");
    //实例化该类
    jobject obj = (*env)->AllocObject(env, cls);
    //调用方法
    jint result = (*env)->CallIntMethod(env, obj, mid, a1, a2);
    LOGI("ME---111---Java_com_xupeng_ndkdemo3_C1_call_1add2----result = %d", result);
    return result;
}