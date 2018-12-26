<template>
    <div class = "Home">
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
    <el-cascader :options="NationName" v-model="selectedNationName"></el-cascader>
        &nbsp&nbsp选择日期：
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        
       <el-button>搜索</el-button>

       <el-button  type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出</el-button>  


    <table border="1" width="100%">
       
       <tr>
         <th width="13%">站点</th>
         <th width="6%">NO2</th>
         <th width="6%">SO2</th>
         <th width="6%">CO</th>
         <th width="5%">O3</th>
         <th width="5%">PM10</th>
         <th width="5%">PM2.5</th>
         <th width="6%">质量指数</th>
         <th width="6%">状况</th>
         <th width="21%">主要污染物</th>
         <th width="12%">时间</th>
         <th width="8%">城市</th>
      </tr>
      <tr v-for="test in NationAirData">
        <td>{{ test.name }}</td>
        <td>{{ test.no2 }}</td>
        <td>{{ test.so2 }}</td>
        <td>{{ test.co }}</td>
        <td>{{ test.o3 }}</td>
        <td>{{ test.pm10 }}</td>
        <td>{{ test.pm25 }}</td>
        <td>{{ test.quality }}</td>
        <td>{{ test.cond }}</td>
        <td>{{ test.mainpolo }}</td>
        <td>{{ test.time }}</td>
        <td>{{ test.city }}</td>
      </tr>
    </table>
    </div>
</template>

<script>
import Service from '../api/nation.js';

export default {
  name: 'Home',
  data () {
    return {
      NationAirData:[],
      downloadLoading:false,
      currentPage:1,
      
        Citys: [{
          value: 'hefei',
          label: '合肥'
        }, {
          value: 'huaibei',
          label: '淮北'
        }, {
          value: 'bozhou',
          label: '亳州'
        }, {
          value: 'suzhou',
          label: '宿州'
        }, {
          value: 'bengbu',
          label: '蚌埠'
        }, {
          value: 'fuyang',
          label: '阜阳'
        }, {
          value: 'huainan',
          label: '淮南'
        }, {
          value: 'chuzhou',
          label: '滁州'
        }, {
          value: 'luan',
          label: '六安'
        }, {
          value: 'maanshan',
          label: '马鞍山'
        }, {
          value: 'wuhu',
          label: '芜湖'
        }, {
          value: 'xuancheng',
          label: '宣城'
        }, {
          value: 'tonglin',
          label: '铜陵'
        }, {
          value: 'chizhou',
          label: '池州'
        }, {
          value: 'anqin',
          label: '安庆'
        }, {
          value: 'huangshan',
          label: '黄山'
        }],
        value: '',
        selectedNationName: [],
        value6: ''
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
          const list = this.NationAirData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '空气质量表')
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
     },
  created:function(){
  var url = this.HOST + "/strategyLibrary_war/nationAir/getNationAirAll"
  this.$axios.post(url)
  .then(res =>{
  this.NationAirData = res.data.content;
  console.log(res.data.content);
  
  })
  .catch(error =>{
  console.log(error);
  })
}

}
</script>

<style>
th{
  border:none;
  background-color: rgb(246,246,246);
}
</style>
