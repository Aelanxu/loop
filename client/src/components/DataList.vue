<template>
  <div id="DataList">
    <div v-for="(item,index) in datalist">
      <h4>{{index}}- {{item}}</h4>
    </div>

    <input type="button" value="点击提交获取数据" @click="getdata()" />
  </div>
</template>
<script>
import { host, localDate } from "../config.js";
import axios from "axios";
export default {
  data() {
    return {
      datalist:[]
    }
  },
  mountd() {},
  methods: {
    getdata() {
      axios({
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "post",
        url: `${host}/api/login`,
        data: {
          userName: "admin",
          pwd: "123456",
          type: "1",
          createTime: localDate()
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            ret = ret.replace(/&$/, ""); //字串后面多余的"&"
            return ret;
          }
        ]
      }).then(response => {
        if (response.data.data) {
          this.datalist = JSON.parse(JSON.stringify(response.data.data));
          console.log(response.data.data);
        }
      });
    }
  }
};
</script>
<style lang="sass" scoped>

</style>