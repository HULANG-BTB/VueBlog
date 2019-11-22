<template>
  <div class="container">
    <template v-if="time">
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
        <span v-else-if="page < Math.floor(ArticleList.total / ArticleList.limit)" @click="loadMore">更多</span>
        <span v-else>没有更多了。。。</span>
      </div>
    </template>
    <template v-else>
      <div class="timeline" v-if="TimeLines">
        <ul v-for="(items, index) in TimeLines" :key="index">
          <div class="meta">
            <Icon type="md-locate" />
            {{ index }}
          </div>
          <li v-for="(item, index) in items" :key="index" @click="readMore(item)">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import Article from "../../../components/Article/Article";
  export default {
    name: "Time",
    data () {
      return {
        loading: false,
        page: 1,
        limit: 10
      }
    },
    computed: {
      ArticleList () {
        return this.$store.state.ArticleList
      },
      time () {
        return this.$route.params.time
      },
      TimeLines() {
        let ret = {}
        for (let item in this.ArticleList.data) {
          let row = this.ArticleList.data[item]
          let date = new Date(row.create_time)
          let index = `${date.getFullYear()}-${date.getMonth()+1}`
          if (!ret[index]) {
            ret[index] = []
          }
          ret[index].push(row)
        }
        return ret
      }
    },
    created() {
      this.$store.commit('clear_article_list')
      this.fetchData()
    },
    methods: {
      loadMore() {
        this.page += 1
        this.fetchData()
      },
      async fetchData() {
        this.loading = true
        const {page, limit, time} = this
        await this.$store.dispatch('getArticleListByTime', {page, limit, time})
        this.loading = false
      },
      readMore(item) {
        this.$router.push({name: 'Article', params: {
            id: item.id
          }
        })
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
  .main .ivu-layout-content .timeline {
    position: relative;
    background: #FFFFFF;
    padding: 2rem 1rem;
    text-align: left;
  }
  .main .ivu-layout-content .timeline ul {
    list-style: none;
    overflow: hidden;
    transition: all .3s ease-in-out;
    font-size: 1.2rem;
    position: relative;
  }
  .main .ivu-layout-content .timeline ul.active {
    height: 1.2rem;
  }
  .main .ivu-layout-content .timeline ul li {
    margin-left: 2rem;
    font-size: 0.9rem;
    transition: all .3s ease-in;
  }
  .main .ivu-layout-content .timeline ul li:hover {
    margin-left: 3rem;
    font-size: 1.1rem;
    color: #000000;
  }
  
</style>