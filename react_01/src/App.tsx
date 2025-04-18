import {useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


// 1.插值语句jsx tsx {} 字符串 数字 数组(普通类型)元素 三元表达式API调用
//2.插值语句支持对象{name:1}需要序列化
function App() {
    const name = "小许"
    const num1 = 3.1415926
    const obj1 = {name: 1}
    const css_test = "css_test"
    const html2 = `<section>我是html2的section</section>`

    const arr = ["我的", "你的", "他的"]


    function func1(params: number) {
        console.log(`func1---params:`, params)
    }


    const func2 = <T, >(parmas: T) => {
        console.log(`func2---parmas:`, parmas)
    }


    // let msg1 = `msg1`
    // let [str, setStr] = useState("msg1")
    let [str, setStr] = useState<string>("msg1")
    // let [brr, set_brr] = useState<Array<string>>(["aaa","bbb","ccc"])
    let [brr, set_brr] = useState(["aaa","bbb","ccc"])


    function change_str() {
        // msg1 += 666
        setStr(str += 666)
        console.log(`111---change_msg1:`, str)
        brr.push("ddd")
        // set_brr(brr)
        set_brr([...brr,"ddd"])
        console.log(`brr---brr:`,     brr        )
    }

    return (
        <>
            <div>
                {name}
            </div>

            <div>
                {<span>123</span>}
            </div>

            <div>
                {true}
            </div>

            <div>
                {/*{true ? "yes" : "no"}*/}
            </div>


            <div>
                {num1.toFixed(2)}
            </div>


            <div>
                {JSON.stringify(obj1)}
            </div>
            {/*<div onClick={func1(111)}>*/}
            {/*    点我*/}
            {/*</div>*/}

            <div onClick={() => func1(555)}>
                点我func1
            </div>

            <div onClick={() => func2(666)}>
                点我func2
            </div>


            <div className={`className ${css_test} aaa bbb`} id={name} onClick={() => func2(666)}>
                className,id
            </div>


            <div style={{color: "green"}} onClick={() => func2(666)}>
                style
            </div>

            <div dangerouslySetInnerHTML={{__html: html2}}></div>

            <div>{
                arr.map((v, i) => {
                    return <div key={i}>{v}</div>
                })
            }</div>


            <button onClick={() => change_str()}>change_str</button>
            <h1>{str}</h1>
            <h1>{brr}</h1>


        </>
    )
}

export default App
