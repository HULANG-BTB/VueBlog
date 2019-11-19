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
							<Select v-model="article.category" multiple :max-tag-count="4">
								<Option v-for="(item, index) in CategoryList" :value="item.id" :key="index">{{ item.title }}</Option>
							</Select>
						</FormItem>
						<FormItem label="标签">
							<Select v-model="article.tag" multiple :max-tag-count="4">
								<Option v-for="(item, index) in TagList" :value="item.id" :key="index">{{ item.name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="缩略图">
							<Upload
									action="/imgUpload/api/v2/upload"
									:headers="UploadHeader"
									accept="image"
									name="smfile"
									:format="['jpg','jpeg','png','gif']"
									@on-success="UploadSuccess"
							>
								<Button icon="ios-cloud-upload-outline">Select Image File To Upload</Button>
							</Upload>
						</FormItem>
						<mavon-editor
								v-model="article.content"
								:editable="true"
								previewBackground="none"
								:style="{'z-index': 0, 'border': 'none', 'padding': 0}"
								codeStyle="darcula"
								:ishljs="true"
						/>
						<div style="margin-top: 2rem">
							<Button type="success" long>提交</Button>
						</div>
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
				article: {},
				UploadHeader: {
					'Content-Type' : 'multipart/form-data',
					'Authorization': 'hyZPEM1gA7YxJxJXEeaRIk2iYz5YUrDD'
				}
			}
		},
		computed: {
			TagList () {
				return this.$store.state.TagList
			},
			CategoryList () {
				return this.$store.state.CategoryList
			}
		},
		created() {
			this.$store.dispatch('getCategoryList')
		},
		methods: {
			UploadSuccess(res) {
				console.log(res.data)
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
		text-align: left;
	}
</style>