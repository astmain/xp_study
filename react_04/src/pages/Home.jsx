import React from 'react'
import { Button } from 'antd'
function name(params) {
    console.log('111---:', 111)
}
const Home = () => {
  // return <h1>这是主页</h1>;
  return (
    <div>
      <h1>这是主页</h1>;
      <Button type="primary" onClick={name}>
        点击我
      </Button>
    </div>
  )
}

export default Home
