<template>
<div>
  <ul class="dabnt_cata">
    <!--(datitle_ppt/ppt),(datitle_excel/excel),(datitle_txt/txt),(datitle_pdf/pdf),(datitle_word/word)-->
    <li class="datitle_ppt" :class="{ datitle_ppt: docList.format == 'ppt' || docList.format == 'pptx',datitle_pdf: docList.format == 'pdf', datitle_txt: docList.format == 'txt', datitle_word: docList.format == 'doc' || docList.format == 'docx', datitle_excel: docList.format == 'xls' || docList.format == 'xlsx'}">
      <h3 class="dabnt_catatle" @click="toDetail(docList.id)">{{docList.title}}</h3>
      <div class="cata_content">
        <a href="javascript:;" class="cata_conup">{{likeCount}}<span class="cata_effect">+1</span></a>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
  import favoriteService from '@/services/favoriteService'
  export default {
    props: ['docList'],
    data () {
      return {
        likeCount: 0,
        unLikeCount: 0
      }
    },
    created () {
      this.get()
    },
    methods: {
      get () {
        favoriteService.GetLike({objectId: this.docList.id})
        .then(response => {
          console.log('GetLike response')
          console.log(response.data)
   //          点赞数赋值
          this.likeCount = response.data.likeCount
        })
      },
      toDetail (val) {
        this.$router.push({name: 'docDetail', params: {docId: val}})
      }
    }
  }
</script>

