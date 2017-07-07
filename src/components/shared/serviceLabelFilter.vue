<template>
  <div class="sele_list">
    <div class="service_sum">
      <span class="sele_list_title">服务项目：</span>
      <ul class="sele_list_top sele_list_obj" >
        <li v-for="label in serviceLableList" @click="setActived(label.id, label.name)" :class="{selected_lable: label.id == actvielabelId}">
          <a href="javascript:;">{{label.name}}</a>
        </li>
      </ul>
    </div>
    <div class="service_more">
      <span class="sele_list_title">服务子项：</span>
      <ul class="sele_list_bottom sele_list_obj">
        <li v-for="(child, index) in childLableList" @click="setActivedChild(child.id, index)" :class="{selected_lable: child.id == actvieChildLabelId, sele_list_li: true}" v-if=' index <7 || (showMore & hasTwoRowsLabel & !childPackUp) '>
          <a href="javascript:;">{{child.name}}</a></li>
      </ul>
      <a class="omit_more load_more2" href="javascript:;" @click='childMore' v-if="showMore & hasTwoRowsLabel & childPackUp">更多</a>
      <a class="omit_more load_more1" v-if='showMore & hasTwoRowsLabel & !childPackUp' href="javascript:;" @click='childMore("up")'>收起</a>     
    </div>
    <div v-if="address" class="service_more service_address">
      <span class="sele_list_title">地点：</span>
      <ul class="sele_list_bottom sele_list_obj">
        <li v-for="(child, index) in areaList" @click="setActivedArea(child.area)" :class="{selected_lable:child.actived}" 
          v-if=' index <7 || (showMore & areaRowsLabel & !areaPackUp) '>
          <a href="javascript:;">{{child.area}}</a></li>
      </ul>
      <a class="omit_more load_more2" href="javascript:;" @click='more' v-if="showMore & areaRowsLabel & areaPackUp" >更多</a>
      <a class="omit_more load_more1" v-if='showMore & areaRowsLabel & !areaPackUp' href="javascript:;" @click='more("area")'>收起</a>     
    </div>
    <div class="list_checked_pop" v-if="hasService">
      <span class="sele_list_title">相关服务：</span>
      <div class="checked_pop_right">
      <div v-for="serviceDetail in serviceDetailList" class='selectService'>
      <mu-checkbox :label="serviceDetail.ServiceName" class="demo-checkbox" v-if="actvieChildLabelId == serviceDetail.labelId" v-model="serviceDetail.CheckFlag" @change="setSelectService(serviceDetail.ServiceId)"/>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import labelService from '@/services/labelService'
  import service from '@/services/service'
  export default {
    data () {
      return {
        childLableList: [],
        serviceLableList: [],
        serviceInfoList: [],
        serviceDetailList: [],
        areaList: [],
        actvielabelId: this.defaultLabel,
        actvieChildLabelId: this.defaultChildLabel,
        actviedArea: this.defaultArea,
        childPackUp: true,
        areaPackUp: true,
        hasService: false,
        editType: true
      }
    },
    props: {
      address: {},
      showMore: {},
      allShow: {},
      getSelectList: {},
      getSelectService: {},
      defaultLabel: {
        type: Number,
        default: 0
      },
      defaultChildLabel: {
        type: Number,
        default: 0
      },
      defaultArea: {
        type: String,
        default: ''
      },
      includeAllOption: {
        type: Boolean,
        default: true
      },
      checkPop: {
        type: Boolean,
        default: false
      },
      multiCheck: {
        type: Boolean,
        default: false
      }
    },
    created () {
      console.log('created')
      console.log(this.getSelectList)
      console.log('this.$options.props' + Date.now())
      console.log(this.$options)
      console.log(this.defaultLabel)
      console.log(this.defaultChildLabel)
      // console.log(this.$route.params.labelId)
      let _this = this
      service.getArea({includeAllOption: true}).then(response => {
        this.areaList = response.data
        console.log('this.areaList')
        console.log(this.areaList)
        this.actviedArea = this.areaList[0].area
//      this.areaList[0].actived = true
      })
      labelService.getServiceLabel({id: 0, includeChild: true, includeAllOption: this.includeAllOption})
        .then(response => {
          this.serviceLableList = response.data
          for (var i = 0; i < this.serviceLableList.length; i++) {
            if (this.serviceLableList[i].id === this.actvielabelId) {
              this.childLableList = this.serviceLableList[i].child
            }
          }
          for (var j = 0; j < this.childLableList.length; j++) {
            if (j > 6 && this.childLableList[j].id === this.actvieChildLabelId) {
              this.childPackUp = false
            }
          }
          console.log('1111111')
          console.log(this.childLableList)
        })
      if (this.checkPop === true) {
        service.getUploadServiceList({page: 0, pageNum: 0})
          .then(response => {
            this.serviceInfoList = response.data
            for (var i = 0; i < this.serviceInfoList.length; i++) {
              _this.serviceDetailList.push({
                ServiceId: _this.serviceInfoList[i].ServiceId,
                ServiceName: _this.serviceInfoList[i].ServiceName,
                ServiceUrl: _this.serviceInfoList[i].ServiceUrl,
                labelId: _this.serviceInfoList[i].labelId,
                CheckFlag: false
              })
            }
            if (this.getSelectList.length > 0) {
              var ServiceId = _this.getSelectList[0]
              _this.serviceInfoList.filter(function (item) {
                console.log('item.ServiceId')
                console.log(item.ServiceId)
                if (item.ServiceId === ServiceId) {
                  _this.serviceLableList.filter(function (label) {
                    label.child.filter(function (labelChild) {
                      if (item.labelId === labelChild.id) {
                        _this.setActived(label.id)
                        _this.setActivedChild(labelChild.id)
                      }
                    })
                  })
                }
              })
            }
          })
      }
    },
    mounted () {},
    computed: {
      hasTwoRowsLabel () {
        if (this.childLableList.length > 7) {
          return true
        } else {
          return false
        }
      },
      areaRowsLabel () {
        if (this.areaList.length > 7) {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      actvielabelId (val) {
        console.log('set actvielabelId' + val)
        for (var i = 0; i < this.serviceLableList.length; i++) {
          if (this.serviceLableList[i].id === val) {
            this.childLableList = this.serviceLableList[i].child
            console.log('console.log(childLableList)125')
            // this.actvieChildLabelId = this.childLableList[0].id
          }
        }
        this.sendNotice()
      },
      actvieChildLabelId (val) {
        console.log('set actvieChildLabelId' + val + '/' + this.actvieChildLabelId)
        console.log('console.log(childLableList)135')
        console.log('console.log(childLableList)135')
        var _this = this
        this.hasService = false
        if (this.checkPop === true && this.actvieChildLabelId > 0) {
          var newArr = this.serviceDetailList.filter(function (item) {
            return item.labelId === _this.actvieChildLabelId
          })
          if (newArr.length > 0) {
            this.hasService = true
          }
        }
        for (var j = 0; j < this.childLableList.length; j++) {
          if (j > 6 && this.childLableList[j].id === this.actvieChildLabelId) {
            this.childPackUp = false
          }
        }
        this.sendNotice()
      },
      actviedArea (val) {
        console.log('area' + val)
        console.log('area' + this.areaList)
        for (var i = 0; i < this.areaList.length; i++) {
          if (this.areaList[i].area === val) {
            this.$set(this.areaList[i], 'actived', true)
          } else {
            this.$set(this.areaList[i], 'actived', false)
          }
        }
        this.sendNotice()
      },
      defaultChildLabel (val) {
        console.log('service label defaultChildLabel' + val)
        setTimeout(() => {
          this.actvieChildLabelId = val
        }, 50)
      },
      defaultLabel (val) {
        console.log('service label defaultLabel' + val)
        this.actvielabelId = val
      },
      getSelectList (val) {
        console.log('watch')
        console.log(this.getSelectList)
        let _this = this
        if (this.getSelectList.length > 0) {
          var ServiceId = this.getSelectList[0]
          this.serviceInfoList.filter(function (item) {
            if (item.ServiceId === ServiceId) {
              _this.serviceLableList.filter(function (label) {
                label.child.filter(function (labelChild) {
                  if (item.labelId === labelChild.id) {
                    _this.setActived(label.id)
                    _this.setActivedChild(labelChild.id)
                  }
                })
              })
            }
          })
        }
      },
      getSelectService (val) {
        console.log('getSelectService')
        console.log(val)
        let _this = this
        this.serviceLableList.filter(function (label) {
          label.child.filter(function (labelChild) {
            if (val === labelChild.id) {
              _this.setActived(label.id)
              _this.setActivedChild(labelChild.id)
            }
          })
        })
      },
      $route (to, from) {
        if (to.path.indexOf('/service') !== -1 || to.path.indexOf('/docList') !== -1) {
          this.fetchData()
        }
      }
    },
    methods: {
      fetchData () {
        this.areaPackUp = true
        this.childPackUp = true
        this.actviedArea = '全部'
        this.actvielabelId = this.defaultLabel
        this.actvieChildLabelId = this.defaultChildLabel
      },
      sendNotice () {
        var labelId = -1
        if (this.actvieChildLabelId > 0) {
          labelId = this.actvieChildLabelId
        } else if (this.actvielabelId > 0) {
          labelId = this.actvielabelId
        }
        var areaName = ''
        if (this.actviedArea !== '全部') {
          areaName = this.actviedArea
        }
        var _this = this
        if (this.getSelectList !== undefined && this.getSelectList.length > 0 && this.editType === true) {
          this.serviceDetailList.filter(function (item) {
            _this.getSelectList.filter(function (selectItem) {
              if (item.ServiceId === selectItem) {
                console.log('selected')
                item.CheckFlag = true
                _this.editType = false
              }
            })
          })
          // this.editType = false
        }
        console.log('serviceDetailList')
        console.log(this.serviceInfoList)
        this.$emit('getServiceInfo', labelId, areaName)
      },
      setActived (val) {
        console.log(val)
        this.actvielabelId = val
        this.actvieChildLabelId = -1
      },
      setActivedChild (val) {
        this.actvieChildLabelId = val
      },
      setActivedArea (val) {
        this.actviedArea = val
      },
      childMore (val) {
        if (val !== 'up') {
          this.childPackUp = false
        } else {
          this.childPackUp = true
        }
      },
      more (val) {
        if (val !== 'area') {
          this.areaPackUp = false
        } else {
          this.areaPackUp = true
        }
      },
      close () {
        document.getElementsByClassName('list_checked_pop').style.display = 'none'
      },
      setSelectService (id) {
        let _this = this
        if (this.multiCheck === false) {
          for (var i = 0; i < this.serviceDetailList.length; i++) {
            if (id !== this.serviceDetailList[i].ServiceId && this.serviceDetailList[i].CheckFlag === true) {
              this.serviceDetailList[i].CheckFlag = false
            }
          }
        } else {
          var selectedService = this.serviceDetailList.filter(function (item) {
            return item.CheckFlag === true && item.labelId === _this.actvieChildLabelId && item.ServiceId !== id
          })
          console.log('selectedService')
          console.log(selectedService)
          if (selectedService.length === 0) {
            _this.serviceDetailList.filter(function (item) {
              if (item.labelId !== _this.actvieChildLabelId) {
                item.CheckFlag = false
              }
            })
          }
        }
        var selectService = this.serviceDetailList.filter(function (item) {
          return item.CheckFlag === true
        })
        this.$emit('setSelectService', selectService)
      }
    }
  }
</script>
<style>
.sele_list{
  background-color: #f4f4f4;
  width: 480px;
  position: relative;
}
.sele_list .service_sum,.service_more{
  clear: both;
  position: relative;
}
.sele_list_top{
  height: 40px;
  float:right;
}
.sele_list_obj li,.omit_more{
  float: left;
  margin:4px 2px;
  width: 94px;
  text-align: center;  
}
.sele_list_obj li a,.omit_more{
  display: block;
  line-height: 32px;
  color: #2d2d2d;
  height: 32px;
  overflow: hidden;
  font-size: 14px;
}
.sele_list_title{
  width: 72px;
  display: block;
  float: left;
  line-height: 32px;
  font-size: 14px;
  color: #898989;
  margin:4px 0 4px 6px;
  text-align: -webkit-auto;
}
.sele_list_bottom{
  float:right;
  width:392px;
}
/*选中后的状态*/
.sele_list_obj .selected_lable a,.omit_more{
  color: #fff;
  background-color: #ffaa00;
  border-radius:20px ;
}
.sele_list_obj  a:hover,.omit_more:hover{
  color: #fff;
  background-color: #ffbb33;
  border-radius:20px ;
}
.omit_more{
  position: absolute;
  right: 10px;
  top: 0;
  width: 74px;
  padding: 0 24px 0 14px;
}
.load_more1{
  background: #ffaa00 url(../../../static/image/service_omit.png) 50px center no-repeat;
}
.load_more2{
    background: #ffaa00 url(../../../static/image/service_more.png) 50px center no-repeat;
}
/*子组件弹*/
.sele_list .list_checked_pop{
  width:100%;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  z-index: 999;
  position: static;
  clear: both;
  padding-left: 0;
  float: left;
}
.pop2{
  top: 125px !important
}
.checked_pop_right{
  float:left;
  max-height: 112px;
  overflow-y: scroll;
  width: 396px;
  padding-top: 10px ;
}
.sele_list_title{
  width: 76px;
}
.sele_list .list_checked_pop .mu-checkbox,.sele_list .list_checked_pop .mu-checkbox-wrapper{
  height: 20px;
  line-height: 20px;
  margin-bottom: 10px;
}
</style>
