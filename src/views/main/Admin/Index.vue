<template>
	<div class="content">
		<div class="dashboard">
			<ul>
				<li v-for="(item, index) in nav" :key="index">
					<router-link :to="item.to">
						<Icon :type="item.icon" :size="50" />
						<h4>{{ item.title }}</h4>
					</router-link>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	export default {
		name: "AdminIndex",
		data () {
			return {
				nav: [
					{
						icon: 'ios-albums-outline',
						title: '文章管理',
						to: 'Article'
					},
					{
						icon: 'ios-apps-outline',
						title: '分类管理',
						to: 'Category'
					},
					{
						icon: 'ios-bookmark-outline',
						title: '标签管理',
						to: 'Tag'
					}
				]
			}
		}
	}
</script>

<style scoped>
	.main .ivu-layout-content .container {
		width: 100%;
		margin: 0 0;
	}
	.main .ivu-layout-content .content {
		clear: both;
		position: relative;
	}
	.main .ivu-layout-content .content .dashboard {
		background: #FFFFFF;
		padding: 2rem;
	}
	.main .ivu-layout-content .content ul {
		list-style: none;
		width: 100%;
		overflow: auto;
	}
	.main .ivu-layout-content .content ul li {
		padding: 1rem;
		border: #555555 solid 1px;
		float: left;
		margin-left: 2rem;
	}
	.main .ivu-layout-content .content ul li:first-child {
		margin-left: 0;
	}
</style>