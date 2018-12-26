import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home"
import Pro from "../components/Pro"
import Water from "../components/Water"



Vue.use(VueRouter)
export default new VueRouter({

	routes:[
	{
		path:"/",
		component:Home
	},{
		path:"/pro",
		component:Pro
	},{
		path:"/water",
		component:Water
	}
	]
})