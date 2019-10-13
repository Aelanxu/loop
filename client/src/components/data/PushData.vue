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
    <button @click="dealData()">提交</button>
  </div>
</template>
<script>
import { host, localDate } from "../../config.js";
import qs from "Qs";
export default {
  data() {
    return {
      jsondata:{
        apiName:'',
        path:''
      },
      str: ""
    };
  },
  props: ["id"],
  mounted() {
    if(this.id!=='add'){
    this.getdata(this.id)
    }
  
  },
  methods: {
   
    dealData(){
      console.log(this.id)
      if(this.id==='add'){
        this.insertData()
        console.log('===')
      }else{
        //this.updata()
      }
    },
    //get data from aip 
    getdata(id) {
      let postData = { _id:id };
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
      let postData = this.jsondata
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
    },
     insertData() {
      let postData = this.jsondata
          if(this.str){
             postData.data = JSON.parse(this.str);
          }
         
          console.log(postData)  
        this.axios({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "post",
          url: `${host}/push`,
          data: JSON.stringify(postData)
        }).then(response => {
          if (response.data.length>0) {
              console.log('success')            
          }
           console.log(response)   
           
        });
    
    }


  }
};
</script>
<style lang="sass" scoped>

</style>