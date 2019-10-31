<template>
  <div class="calendar">
    <div class="toobar">
      <div class="prev" @click="prevMonth">
        <Icon type="ios-arrow-back" />
      </div>
      <div class="curr">{{ currentDate }}</div>
      <div class="next" @click="nextMonth">
        <Icon type="ios-arrow-forward" />
      </div>
    </div>
    <div class="weekday">
      <ul>
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>
    <div class="days">
      <ul>
        <li
          v-for="(item, index) in days"
          :key="index"
          class="item"
          :class="{disable:item.disable, active: item.active}"
          @dblclick="handleDateChange(item)"
        >
          {{ item.day }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Calendar",
    data() {
      return {
        year: 1970,
        month: 1,
        day: 1,
        days: []
      }
    },
    props: {
      date: {
        type: Date,
        default() {
          return new Date();
        }
      }
    },
    methods: {
      prevMonth() {
        this.month -= 1
        if (this.month < 1) {
          this.month = 12
          this.year -= 1
        }
        this.buildDays()
      },
      nextMonth() {
        this.month += 1
        if (this.month > 12) {
          this.month = 1
          this.year += 1
        }
        this.buildDays()
      },
      buildDays() {
        this.days = []
        const monthNormal = [31,28,31,30,31,30,31,31,30,31,30,31];
        const monthLeep = [31,29,31,30,31,30,31,31,30,31,30,31];
        let month = []
        let thisMonth = []
        let preYear = this.year
        let preMonth = this.month - 2

        if (preMonth < 0) {
          preMonth = 11;
          preYear -= 1;
        }
        if ( (preYear % 100 !== 0 && preYear % 4 === 0) || (preYear % 400 === 0)) {
          month = monthLeep
        } else {
          month = monthNormal
        }
        if ( (this.year % 100 !== 0 && this.year % 4 === 0) || (this.year % 400 === 0)) {
          thisMonth = monthLeep
        } else {
          thisMonth = monthNormal
        }
        let weekFirst = new Date(this.year, this.month-1, 1).getDay()
        let weekLast = new Date(this.year, this.month-1, thisMonth[this.month-1]).getDay()
        for(let i = 1; i <= weekFirst; i++) {
          this.days.push({
            day: month[preMonth] - weekFirst + i ,
            disable: true
          })
        }
        for (let i = 1; i <= month[this.month-1]; i++) {
          this.days.push({
            day: i,
            disable: false,
            active: this.date.getFullYear() === this.year && this.month-1 === this.date.getMonth() && i === this.date.getDate()
          })
        }
        for (let i = weekLast; i < 6; i++) {
          this.days.push({
            day: i - weekLast + 1,
            disable: true
          })
        }
      },
      handleDateChange(item) {
        if (item.disable === false) {
          this.$emit('onChange', new Date(this.year, this.month-1, item.day))
        }
      }
    },
    created() {
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      this.day = this.date.getDate();
      this.buildDays()
    },
    computed: {
      currentDate() {
        return `${this.year}年${this.month}月${this.day}日`
      }
    }
  }
</script>

<style scoped>
  .calendar {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    background: #FFFFFF;
    padding: 0.8rem;
  }
  .calendar .toobar {
    position: relative;
  }
  .calendar .toobar .prev {
    width: 2rem;
    padding: 0.2rem 0.5rem;
    margin-right: 1rem;
    display: inline-block;
    background: rgba(50,50,50,0.2);
    transition: all .3s ease-in;
  }
  .calendar .toobar .prev:hover {
    background: rgba(50,50,50,0.4);
  }
  .calendar .toobar .curr{
    padding: 0.2rem 0;
    width: 8.9rem;
    display: inline-block;
    text-align: center;
  }
  .calendar .toobar .next {
    width: 2rem;
    margin-left: 1rem;
    padding: 0.2rem 0.5rem;
    background: rgba(50,50,50,0.2);
    display: inline-block;
    transition: all .3s ease-in;
  }
  .calendar .toobar .next:hover {
    background: rgba(50,50,50,0.4);
  }
  .calendar .weekday {
    padding: 0.4rem 0.45rem;
  }
  .calendar .weekday ul {
    list-style: none;
    overflow: auto;
  }
  .calendar .weekday ul li {
    float: left;
    width: 2rem;
    text-align: center;
  }
  .calendar .days {
    margin-top: 0.2rem;
    padding: 0 0.4rem;
  }
  .calendar .days ul {
    list-style-type: none;
    overflow: auto;
  }
  .calendar .days ul li {
    float: left;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    transition: all .3s ease-in;
  }
  .calendar .days ul li.disable {
    color: rgba(0,0,0,0.3);
  }
  .calendar .days ul li.item {
    border-radius: 1rem;
  }
  .calendar .days ul li.active {
    color: #000000;
    font-weight: bold;
    background: rgba(0,0,0,0.2);
  }
  .calendar .days ul li:not(.disable):hover {
    background: rgba(0,0,0,0.2);
  }
  
  
</style>