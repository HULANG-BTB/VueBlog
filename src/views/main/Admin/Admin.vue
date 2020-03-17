<template>
	<div>
		<div class="Login" v-if="!UserInfo.username">
			<Login></Login>
		</div>
		<router-view v-else>
			<div class="breadcrumb" slot="breadcrumb">
				<Breadcrumb>
					<BreadcrumbItem to="/Admin">后台首页</BreadcrumbItem>
					<BreadcrumbItem>{{ meta.title }}</BreadcrumbItem>
				</Breadcrumb>
			</div>
		</router-view>

	</div>
</template>

<script>
	import Login from "../../../components/User/Login";
	export default {
		name: "Admin",
		mounted() {

		},
		computed: {
			UserInfo () {
				return this.$store.state.UserInfo
			},
			meta () {
				return this.$route.meta
			}
		},
		components: {
			Login
		}
	}
</script>

<style scoped>

</style>