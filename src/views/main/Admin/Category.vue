<template>
	<div class="content">
		<slot name="breadcrumb"></slot>
		<div class="manage">
			<Tabs>
				<TabPane label="增加分类">
					<Form :model="CategoryInsert" :label-width="60">
						<FormItem label="标题">
							<Input v-model="CategoryInsert.title" placeholder="请输入分类标题" />
						</FormItem>
						<div>
							<Button type="success" long @click="CategoryInsertSubmit">提交</Button>
						</div>
					</Form>
				</TabPane>
				<TabPane label="分类列表">
					<Table border :columns="TableHeader" size="small" :data="CategoryList" :max-height="700" :height="700">
						<template slot-scope="{ row }" slot="name">
							<strong>{{ row.name }}</strong>
						</template>
						<template slot-scope="{ row, index }" slot="action">
							<Button type="primary" size="small" :style="{'font-size': '10px'}" style="margin-right: 5px" @click="CategoryListEdit(index)">修改</Button>
							<Button type="error" size="small" :style="{'font-size': '10px'}" @click="CategoryListRemove(index)">删除</Button>
						</template>
					</Table>
				</TabPane>
				<Modal
					v-model="CategoryEditModel"
					title="修改分类"
					@on-ok="CategoryEditSubmit"
					@on-cancel="CategoryEditModel = false">
						<Form :label-width="60" :model="CategoryEdit">
							<FormItem label="标题">
								<Input v-model="CategoryEdit.title" placeholder="请输入分类名称"/>
							</FormItem>
						</Form>
				</Modal>
				<Modal v-model="CategoryRemoveModel" width="360">
					<p slot="header" style="color:#f60;text-align:center">
						<Icon type="ios-information-circle"></Icon>
						<span>确认删除？</span>
					</p>
					<div style="text-align:center">
						<p>删除后数据将可能无法恢复.</p>
						<p>确定删除么?</p>
					</div>
					<div slot="footer">
						<Button type="error" size="large" long :loading="CategoryRemoveLoading" @click="CategoryRemoveSubmit">删除</Button>
					</div>
				</Modal>
			</Tabs>
		</div>
	</div>
</template>

<script>
	import {
		reqCategoryDelete,
		reqCategoryInsert,
		reqCategoryUpdate
	} from '../../../api'
	export default {
		name: "AdminCategory",
		data () {
			return {
				CategoryRemoveModel: false,
				CategoryEditModel: false,
				CategoryRemoveLoading: false,
				CategoryEdit: {},
				CategoryInsert: {},
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
				CategoryRemoveId: 0
			}
		},
		computed: {
			CategoryList () {
				return this.$store.state.CategoryList
			}
		},
		created() {
			this.$store.dispatch('getCategoryList')
		},
		mounted() {

		},
		methods: {
			CategoryListEdit(index) {
				this.CategoryEditModel = true
				this.CategoryEdit = this.CategoryList[index]
			},
			CategoryListRemove(index) {
				this.CategoryRemoveModel = true
				this.CategoryRemoveId = this.CategoryList[index].id
			},
			async CategoryRemoveSubmit() {
				this.CategoryRemoveLoading = true
				const result = await reqCategoryDelete({id: this.CategoryRemoveId})
				if (result.status === true) {
					this.$Message.success(result.msg)
					this.CategoryRemoveModel = false
					this.$store.dispatch('getCategoryList', {page: 1, limit: 999})
				} else {
					this.$Message.error(result.msg)
				}
				this.CategoryRemoveLoading = false
				this.CategoryRemoveId = 0
			},
			async CategoryEditSubmit() {
				const result = await reqCategoryUpdate(this.CategoryEdit)
				if (result.status === true) {
					this.$Message.success(result.msg)
					this.CategoryEditModel = false
					this.$store.dispatch('getCategoryList', {page: 1, limit: 999})
				} else {
					this.$Message.error(result.msg)
				}
				this.CategoryEdit = {}
			},
			async CategoryInsertSubmit() {
				const result = await reqCategoryInsert(this.CategoryInsert)
				if (result.status === true) {
					this.$Message.success(result.msg)
					this.$store.dispatch('getCategoryList', {page: 1, limit: 999})
				} else {
					this.$Message.error(result.msg)
				}
				this.reqCategoryInsert = {}
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