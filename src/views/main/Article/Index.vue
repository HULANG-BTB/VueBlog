<template>
  <div class="container">
    <div class="article">
      <div class="title">
        标题
      </div>
      <div class="tags">
        <ul>
          <li>标签1</li>
          <li>标签2</li>
          <li>标签3</li>
          <li>标签4</li>
        </ul>
      </div>
      <div class="content">
        {{ article.content }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data () {
      return {
        id: parseInt(this.$route.params.id)
      }
    },
    created() {
      this.$store.dispatch('getArticleInfo', {id: this.id})
    },
    computed: {
      article () {
        return this.$store.state.ArticleInfo
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
  .article .tags ul li:nth-child(8n-7) { background: #8A9B0F }
  .article .tags ul li:nth-child(8n-6) { background: #EB6841 }
  .article .tags ul li:nth-child(8n-5) { background: #3FB8AF }
  .article .tags ul li:nth-child(8n-4) { background: #FE4365 }
  .article .tags ul li:nth-child(8n-3) { background: #FC9D9A }
  .article .tags ul li:nth-child(8n-2) { background: #EDC951 }
  .article .tags ul li:nth-child(8n-1) { background: #C8C8A9 }
  .article .tags ul li:nth-child(8n) { background: #83AF9B }
  
  .article .content {
    margin-top: 2rem;
  }
  
  
</style>