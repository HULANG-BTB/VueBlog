<template>
  <article>
    <div class="thumbnail">
      <a @click="read">
        <img v-lazy="article.thumbnail" alt="article.thumbnail">
      </a>
    </div>
    <div class="context">
      <div class="header">
        <h2 class="title">
          <a @click="read"> {{ article.title }} </a>
        </h2>
      </div>
      <div class="abstract unselected">
        <p>{{ article.abstract }}</p>
      </div>
      <div class="footer">
        <div class="meta">
          <ul>
            <li class="time">
              <Icon type="ios-time" />
              <Time :time="article.create_time" />
            </li>
            <li class="view">
              <Icon type="ios-eye" />
              {{ article.view }}
            </li>
            <li class="comment">
              <Icon type="md-chatbubbles" />
              {{ article.comment }}
            </li>
            <li class="heart">
              <Icon type="ios-heart" />
              {{ article.like }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="category unselected">{{ article.category.title }}</div>
  </article>
</template>

<script>
  export default {
    name: "Article",
    data () {
      return {
        id: this.info.id
      }
    },
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      read () {
        this.$router.push({name: 'Article', params: {
            id: this.id
          }
        })
      },
      dateTimeToTimeStamp (dateTime) {
        return new Date(dateTime).getTime()
      }
    },
    computed: {
      article () {
        return this.info
      }
    }
  }
</script>

<style scoped>
  article:before {
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    background: none;
    content: ' ';
    position: absolute;
    transition: all .4s ease-in-out;
    z-index: 1;
  }
  article:hover:before {
    width: 45rem;
    height: 10rem;
    border-top: 0.1rem rgba(150,150,150,0.1) solid;
    border-left: 0.1rem rgba(150,150,150,0.1) solid;
  }
  article:after {
    width: 0;
    height: 0;
    right: 0;
    bottom: 0;
    background: none;
    content: ' ';
    position: absolute;
    transition: all .4s ease-in-out;
    z-index: 1;
  }
  article:hover:after {
    width: 45rem;
    height: 10rem;
    border-right: 0.1rem rgba(150,150,150,0.1) solid;
    border-bottom: 0.1rem rgba(150,150,150,0.1) solid;
  }
  article {
    margin-top: 15px;
    position: relative;
    width: 45rem;
    padding: .5rem;
    height: 10rem;
    overflow: hidden;
    background: #FFFFFF;
    transition: all .3s ease-in;
    z-index: 10;
  }
  article:hover {
    background: rgba(150,150,150,0.1);
  }
  article .thumbnail {
    float: left;
    width: 11.5rem;
    height: 9rem;
    overflow: hidden;
    position: absolute;
    padding: 6px;
    z-index: 11;
  }
  article .thumbnail img {
    position: absolute;
    top: 0;
    left: 0;
    width: 12rem;
    height: 9rem;
    font-size: 0;
    border-radius: 3px;
    transition: all .3s ease-in;
  }
  article:hover .thumbnail img {
    transform: translateX(-6px);
  }
  article .category {
    position: absolute;
    top: 0.8rem;
    left: -1.2rem;
    width: 5rem;
    height: 1.2rem;
    line-height: 1.2rem;
    transform: rotate(-45deg);
    background: rgba(100%, 800%, 100%, 0);
    z-index: 11;
    color: rgba(100%, 800%, 100%, 0);
  }
  article:hover .category {
    background: rgba(10%, 80%, 10%, 0.5);
    transition: all .3s linear;
    color: #000000;
  }
  article .context {
    float: right;
    position: relative;
    width: 31.5rem;
    height: 9rem;
    overflow: hidden;
    z-index: 11;
  }
  article .context .header {
    top: 0;
    left: 0;
    text-align: left;
    line-height: 0.9rem;
  }
  article .context .header h2.title a {
    position: absolute;
    font-weight: bold;
    font-size: 0.9rem;
    color: #2c3e50;
    text-align: left;
    transition: all .3s ease-in;
  }
  article .context .header h2.title:hover a {
    transform: translateX(5px);
    color: #000000;
    text-decoration: underline;
  }
  article .context .abstract {
    margin: 0.6rem 0;
    position: absolute;
    top: 1rem;
    left: 0;
  }
  article .context .abstract p {
    text-indent: 2em;
    text-align: left;
    font-size: 0.7rem;
    text-overflow: ellipsis;
    white-space: normal;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
  article .context .footer {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  article .context .footer .meta {
    float: left;
  }
  article .context .footer .meta ul {
    list-style: none;
  }
  article .context .footer .meta ul li{
    margin-left: 1rem;
    float: left;
    text-align: left;
    font-size: .6rem;
  }
  article .context .footer .meta ul li:first-child {
    margin-left: 0;
  }
  article .context .footer .meta ul li .ivu-icon {
    margin-right: 0.5rem;
  }
  article .context .footer .meta ul li.category {
    width: 4rem;
  }
  article .context .footer .meta ul li.time {
    width: 8rem;
  }
  article .context .footer .meta ul li.comment {
    width: 5rem;
  }
  article .context .footer .meta ul li.view {
    width: 5rem;
  }
  article .context .footer .meta ul li.heart {
    width: 5rem;
  }
</style>