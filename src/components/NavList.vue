<template>

  <div class = "navlist">
    <nav>
    <tr>
      <td><a><router-link to ="/">国控监测站点历史数据</router-link ></a></td>
      <td><a><router-link to ="/Pro">省控监测站点历史数据</router-link ></a></td>
      <td><a><router-link to ="/Water">各监测站点水质历史数据</router-link ></a></td>
     </tr> 
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavList',
  data () {
    return {
      
    }
  }
}
</script>
<style>

nav{
		display:inline-block;
		background-color:#5597b4;
		box-shadow:0 1px 1px #ccc;
		border-radius:2px;
		width:100%;
	}

	nav a{
		display:inline-block;
		padding: 8px 60px;
		color:#fff !important;
		font-weight:bold;
		font-size:16px;
		text-decoration:none !important;
		line-height:1;
		text-transform: uppercase;
		background-color:transparent;

		-webkit-transition:background-color 0.25s;
		-moz-transition:background-color 0.25s;
		transition:background-color 0.25s;
	}
	a:hover{
	background-color: rgb(126,196,236);
	}
</style>

