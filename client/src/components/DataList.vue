<template>
  <div id="DataList">
    <div class="title">
      <h4>接口列表</h4>
      <router-link :to="`/data/pushdata/add`"> <span>新增接口</span></router-link>
      </div>
    <ul>
    <li v-for='(item,index) in datalist'>
     <span>{{index+1}}</span>
     <span>{{item.apiName}}</span>
     <span>{{item.path}}</span>
      <span>删除</span>
     <span><router-link :to="`/data/pushdata/${item._id}`">编辑</router-link></span>
    
    </li>
    </ul>
    <!-- <p >{{userid}} </p> -->
  
    
  </div>
</template>
<script>
import { host, localDate } from "../config.js"
import qs from'Qs'

export default {
  data() {
   
    return {
      datalist:[]
    }
  },
  mounted() {
  this.getdata()
  },
    props: ['userid'],
  methods: {
    getdata() {
     // let postData={userId:this.userid,apiName:'登录接口', path:'/test/api',data:{n:111,MJ:'WWW',OBJ:{N:'TT'}}}
      let postData={userId:this.userid}
      this.axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: `${host}/read`,
        data: JSON.stringify(postData)
      }).then(response => {
         console.log(response);
        if (response.data) {
          this.datalist = response.data;
          console.log(this.datalist );
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>

a{
  text-decoration:none;
  color:rgb(43, 42, 42);
   padding:0;
   margin: 0;
}
.title{
  width: 64%;
  height: 30px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgb(160, 157, 157);
}
.title h4{
   padding: 4px 0;
   display: block;
   height: 20px;
   float:left;
   width:80px;
   
    text-align:center;

}
.title span{
   float: right;
   display: block;
   height: 20px;
  padding: 4px 0;
   width:80px;
   background: rgb(50, 50, 51);
   color: white;

}
ul{
 
  display: block;
  padding:0;
  width: 80%;
}
ul li{

  border-bottom:1px solid rgb(167, 162, 162);
  display:block;
  width: 80%;
  height: 30px;
}
ul li span{
   padding: 4px 0;
   display: block;
   height: 20px;

}
ul li span:nth-child(1){
  float:left;
   width: 4%;
   color: red;
    text-align:center;
    line-height: 160%;
  
  color: rgb(37, 37, 37);
}
ul li span:nth-child(2){
  float:left;
  width: 30%;
  text-align: left;
  margin-left:2%;
}
ul li span:nth-child(3){
  float:left;
  width: 46%;
   text-align: left;
   line-height: 160%;
   margin-left:2%;
}
ul li span:nth-child(4){
  float:right;
  width: 8%;
}
ul li span:nth-child(5){
  float:right;
  width: 8%;
}
</style>