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
    <div class="more" @click="loadMore">
      更多
    </div>
  </div>


</template>

<script>
  import Article from "../../../components/Article/Article";
  export default {
    name: "Index",
    data () {
      return {
        page: parseInt(this.$route.params.page) || 1,
        limit: parseInt(this.$route.params.limit) || 15
      }
    },
    created() {
      this.$store.dispatch('getArticleList')
    },
    mounted() {
    
    },
    computed: {
      ArticleList () {
        return this.$store.state.ArticleList
      }
    },
    methods: {
      loadMore() {
        this.$router.push({name: 'Index', params: {
            page: this.page + 1,
            limit: this.limit
          }
        })
        this.page += 1
      }
    },
    components: {
      Article
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
</style>