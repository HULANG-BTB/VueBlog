<template>
	<div class="content">
		<slot name="breadcrumb"></slot>
		<div class="manage">
			<Tabs>
				<TabPane label="添加文章">
					<Form :model="article" :label-width="80">
						<FormItem label="标题">
							<Input v-model="article.title"/>
						</FormItem>
						<FormItem label="描述">
							<Input v-model="article.title"/>
						</FormItem>
						<FormItem label="分类">
							<Input v-model="article.title"/>
						</FormItem>
						<FormItem label="标签">
							<Input v-model="article.title"/>
						</FormItem>
						<FormItem label="缩略图">
							<Input v-model="article.title"/>
						</FormItem>
						<FormItem label="内容">
							<Input v-model="article.title"/>
						</FormItem>
					</Form>
				</TabPane>
				<TabPane label="文章列表">文章列表</TabPane>
				<TabPane label="回收站">回收站</TabPane>
			</Tabs>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Article",
		data () {
			return {
				article: {}
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
		background: #FFFFFF;
		padding: 2rem;
	}
	.main .ivu-layout-content .content .breadcrumb {
		margin: 0;
		text-align: left;
		font-size: 0.5rem;
	}
	.main .ivu-layout-content .content .manage {
		margin-top: 1rem;
	}
</style>