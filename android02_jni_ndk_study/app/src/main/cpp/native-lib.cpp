#include <jni.h>
#include <string>
#include <android/log.h>

#define  TAG "ME"
//__VA_ARGS__  表式 ...的可变参数  ,define 定义宏
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG,TAG,__VA_ARGS__);
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,TAG,__VA_ARGS__);
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,TAG,__VA_ARGS__);


extern "C" JNIEXPORT jstring JNICALL
Java_com_xupeng_myapplication_MainActivity_stringFromJNI(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from111 C++";
    return env->NewStringUTF(hello.c_str());
}


//==========================================================
//下面的代码        采用C的编译方式
//JNIEnv *env      点击去看源码失c++和c
//jobject          MainActivity的this的实例
//JNIEXPORT：      JNI重要标记关键字，不能少(VS编译能通过，运行会报错)(AS 运行不会报错), 规则(标记为该方法可以被外部调用)
//void             代表java中的 void
//JNICALL          关键字，（可以少的） jni call（约束函数入栈顺序，和堆栈内存清理的规则）
extern "C"
JNIEXPORT void JNICALL
Java_com_xupeng_myapplication_MainActivity_my_1change_1name(JNIEnv *env, jobject thiz) {
    // TODO: implement my_change_name()
}

//==========================================================
extern "C"
JNIEXPORT jstring JNICALL
Java_com_xupeng_myapplication_MainActivity_StaticSetName(JNIEnv *env, jclass clazz) {
//如果.c
//c语言
//(*env)->DeleteLocalRef(env,clazz);
//C语言是 JNIEnv *env 二级指针
//(*env)->DeleteLocalRef(env, NULL)； 1/ c是没有对象的，想持有env环境，就必须传递进去


//如果.cpp
//env->xxx函数
//env->DeleteLocalRef ()
//C++语言是 JNIEnv *env 一级指针


//如果是c++
//    struct JNIEnvtypedef_JNIEnv JNIEnv别名 ;
//    JNIEnv *env所以C++是一级指针
//else如果是c
//    JNINativeInterface* JNIEnv;  一级指针
//    JNIEnv *env 所以C++是二级指针



//    env->DeleteLocalRef(NULL);//C++是有对象的，本来就会持有this，所以不需要传
    jstring hello = env->NewStringUTF("我是Java_com_xupeng_myapplication_MainActivity_StaticSetName");
    return hello;
}


//==========================================================
extern "C"
JNIEXPORT void JNICALL
Java_com_xupeng_myapplication_MainActivity_setObj(JNIEnv *env, jobject MainActivityThis) {
    jclass MainActivityClass = env->FindClass("com/xupeng/myapplication/MainActivity");                   //方式1获取jclass
    jfieldID nameFid = env->GetFieldID(MainActivityClass, "name", "Ljava/lang/String;");        // jfieldID GetFieldID(jclass clazz, const char* name, const char* sig)
    jstring value = env->NewStringUTF("小许222");
    env->SetObjectField(MainActivityThis, nameFid, value);  ////    void SetObjectField(jobject obj, jfieldID fieldID, jobject value)

}

//==========================================================
extern "C"
JNIEXPORT void JNICALL
Java_com_xupeng_myapplication_MainActivity_setAge(JNIEnv *env, jclass clazz) {
    //    jclass MainActivityClass = env->GetObjectClass(clazz);                                                   //方式2获取jclass
    //    jfieldID fid = env->GetFieldID(clazz, "age", "I");

    jfieldID fid = env->GetStaticFieldID(clazz, "age", "I");
    jint age = 15160;
    int age2 = env->GetStaticIntField(clazz, fid);
    env->SetStaticIntField(clazz, fid, age2 + 1);
}

//==========================================================
extern "C"
JNIEXPORT void JNICALL
Java_com_xupeng_myapplication_MainActivity_setNumber(JNIEnv *env, jobject thiz) {
    jclass mainactivityClass = env->GetObjectClass(thiz);
    jfieldID fid = env->GetFieldID(mainactivityClass, "number", "D");
    env->SetDoubleField(thiz, fid, 888.88);
    double result = env->GetDoubleField(thiz, fid);
    LOGD("setNumber---result---%lf\n", result);


}
//==========================================================
extern "C"
JNIEXPORT void JNICALL
Java_com_xupeng_myapplication_MainActivity_callAddMethod(JNIEnv *env, jobject thiz) {
    jclass MainActivityClass = env->GetObjectClass(thiz);
    jmethodID addMethod = env->GetMethodID(MainActivityClass, "add", "(II)I");//签名"(II)I"
    jint result = env->CallIntMethod(thiz, addMethod, 10, 20);  //    void CallVoidMethod(jobject obj, jmethodID methodID, ...)
    LOGD("callAddMethod---result---%d\n", result);
}


extern "C"
JNIEXPORT void JNICALL
Java_com_xupeng_myapplication_MainActivity_callShowStr(JNIEnv *env, jobject thiz) {
    jclass MainActivityClass = env->GetObjectClass(thiz);
    jmethodID methodId = env->GetMethodID(MainActivityClass, "showStr", "(Ljava/lang/String;)Ljava/lang/String;");

    jstring result_jstring1 = env->NewStringUTF("我是java");
    jstring result_jstring2 = (jstring) env->CallObjectMethod(thiz, methodId, result_jstring1);
    const char *result_char = env->GetStringUTFChars(result_jstring2, NULL);
    LOGD("callShowStr---result_char---%s\n", result_char);
}



//获取数据类型的descriptordescriptor
//E:\AAA\xp_work\android03_jni_ndk_study\app\build\intermediates\javac\debug\compileDebugJavaWithJavac\classes>javap -s -p   掉进去 MainActivity

/*

E:\AAA\xp_work\android03_jni_ndk_study\app\build\intermediates\javac\debug\compileDebugJavaWithJavac\classes>javap -s -p   E:\AAA\xp_work\android03_jni_ndk_study\app\build\intermediates\javac\debug\compileDebugJavaWithJavac\classes\com\xupeng\myapplication\MainActivity.class
Compiled from "MainActivity.java"
public class com.xupeng.myapplication.MainActivity extends androidx.appcompat.app.AppCompatActivity {
  private com.xupeng.myapplication.databinding.ActivityMainBinding that;
    descriptor: Lcom/xupeng/myapplication/databinding/ActivityMainBinding;
  private java.lang.String name;
    descriptor: Ljava/lang/String;
  public com.xupeng.myapplication.MainActivity();
    descriptor: ()V

  public native java.lang.String stringFromJNI();
    descriptor: ()Ljava/lang/String;//签名

  public static native java.lang.String StaticSetName();
    descriptor: ()Ljava/lang/String;

  public native void setObj();
    descriptor: ()V

  protected void onCreate(android.os.Bundle);
    descriptor: (Landroid/os/Bundle;)V //签名

  public void methods();
    descriptor: ()V

  static {};
    descriptor: ()V
}







* */

//extern "C"
//JNIEXPORT void JNICALL
//Java_com_xupeng_myapplication_MainActivity_setNumber(JNIEnv *env, jobject thiz) {
//        jclass mainactivityClass = env->GetObjectClass(thiz);
//    jfieldID fid = env->GetStaticFieldID(mainactivityClass, "number", "D");
//    env->SetDoubleField(thiz, fid, 10000.1);
//}

