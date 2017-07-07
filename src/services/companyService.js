  import { axiosGet, axiosPost } from '@/api/api'
  export default {
/**
 * 修改企业基本信息   api/company/editCompanyInfo
 */
    editCompanyInfo (params) {
      console.log('params')
      console.log(params)
      var editCompanyInfoUrl = '/api/company/editCompanyInfo'
      return axiosPost(editCompanyInfoUrl, params)
    },
    /**
     * 编辑主页信息   api/company/editHomepageInfo
     */
    editHomepageInfo (params) {
      var editHomepageInfoUrl = '/api/company/editHomepageInfo'
      return axiosPost(editHomepageInfoUrl, params)
    },
//  上传三证
    editCompanyCertification (params) {
      var editCompanyInfoUrl = '/api/company/editCompanyCertification'
      return axiosPost(editCompanyInfoUrl, params)
    },
    // 获取企业信息
    getCompanyInfo (params) {
      var getCompanyInfoUrl = 'api/company/companyInfo'
      return axiosGet(getCompanyInfoUrl, params)
    },
    // 获取服务商列表
    getCompanyList (params) {
      var getCompanyListUrl = 'api/company/companyList'
      return axiosGet(getCompanyListUrl, params)
    },
    // 获取服务商详情
    getHomepageInfo (params) {
      var getHomepageInfoUrl = 'api/company/homepageInfo'
      return axiosGet(getHomepageInfoUrl, params)
    }
  }
