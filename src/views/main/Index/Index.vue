<template>
  <div class="container">
    <div class="banner">
      <Carousel loop arrow="hover" :height="230" :style="{width: '100%'}" autoplay :autoplay-speed="2500">
        <CarouselItem>
          <img src="../../../assets/img/banner-1.jpg" alt="">
        </CarouselItem>
        <CarouselItem>
          <img src="../../../assets/img/banner-2.jpg" alt="">
        </CarouselItem>
        <CarouselItem>
          <img src="../../../assets/img/banner-3.jpg" alt="">
        </CarouselItem>
        <CarouselItem>
          <img src="../../../assets/img/banner-4.jpg" alt="">
        </CarouselItem>
      </Carousel>
    </div>
    <div class="content">
      <template v-if="ArticleList">
        <Article v-for="(item, index) in ArticleList.data"
                 :key="index"
                 :info="item"
        >
        </Article>
      </template>
    </div>
    <div class="unselected more">
      <Spin size="large" v-if="loading"></Spin>
      <span v-else-if="page <= Math.floor(ArticleList.total / ArticleList.limit)" @click="loadMore">更多</span>
      <span v-else>没有更多了。。。</span>
    </div>
  </div>


</template>

<script>
  import Article from "../../../components/Article/Article"
  export default {
    name: "Index",
    data () {
      return {
        page: 1,
        limit: 10,
        loading: false
      }
    },
    created() {
      this.$store.commit('clear_article_list')
      this.fetchData()
    },
    computed: {
      ArticleList () {
        return this.$store.state.ArticleList
      }
    },
    methods: {
      async loadMore() {
        this.page += 1
        await this.fetchData()
      },
      async fetchData() {
        this.loading = true
        const {page, limit} = this
        await this.$store.dispatch('getArticleListByPaginator', {page, limit})
        this.loading = false
      }
    },
    components: {
      Article
    },
    watch: {
      $route () {
        this.page = 1
        this.limit = 10
        this.$store.commit('clear_article_list')
        this.fetchData()
      }
    }
  }
</script>

<style scoped>
  .main .ivu-layout-content .container {
    width: 100%;
    margin: 0 0;
  }
  .main .ivu-layout-content .banner img {
    width: 100%;
    height: 230px;
  }
  .main .ivu-layout-content .content {
    clear: both;
    position: relative;
  }
  .main .ivu-layout-content .more {
    margin-top: 1rem;
    position: relative;
    width: 45rem;
    height: 2rem;
    line-height: 2rem;
    background: #FFFFFF;
  }
  .main .ivu-layout-content .container .more {
    position: relative;
    height: 2rem;
    line-height: 2rem;
    transition: all .3s ease-in;
  }
  .main .ivu-layout-content .container .more:hover {
    background: rgba(150,150,150,0.1);
  }
</style>