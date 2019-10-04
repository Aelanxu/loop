<template>
  <div id="DataList">
    <div v-for='(item,index) in datalist'>
      <h4>{{item.path}}</h4>
    </div>
    <p >{{id}} </p>
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
    props: ['id'],
  methods: {
    getdata() {
      let postData={userId:this.id, path:'/test/api',data:{n:111,MJ:'WWW',OBJ:{N:'TT'}}}
      this.axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: `${host}/api/push`,
        data: JSON.stringify(postData)
      }).then(response => {
         console.log(response);
        if (response.data) {
          this.datalist = JSON.parse(JSON.stringify(response.data));
          console.log(response.data);
        }
      });
    }
  }
};
</script>
<style lang="sass" scoped>

</style>