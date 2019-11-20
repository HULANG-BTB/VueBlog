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
							<Input v-model="article.abstract"/>
						</FormItem>
						<FormItem label="分类">
							<Select v-model="article.category" >
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
									action="/upload/api/v2/upload"
									:headers="UploadHeader"
									name="smfile"
									:format="['jpg','jpeg','png','gif']"
									:before-upload="HandleBeforeUpload"
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
							<Button type="success" long @click="AddArticleSubmit">提交</Button>
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
	import {
		reqArticleInsert
	} from '../../../api'
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
			HandleBeforeUpload(file) {
				let UploadData = new FormData()
				UploadData.append('smfile', file)
				let that = this
				return new Promise(async function (resolve, reject) {
					await that.$axios.post('/upload/api/v2/upload', UploadData)
						.then((res) => {
							if (res.data.success === true) {
								that.$Message.success({content: res.data.message, duration: 8, closable: true})
								that.article.thumbnail = res.data.data.url
								resolve(res.data)
							} else {
								that.$Message.error({content: res.data.message, duration: 8, closable: true})
								reject(res)
							}
					})
						.catch((res) => {
							that.$Message.error({content: '上传文件错误', duration: 8, closable: true})
							reject(res)
						})
				})
			},
			async AddArticleSubmit() {
				console.log(this.article)
				const result = await reqArticleInsert(this.article)
				console.log(result)
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