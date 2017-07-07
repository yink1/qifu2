<template>
  <div>
    <input v-model="model"
           @click="open()"
           type="text"
           :class="inputClass" :readonly="readonly" v-if="showInput"/>

    <div v-show="show"
         class="cascading-address">
      <ul>
        <li v-for="item in provinces"
            @click="setProvince(item.p)"
            :class="{'label label-success': p === item.p}">
          {{ item.p }}
        </li>
      </ul>

      <ul v-show="cities.length">
        <li v-for="item in cities"
            @click="setCity(item.n)"
            :class="{'label label-success': c === item.n}">
          {{ item.n }}
        </li>
      </ul>

      <ul v-show="areas.length" v-if="!twoSelect">
        <li v-for="item in areas"
            @click="setArea(item.s)"
            :class="{'label label-success': a === item.s}">
          {{ item.s }}
        </li>
      </ul>

      <div v-show="p"
           class="address-area">
        <label class="text-success">
          <span class="text-muted">地址：{{ p }} {{ c }} {{ a }}</span>
        </label>
      </div>

      <div class="address-option-footer">
        <p class='date_btn'>
          <mu-flat-button slot="actions" @click="close" primary label="关闭"/>
          <mu-flat-button slot="actions" primary @click="clear" label="清空"/>
          <mu-flat-button slot="actions" primary @click="confirm" :disabled="!(p&&c) && p!='国外'" label="确定"/>
        </p>
        <!--<butmu-raised-buttonton @click="close()"
                class="btn btn-link btn-sm" label="关闭"/>
        <mu-raised-button @click="clear()"
                class="btn btn-default btn-sm" label="清空"/>
        <mu-raised-button @click="confirm()"
                class="btn btn-success btn-sm"
                :disabled="!(p&&c) && p!='国外'" label="确定"/>-->
      </div>
    </div>
  </div>
</template>
<style scoped>
.text-success .text-muted{
  float: none;
}
.cascading-address {
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  position: absolute;
  z-index: 99999;
  background: #fff;
  width: 318px;
}
.cascading-address ul {
  padding: 5px;
  border-bottom: 1px dotted #ddd;
  text-align: left;
}
.cascading-address ul li {
  font-size: 13px;
  list-style: none;
  display: inline-block;
  margin: 5px 7px;
  cursor: pointer;
}
.cascading-address .form-group {
  margin: 10px;
}
.address-area {
  margin: 10px;
  font-weight: bold;
  text-align: left;
}
.label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
.label-success {
  background-color: #5cb85c;
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.btn-link {
  font-weight: normal;
  color: #337ab7;
  border-radius: 0;
  background: none;
}
.btn-link:hover {
  color: #4cae4c!important;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.btn-sm:hover {
  color:#337ab7;
}
.text-success {
  color: #3c763d;
}
.address-option-footer {
  padding: 10px 15px;
  background-color: #FFFFFF;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  text-align: right;
}
.date_btn{
  width: 80%;
  margin-left: 25%;
}
.date_btn .mu-flat-button{
  min-width: 50px;
}
.mu-flat-button-label{
  padding-left: 0 !important;
  padding-right: 5px !important;
}
</style>
<script lang="babel">
  import addressData from '@/../static/cascadingAddressData.json'
  export default{
    props: {
      inputClass: String,
      readonly: Boolean,
      showInput: {
        type: Boolean,
        default: true
      },
      twoSelect: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        p: '',
        c: '',
        a: '',
        provinces: addressData,
        areas: '',
        cities: '',
        show: false
      }
    },
    computed: {
      model () {
        return this.p ? (this.p + ' ' + this.c + ' ' + this.a) : ''
      }
    },
    methods: {
      clear () {
        this.p = ''
        this.c = ''
        this.a = ''
        this.cities = []
        this.areas = []
      },
      open () {
        console.log('open!!')
        this.show = true
      },
      close () {
        this.show = false
      },
      confirm () {
        this.close()
        this.$emit('confirm', {
          province: this.p,
          city: this.c,
          area: this.a
        })
      },
      setProvince (p) {
        this.p = p
        this.c = ''
        this.a = ''
        this.areas = []
        // 根据选中的 p(省份) 值更新 cities(城市列表)
        var result = this.provinces.filter(function (v) {
          return v.p === p
        })
        this.cities = result[0].c || []
      },
      setCity (c) {
        this.c = c
        this.a = ''
        var result = this.cities.filter(function (v) {
          return v.n === c
        })
        this.areas = result[0].a || []
      },
      setArea (a) {
        this.a = a
      }
    }
  }
</script>
