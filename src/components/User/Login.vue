<template>
	<div class="container">
		<div class="content">
			<div class="login">
				<div class="title">登录</div>
				<div class="form">
					<Form :model="LoginData">
						<FormItem>
							<Input v-model="LoginData.username" placeholder="Username" type="text"></Input>
						</FormItem>
						<FormItem>
							<Input v-model="LoginData.password" placeholder="Password" type="password"></Input>
						</FormItem>
						<FormItem>
							<Button type="primary" @click="submit">登录</Button>
							<Button	style="margin-left: 8px" @click="reset">重置</Button>
						</FormItem>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				LoginData: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			submit () {
				this.$store.dispatch('getUserInfo', this.LoginData)
			},
			reset() {
				this.LoginData.username = ''
				this.LoginData.password = ''
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
	.main .ivu-layout-content .content .login {
		background: #FFFFFF;
		padding: 2rem;
	}
	.main .ivu-layout-content .content .login .form {
		margin: 0 auto;
		width: 50%;
	}
	.main  .ivu-layout-content .container .login .title {
		margin: 1rem auto;
		text-align: center;
		font-size: 1.7rem;
		font-weight: bold;
	}
</style>