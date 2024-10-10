<template>
<div class="box">
    <div class="pbox">
        <div class="phrase">{{sentence}}</div>
        <img src="..\assets\good.svg" alt="upvote" class="upvote" @click="upnum++"/>
        <span>{{ '点赞数：'+upnum }}</span>
    </div>
</div>
</template>

<script setup>
// import axios from 'axios';
import { ref, onMounted } from 'vue';
import axios from 'axios';

//点赞功能
var upnum=ref(0);

//请求数据
var sentence=ref("数据未能成功获得");
onMounted(() => {
  axios.get('https://tenapi.cn/v2/yiyan').then(
    res => {
      if (res.status === 200 && res.data) {
        sentence.value=`${res.data}`;
        // sentence.value ='请求成功';
      } else {
        console.error('API 返回数据失败:', res);
        sentence.value ='请求失败1';
      }
    },
    err => {
      console.error('请求失败:', err.message);
      sentence.value ='请求失败2';
    }
  );
});
</script>

<style>
.box{
    display: flex;
    align-items: center;  
    justify-content: center;
    padding: 10px; 
    border: 2px solid rgb(130, 110, 101);
    background-color: rgb(249, 246, 246);
    width: 800px;
    margin: 0 auto;
}

.pbox {
  display: flex;
  align-items: center;  
  justify-content: center;
  padding: 10px; 
  border: 2px solid rgb(130, 110, 101);
  background-color: rgb(250, 239, 233);
  width: 700px;
  justify-content: center;
}

.upvote {
  cursor: pointer; 
  width: 24px;  
  height: 24px;  
  margin: 10px;
}
</style>
