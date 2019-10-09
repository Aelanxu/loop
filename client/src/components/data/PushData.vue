<template>
  <div id="pushdata">
    <div v-if="jsondata">
       <input type="text" v-model="jsondata.apiName" />
      <br>
      <input type="text" v-model="jsondata.path" />
    </div>
    <div>
      <textarea v-model="str" rows="30" cols="40"></textarea>
    </div>
    <button @click="updata()">提交</button>
  </div>
</template>
<script>
import { host, localDate } from "../../config.js";
import qs from "Qs";
export default {
  data() {
    return {
      jsondata: null,
      str: ""
    };
  },
  props: ["id"],
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      // let postData={userId:this.userid,apiName:'登录接口', path:'/test/api',data:{n:111,MJ:'WWW',OBJ:{N:'TT'}}}
      let postData = { _id: this.id };
      this.axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: `${host}/read`,
        data: JSON.stringify(postData)
      }).then(response => {
        console.log(response);
        if (response.data) {
          this.jsondata = response.data[0];
          // let {apiName,path,data}=  this.jsondata
          // this.apiName=apiName
          // this.path=path
          // this.data=JSON.stringify(data)
          console.log(this.jsondata);
          this.str = JSON.stringify(this.jsondata.data);
        }
      });
    },

    updata() {
      let postData = this.jsondata;
      postData.data = JSON.parse(this.str);
      if (this.id !== "") {
        this.axios({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "post",
          url: `${host}/updata`,
          data: JSON.stringify(postData)
        }).then(response => {
          if (response.data.msg==='success') {
              console.log('success')            
          }
        });
      }
    }
  }
};
</script>
<style lang="sass" scoped>

</style>