<template>
  <div class="right">
    <div class="search">
      <Select
        v-model="keyword"
        filterable
        remote
        allow-create
        :loading="loading">
        <Option v-for="(option, index) in options" :value="option.value" :key="index">{{option.label}}</Option>
      </Select>
    </div>
    <Calendar :date="currentDate" @onChange="handleDateChange"></Calendar>
    <div class="tags">
      <div class="title">标签云</div>
      <div class="tag-list">
        <ul>
          <li
            v-for="(item, index) in tagList"
            :key="index"
            @click="routeToTag(item)"
          >
            {{ `${item.name} [ ${item.count} ]` }}
            
          </li>
        </ul>
      </div>
    </div>
    
  </div>

</template>

<script>
  import Calendar from "../Calendar/Calendar";
  export default {
    name: "Aside",
    data () {
      return {
        keyword: '',
        loading: false,
        options: [],
        currentDate: new Date()
      }
    },
    components: {
      Calendar
    },
    created() {
      if (this.$route.params.time) {
        this.currentDate = new Date(this.$route.params.time)
      }
    },
    methods: {
      handleDateChange(date) {
        this.currentDate = date
        this.$router.push({name: 'Time', params: {
            time: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
          }
        })
      },
      routeToTag(item) {
        this.$router.push({name: 'Tag', params: {
            tag: item.name
          }
        })
      }
    },
    computed: {
      tagList() {
        return this.$store.state.TagList
      }
    }
  }
</script>

<style scoped>
  .right {
    margin: 0 0;
    text-align: left;
  }
  .right>div {
    margin-top: 1rem;
  }
  .right>div:first-child {
    margin-top: 0;
  }
  .right .search {
    position: relative;
    padding: 0.8rem;
    background: #FFFFFF;
    width: 16.5rem;
  }
  .right .tags {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    padding: 0.8rem;
    background: #FFFFFF;
    width: 16.5rem;
  }
  .right .tags .title {
    position: relative;
    width: 14.9rem;
    padding-bottom: 0.7rem;
    margin-bottom: 0.2rem;
  }
  .right .tags .title:after {
    content: ' ';
    background-color: #C7C7C7;
    width: 4rem;
    height: 0.2rem;
    position: absolute;
    bottom: 0rem;
    left: 0;
    transition: all .3s ease-in;
  }
  .right .tags:hover .title:after {
    width: 10rem;
  }
  .right .tags .tag-list:after {
    content: ' ';
    clear: both;
  }
  .right .tags .tag-list ul {
    overflow: auto;
    list-style-type: none;
  }
  .right .tags .tag-list ul li {
    padding: 0.2rem 0.4rem;
    float: left;
    margin: 0.3rem 0.2rem;
    background: rgba(0,0,0, 0.2);
    transition: all .3s ease-in;
    border-radius: 0;
  }
  .right .tags .tag-list ul li:hover {
    border-radius: 1rem;
    background: rgba(0,0,0,0.4);
  }
  
</style>