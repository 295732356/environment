<template>
  <div class="water">
城市：
<el-select id ="city" size="medium" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in Citys"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        
        
       <el-button>搜索</el-button>

       <el-button  type="primary" icon="document" @click="handleDownloadWater" :loading="downloadLoading">导出</el-button>
    <table border="1" width="100%">
       <tr>
         <th width="10%">站点</th>
         <th width="6%">水质级别</th>
         <th width="10%">更新时间</th>
         <th width="6%">溶解氧(mg/L)</th>
         <th width="8%">高锰酸盐指数(mg/L)</th>
         <th width="6%">氨氮(mg/L)</th>
         <th width="6%">PH</th>
         <th width="6%">城市</th>

       </tr>
       <tr v-for="water in Waters">
       <td>{{water.name}}</td>
       <td>{{water.lv}}</td>
       <td>{{water.time}}</td>
       <td>{{water.o2}}</td>
       <td>{{water.kmn}}</td>
       <td>{{water.no}}</td>
       <td>{{water.ph}}</td>
       <td>{{water.city}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Water',
  data () {
    return {
     Waters: [],
     downloadLoading:false,
     Citys: [{
          value: 'hefei',
          label: '合肥'
        }],
        value: ''     
    }
  },
  methods:{
         handleDownloadWater() {
         var date = new Date();
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('../vendor/Export2Excel')
          const tHeader = ['站点', '水质级别', '更新时间', '溶解氧（mg/L）', '高锰酸盐指数(mg/L)', '氨氮(mg/L)', 'PH', '城市']
          const filterVal = ['name', 'lv', 'time', 'o2', 'kmn', 'no', 'ph', 'city']
          const list = this.Waters
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '水质监测站数据')
          this.downloadLoading = false
        })
      },
  formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
     },
  created:function(){
  var url = this.HOST + "/strategyLibrary_war/water/getWaterAll"
  this.$axios.post(url)
  .then(res =>{
  this.Waters = res.data.content;
  
  })
  .catch(error =>{
  console.log(error);
  })
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
