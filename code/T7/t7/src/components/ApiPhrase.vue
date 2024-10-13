<template>
<div class="box">
    <div>
      <button @click="sortmethod=0" class="method">正序排列</button>
      <button @click="sortmethod=1" class="method">反序排列</button>
    </div>
    <template v-for="phrase in sortedPhrases" :key="phrase.sentence">
      <div class="pbox">
        <div class="phrase">{{phrase.sentence||0}}</div>
        <img src="../assets/good.svg" alt="upvote" class="upvote" @click="phrase.upnum++"/>
        <span>{{ '点赞数：'+phrase.upnum||0 }}</span>
      </div>
    </template>
</div>
</template>

<script setup>
import { ref, onMounted,computed} from 'vue';
import axios from 'axios';

var sortmethod=ref(0);

//请求数据
var phrases=ref([]);
class Sen {
  constructor(sentence, upnum) {
    this.sentence=sentence;
    this.upnum = upnum;
  }
}
onMounted(() => {
  const promises = []; 
  for (let i = 0; i < 10; i++) {
    promises.push(
      axios.get('https://tenapi.cn/v2/yiyan').then(res => {
        if (res.status === 200 && res.data) {
          const sen = new Sen(res.data, 0);
          phrases.value.push(sen); // 将新实例推入数组而不是直接赋值
          sortedPhrases;
        } else {
          console.error('API 返回数据失败:', res);
        }
      }).catch(err => {
        console.error('请求失败:', err.message);
      })
    );
  }

  Promise.all(promises).then(() => {
    console.log('所有请求完成');
  });
});

//排序数组
const sortedPhrases = computed(() => {
  if(sortmethod.value==0){
     return[...phrases.value].sort((a, b) => b.upnum - a.upnum);
  }
  else{
     return[...phrases.value].sort((a, b) => a.upnum - b.upnum);
  }

});

</script>


<style>
.box{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px; 
    border: 2px solid rgb(130, 110, 101);
    background-color: rgb(249, 246, 246);
    width: 800px;
    margin: 0 auto;
}

.pbox {
  display: flex;
  justify-content: center;
  vertical-align: middle;
  padding: 10px; 
  border: 2px solid rgb(130, 110, 101);
  background-color: rgb(250, 239, 233);
  width: 700px;
}

.method {
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
  padding: 10px; 
  border: 2px solid rgb(130, 124, 101);
  background-color: rgb(248, 250, 233);
  width: 723.64px;
  cursor: pointer;
}

.upvote {
  cursor: pointer; 
  width: 24px;  
  height: 24px;  
  margin: 10px;
}
</style>
