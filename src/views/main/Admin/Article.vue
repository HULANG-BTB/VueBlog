<template>
	<div class="content">
		<slot name="breadcrumb"></slot>
		<div class="manage">
			<Tabs>
				<TabPane label="添加文章">
					<Form :model="ArticleInsert" :label-width="80">
						<FormItem label="标题">
							<Input v-model="ArticleInsert.title"/>
						</FormItem>
						<FormItem label="描述">
							<Input v-model="ArticleInsert.abstract"/>
						</FormItem>
						<FormItem label="分类">
							<Select v-model="ArticleInsert.category" >
								<Option v-for="item in CategoryList" :value="item.id" :key="item.title">{{ item.title }}</Option>
							</Select>
						</FormItem>
						<FormItem label="标签">
							<Select v-model="ArticleInsert.tags" multiple :max-tag-count="4">
								<Option v-for="(item, index) in TagList" :value="item.id" :key="index">{{ item.name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="缩略图">
							<Input v-model="ArticleInsert.thumbnail" placeholder="请点击上传或输入图片地址"/>
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
								v-model="ArticleInsert.content"
								:editable="true"
								previewBackground="none"
								:style="{'z-index': 0, 'border': 'none', 'padding': 0}"
								codeStyle="darcula"
								:ishljs="true"
						/>
						<div style="margin-top: 2rem">
							<Button type="success" long @click="ArticleAddSubmit">提交</Button>
						</div>
					</Form>
				</TabPane>
				<TabPane label="文章列表">
					<Table border :columns="TableHeader" size="small" :data="ArticleList" :max-height="700" :height="700">
						<template slot-scope="{ row }" slot="name">
							<strong>{{ row.name }}</strong>
						</template>
						<template slot-scope="{ row, index }" slot="action">
							<Button type="primary" size="small" :style="{'font-size': '10px'}" style="margin-right: 5px" @click="ArticleListEdit(index)">修改</Button>
							<Button type="error" size="small" :style="{'font-size': '10px'}" @click="ArticleListRemove(index)">删除</Button>
						</template>
					</Table>
				</TabPane>
				<Modal
					v-model="ArticleEditModel"
					:title="ArticleInfo.title"
					footer-hide
					fullscreen
					:loading="ArticleEditModelLoading"
				>
					<Form :model="ArticleEdit" :label-width="80">
						<FormItem label="标题">
							<Input v-model="ArticleEdit.title"/>
						</FormItem>
						<FormItem label="描述">
							<Input v-model="ArticleEdit.abstract"/>
						</FormItem>
						<FormItem label="分类">
							<Select v-model="ArticleEdit.category" >
								<Option v-for="(item, index) in CategoryList" :value="item.id" :key="index">{{ item.title }}</Option>
							</Select>
						</FormItem>
						<FormItem label="标签">
							<Select v-model="ArticleEdit.tags" multiple :max-tag-count="4">
								<Option v-for="(item, index) in TagList" :value="item.id" :key="index">{{ item.name }}</Option>
							</Select>
						</FormItem>
						<FormItem label="缩略图">
							<Input v-model="ArticleEdit.thumbnail" placeholder="请点击上传或输入图片地址"/>
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
							v-model="ArticleEdit.content"
							:editable="true"
							previewBackground="none"
							:style="{'z-index': 0, 'border': 'none', 'padding': 0}"
							codeStyle="darcula"
							:ishljs="true"
						/>
						<div style="margin-top: 2rem">
							<Button type="success" long @click="ArticleEditSubmit">提交</Button>
						</div>
					</Form>
				</Modal>
				<Modal v-model="ArticleRemoveModel" width="360">
					<p slot="header" style="color:#f60;text-align:center">
						<Icon type="ios-information-circle"></Icon>
						<span>确认删除？</span>
					</p>
					<div style="text-align:center">
						<p>文章删除后数据将可能无法恢复.</p>
						<p>确定删除么?</p>
					</div>
					<div slot="footer">
						<Button type="error" size="large" long :loading="ArticleRemoveLoading" @click="ArticleRemove">删除</Button>
					</div>
				</Modal>
			</Tabs>
		</div>
	</div>
</template>

<script>
	import {
		reqArticleInsert,
		reqArticleUpdate,
		reqArticleDelete
	} from '../../../api'
	export default {
		name: "Article",
		data () {
			return {
				ArticleInsert: {},
				ArticleEdit: {},
				UploadHeader: {
					'Content-Type' : 'multipart/form-data',
					'Authorization': 'hyZPEM1gA7YxJxJXEeaRIk2iYz5YUrDD'
				},
				TableHeader: [
					{
						title: 'ID',
						key: 'id',
						width: 80,
						align: 'center'
					},
					{
						title: '标题',
						key: 'title'
					},
					{
						title: '操作',
						align: 'center',
						slot: 'action',
						width: 130
					}
				],
				ArticleEditModel: false,
				ArticleRemoveModel: false,
				ArticleEditModelLoading: false,
				ArticleRemoveLoading: false,
				ArticleRemoveId: 0,
			}
		},
		computed: {
			TagList () {
				return this.$store.state.TagList
			},
			CategoryList () {
				return this.$store.state.CategoryList
			},
			ArticleList() {
				return this.$store.state.ArticleList.data
			},
			ArticleInfo() {
				return this.$store.state.ArticleInfo
			}
		},
		created() {
			this.$store.dispatch('getCategoryList')
			this.$store.dispatch('getArticleListByTime', {page: 1, limit: 999})
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
								that.ArticleInsert.thumbnail = res.data.data.url
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
			async ArticleAddSubmit() {
				const result = await reqArticleInsert(this.ArticleInsert)
				if (result.status === true) {
					this.$Message.success(result.msg)
					this.ArticleInsert = {}
				} else {
					this.$Message.error(result.msg)
				}
			},
			async ArticleListEdit(index) {
				this.ArticleEdit = {}
				this.ArticleEditModel = true
				this.ArticleEditModelLoading = true
				await this.$store.dispatch('getArticleInfo', {id: this.ArticleList[index].id})
				this.ArticleEdit = this.ArticleInfo
				let tags = []
				for (let item in this.ArticleInfo.tags) {
					tags.push(this.ArticleInfo.tags[item].id)
				}
				this.ArticleEdit.tags = tags
				this.ArticleEdit.category = this.ArticleEdit.category.id
				this.ArticleEditModelLoading = false
			},
			ArticleListRemove(index) {
				this.ArticleRemoveModel = true
				this.ArticleRemoveId = this.ArticleList[index].id
			},
			async ArticleEditSubmit() {
				const result = await reqArticleUpdate(this.ArticleEdit)
				if (result.status === true) {
					this.$Message.success(result.msg)
					this.ArticleEditModel = false
					this.$store.dispatch('getArticleListByTime', {page: 1, limit: 999})
				} else {
					this.$Message.error(result.msg)
				}
			},
			async ArticleRemove() {
				this.ArticleRemoveLoading = true
				const result = await reqArticleDelete({id: this.ArticleRemoveId})
				if (result.status === true) {
					this.$Message.success(result.msg)
					this.ArticleRemoveModel = false
					this.$store.dispatch('getArticleListByTime', {page: 1, limit: 999})
				} else {
					this.$Message.error(result.msg)
				}
				this.ArticleRemoveLoading = false
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