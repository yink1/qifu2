<template>
  <div id='serviceHistoryList'>
    <div class='blankCon' v-if='dataInfo.data.length < 1'>
      <img src='../../../static/image/icon/blank.png' />
      <h5>空空如也,去看看别的吧!</h5>
    </div>
    <div class="blankService" v-else>
    <div class="services_data" v-for="index in dataInfo.data">
      <div class="service_left"><img :src="index.picUrl" alt=""></div>
      <div class="service_right">
        <h2 class="datpage_title">{{index.serviceName}}</h2>
        <p class="datpage_intro">{{index.introduce}}</p>
        <div class="public_user">
          <img src="../../../static/image/icon/conpanyattr.png"/>
          <span>{{index.companyName}}</span>
        </div>
      </div>
      <div class="datpage_center">
        <mu-raised-button class="demo-raised-button datpage_btn1" label="查看详情" labelPosition="after" primary>
          <img src="../../../static/image/icon/detail.png" class="button_pics"/>
        </mu-raised-button><br/>
        <mu-raised-button class="demo-raised-button datpage_btn2" label="咨询TA" labelPosition="after" @click="open">
          <img src="../../../static/image/icon/tele_white.png" class="button_pics"/>
        </mu-raised-button> 
      </div>
    </div> 
    <div class="requirement_box" v-if="dialog"></div>
    <div class="dialog" v-if="dialog">
      <div class="require_content">             
        <a href="javascript:;" @click="close" class="close_dialog">
          <img src="../../../static/image/del.png"/>
        </a>
        <requirement></requirement>
      </div>
    </div>
    <div class="clearfix">      
      <mu-pagination class="fr requetHistoryListPage" :pageSize="pageSize" :total="dataInfo.count" :current="current" @pageChange="handleClick">
      </mu-pagination>
      </div>
  </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import requirement from '@/components/shared/requirement'
  export default {
    data () {
      return {
        current: 1,
        dialog: false,
        pageSize: 3,
        dataInfo: {
          'msg': 'ok',
          'count': 20,
          'data': [{
            'companyId': '公司id',
            'companyName': '企服圈',
            'serviceId': '服务id',
            'picUrl': '../../../static/image/forward.jpg',
            'serviceName': '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
            'introduce': '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
            'favoriteFlag': '是否收藏'
          },
          {
            'companyId': '公司id',
            'companyName': '企服圈',
            'serviceId': '服务id',
            'picUrl': '../../../static/image/forward.jpg',
            'serviceName': '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
            'introduce': '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
            'favoriteFlag': '是否收藏'
          },
          {
            'companyId': '公司id',
            'companyName': '企服圈',
            'serviceId': '服务id',
            'picUrl': '../../../static/image/forward.jpg',
            'serviceName': '从垂直到扩展:卢杰的紫色医疗经历了什么-21世纪经济报道',
            'introduce': '医投领英移动医疗全民创业的火爆甚至直接影响了未来五年(2015-2020)的全国医疗卫生服务体系规划纲要。规划从2014年10月开始公开征求意见,而在正式版中不仅将"信息资源配置"独立成节',
            'favoriteFlag': '是否收藏'
          }
          ]
        }
      }
    },
    created () {},
    mounted () {},
    computed: {},
    methods: {
      handleClick (newIndex) {
      },
      open () {
        this.dialog = true
        $('body,html').css('overflow', 'hidden')
      },
      close () {
        this.dialog = false
        $('html,body').css('overflow', 'auto')
      }
    },
    components: {
      requirement
    }
  }
</script>
<style>
  .blankService .mu-pagination-item {
    color: #000;
}
.blankService{
  min-height:522px;
}
</style>
