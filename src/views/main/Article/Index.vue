<template>
  <div class="container">
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="article">
      <div class="title">
        {{ article.title }}
      </div>
      <div class="tags">
        <ul>
          <li
            v-for="(item, index) in article.tags"
            :key="index"
            @click="routeToTag(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="content">
        <mavon-editor
          v-model="article.content"
          :boxShadow="false"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false"
          defaultOpen="preview"
          previewBackground="none"
          :style="{'border': 'none', 'padding': 0}"
          codeStyle="darcula"
          :ishljs="true"
        />
      </div>
    </div>
    <div class="meta">
      <div class="item">
        <p>发表时间：{{ article.create_time }}</p>
      </div>
      <div class="item">
        <p>最后修改：{{ article.update_time }}</p>
      </div>
      <div class="item">
        <p>文章地址：<a href="javascript:;">https://oibit.cn/Article/{{ article.id }}</a> </p>
      </div>
      <div class="item">
        <p>转载声明：自由转载-转载请注明来源，且不可作为商业用途 </p>
      </div>
      <div class="item">
        <p>免责声明：本博客部分内容来自于互联网，并不代表博主本人观点，若涉及侵权，请联系删除！ </p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Article",
    data () {
      return {
        id: parseInt(this.$route.params.id),
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      article () {
        return this.$store.state.ArticleInfo
      }
    },
    methods: {
      routeToTag(item) {
        this.$router.push({name: 'Tag', params: {
            tag: item.name
          }
        })
      },
      async fetchData() {
        this.loading = true
        await this.$store.dispatch('getArticleInfo', {id: this.id})
        this.loading = false
      }
    },
    watch: {
      $route () {
        this.fetchData()
      }
    }
  }
</script>

<style scoped>
  .article {
    background: #FFFFFF;
    padding: 2rem 2em;
  }
  .article .title {
    margin: 1rem auto;
    text-align: center;
    font-size: 1.7rem;
    font-weight: bold;
  }
  .article .tags {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .article .tags:after {
    content: ' ';
    clear: both;
  }
  .article .tags ul {
    list-style: none;
    overflow: auto;
  }
  .article .tags ul li {
    margin-right: 0.4rem;
    line-height: 1.2rem;
    padding: 0.1rem 0.5rem;
    float: left;
    transition: all .3s ease-in;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 0.8rem;
  }
  .article .tags ul li:hover {
    border-radius: 0;
  }
  .article .tags ul li:nth-child(8n-7) {
    background: #8A9B0F
  }
  .article .tags ul li:nth-child(8n-6) {
    background: #EB6841
  }
  .article .tags ul li:nth-child(8n-5) {
    background: #3FB8AF
  }
  .article .tags ul li:nth-child(8n-4) {
    background: #FE4365
  }
  .article .tags ul li:nth-child(8n-3) {
    background: #FC9D9A
  }
  .article .tags ul li:nth-child(8n-2) {
    background: #EDC951
  }
  .article .tags ul li:nth-child(8n-1) {
    background: #C8C8A9
  }
  .article .tags ul li:nth-child(8n) {
    background: #83AF9B
  }
  .article .content {
    margin-top: 0;
  }
  
  .meta {
    margin-top: 1rem;
    background: #FFFFFF;
    padding: 1rem 2em;
  }
  .meta .item {
    text-align: left;
    font-size: 0.9rem;
    margin: 0.2rem 0;
  }
  .meta .item p {
  
  }
  
  
</style>