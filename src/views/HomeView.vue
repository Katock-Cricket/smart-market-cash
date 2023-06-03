<template>

  <div class="wrap">
    <div v-if="before">
      <el-button size="large" type="primary" @click="this.start()" class="start-button">开始购物</el-button>
    </div>
    <div v-else>
      <el-menu default-active="1"
               class="el-menu-demo"
               mode="horizontal">
        <el-menu-item index="1" >CollabEdge无人超市</el-menu-item>
      </el-menu>
      <el-table :stripe="true" :data="this.list" class="el-table" table-layout="fixed" :key="this.flush">
        <el-table-column prop="name" label="商品" ></el-table-column>
        <el-table-column prop="quantity" label="数量" ></el-table-column>
        <el-table-column prop="subamount" label="价格(元）" ></el-table-column>
        <el-table-column label="操作">
          <el-button type="info">删除</el-button>
        </el-table-column>
      </el-table>
      <div style="margin-top: 3%" :key="this.flush">
        总计： {{this.total}} 元
      </div>
      <el-button style="margin-top: 10% ; float: right" type="primary" @click="this.pay()">支付</el-button>
    </div>
  </div>
  <el-dialog
    v-model="this.showConfirm"
    title="支付确认"
    center
    width="30%">
    <span>请确认支付信息:，总计{{this.total}}元</span>
    <el-image :src="this.userUrl" style="margin-top: 3%"></el-image>
    <h2 style="margin-left: 40%">{{this.userName}}</h2>
    <template #footer>
      <el-button size="large" type="primary" @click="this.confirm()">确认支付</el-button>
    </template>
  </el-dialog>
</template>

<script>
import {cashAxios}from "@/axios";
import {ElNotification} from "element-plus";
import {h} from "vue";
import Data from "@/views/Data";


export default {
  name: 'HomeView',
  components: {

  },
  setup(){

  },
  mounted() {
    // this.start()
    // this.initOffline()
  },
  data() {
    return {
      list: [],
      total: 0,
      flush: 0,
      before: true,
      timer: "",
      value: 0,
      userName: "王小明",
      userUrl: "https://bpic.51yuansu.com/pic3/cover/03/77/81/5c00e4f73741a_610.jpg",
      showConfirm: false,
      showComplete: false
    }
  },
  beforeUnmount() {
    window.clearInterval(this.timer.value);
  },
  methods: {
    initOffline(){
      this.list = Data.data
    },
    start(){
      this.before = false;
      this.timer = setInterval(this.getList, 3000)
      // cashAxios.post('start-sale', {}).then(res => {
      //   console.log("确认开始销售", res.data)
      //   this.timer = setInterval(this.getList, 1000)
      // })
    },
    getList(){
      cashAxios.post('get-sales-line-item', {}).then(res=>{
        console.log("刷新列表", res.data)
        this.list = res.data.sales_line_item_set;
        this.calcTotal();
        this.flush++;
      })
    },
    calcTotal(){
      this.total = 0;
      for(let p=0; p<this.list.length; p++){
        this.total += parseInt(this.list[p].subamount);
      }
      console.log("total: ", this.total)
    },
    pay(){
      cashAxios.post('check-user', {}).then(res=>{
        console.log("收到用户信息", res.data)
        this.userName = res.data.res
        this.showConfirm = true
      })
    },
    confirm(){
      this.showConfirm = false;
      this.list = []
      this.flush++;
      this.total = 0
      ElNotification({
        title: '支付成功',
        message: h('i', { style: 'color: teal' }, '谢谢惠顾'),
      })
    }
  }
}
</script>

<style>
.wrap{
  margin-right: auto;
  margin-left: auto;
  width: 60%;
  height: 100%;
}
.el-table{
  margin-top: 1%;
  width: 100%;
}
.start-button {
  margin-top: 20%;
  margin-left: 35%;
  font-size: 60px;
  border-radius: 10%;
  padding: 5%;
  width: 30%;
  height: 50%;
  margin-right: auto;
}
</style>
