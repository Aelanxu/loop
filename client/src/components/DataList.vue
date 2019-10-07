<template>
  <div id="DataList">
    <div v-for='(item,index) in datalist'>
      <h4><router-link :to="`/data/pushdata/${item._id}`">{{item.apiName}}{{item.path}}</router-link></h4>
    </div>
    <p >{{userid}} </p>
    <input type="button" value="点击提交获取数据" @click="getdata()" />
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
<style lang="sass" scoped>

</style>