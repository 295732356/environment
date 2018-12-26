<template>
  <div class="pro">
城市：
<el-select id ="city" size="medium" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in Citys"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        &nbsp&nbsp&nbsp站点：
    <el-cascader :options="NationName" v-model="selectedNationName" @change="handleChange"></el-cascader>
        &nbsp&nbsp选择日期：
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        
       <el-button>搜索</el-button>

       <el-button  type="primary" icon="document" @click="handleDownloadPro" :loading="downloadLoading">导出</el-button>
    <table border="1" width="100%">
       <tr>
         <th width="10%">站点</th>
         <th width="6%">NO2</th>
         <th width="6%">SO2</th>
         <th width="6%">CO</th>
         <th width="6%">O3</th>
         <th width="6%">PM10</th>
         <th width="6%">PM2.5</th>
         <th width="6%">质量指数</th>
         <th width="6%">状况</th>
         <th width="17%">主要污染物</th>
         <th width="14%">时间</th>
         <th width="10%">城市</th>

       </tr>
      <tr v-for="pro in ProAirData">
        <td>{{ pro.name }}</td>
        <td>{{ pro.no2 }}</td>
        <td>{{ pro.so2 }}</td>
        <td>{{ pro.co }}</td>
        <td>{{ pro.o3 }}</td>
        <td>{{ pro.pm10 }}</td>
        <td>{{ pro.pm25 }}</td>
        <td>{{ pro.quality }}</td>
        <td>{{ pro.cond }}</td>
        <td>{{ pro.mainpolo }}</td>
        <td>{{ pro.time }}</td>
        <td>{{ pro.city }}</td>
      </tr>
      <tr align="center">
        <td colspan = "12">
        <el-pagination
          layout="prev, pager, next"
          :total="ProAirData.length">
        </el-pagination>
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  name: 'Pro',
  data () {
    return {
     ProAirData: []

    }
  },
  methods:{
         handleDownload() {
         var date = new Date();
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('../vendor/Export2Excel')
          const tHeader = ['站点', 'NO2', 'SO2', 'CO', 'O3', 'PM10', 'PM2.5', '质量指数', '状况', '主要污染物', '时间', '城市']
          const filterVal = ['name', 'no2', 'so2', 'co', 'o3', 'pm10', 'pm25', 'quality', 'cond', 'mainpolo', 'time', 'city']
          const list = this.ProAirData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '省控监测站空气质量表')
          this.downloadLoading = false
        })
      },
  formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
     },
  created:function(){
  var url = this.HOST + "/strategyLibrary_war/proAir/getProAirAll"
  this.$axios.post(url)
  .then(res =>{
  this.ProAirData = res.data.content;
  console.log(res.data.ProAir);
  
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
