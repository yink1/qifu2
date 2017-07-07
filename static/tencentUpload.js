var classId = '76920'
var hostUrl = 'http://qifuapi.thinkwit.com'
var secretId = 'AKIDKDLHesOLKVjgzeA71ueEoyUXNqhpLuFH'

export function uploadVideo (upBtnId, isTranscode, isWatermark, transcodeNotifyUrl, vm) {
  var  $ = qcVideo.get('$')
  , ErrorCode = qcVideo.get('ErrorCode')
  , Log = qcVideo.get('Log')
  , JSON = qcVideo.get('JSON')
  , util = qcVideo.get('util')
  , Code = qcVideo.get('Code')
  , Version = qcVideo.get('Version')
  ;

  //api 当前浏览器是否支持上传
  if (ErrorCode.UN_SUPPORT_BROWSE !== qcVideo.uploader.init(
    //1: 上传基础条件
    {
    web_upload_url: 'http://vod.qcloud.com/v2/index.php',
    secretId: secretId, // 云api secretId
    //secretKey: secretKey,
    //云api secretKey : 选填参数 （secretKey不能暴露给外部用户，建议只在内部系统使用该参数）
    getSignature: function(argStr,done){
        //注意：出于安全考虑， 服务端接收argStr这个参数后，需要校验其中的Action参数是否为 "MultipartUploadVodFile",用来证明该参数标识上传请求
        $.ajax({
            'dataType': 'json',
            'url': hostUrl + '/api/uploadVideo/getSignature?args=' + encodeURIComponent(argStr),
            'success': function (d) {
                done(d['result']);
            }
        });
    },
      
    //after_sha_start_upload: true,//sha计算完成后，开始上传 (默认非立即上传)
    //sha1js_path: '../Scripts/3.0/calculator_worker_sha1.js', //计算sha1的位置
    upBtnId: upBtnId, //上传按钮ID（任意页面元素ID）
    forceH5Worker: true, // 强制用H5计算
    isTranscode: isTranscode,//是否转码
    isWatermark: isWatermark,//是否设置水印
    disable_multi_selection: false, //禁用多选 ，默认为false
    transcodeNotifyUrl: 'http://qifuapi.thinkwit.com' + transcodeNotifyUrl,//(转码成功后的回调地址)isTranscode==true,时开启； 回调url的返回数据格式参考  http://www.qcloud.com/wiki/v2/MultipartUploadVodFile
    classId: classId,
    filters: { max_file_size: '1gb', mime_types: ['avi', 'rmvb', 'wmv', 'mp4'], video_only: true },// mime_types, 默认是常用的视频和音频文件扩展名，如MP4, MKV, MP3等, video_only 默认为false，可允许音频文件上传
    sha1js_path: '../static/calculator_worker_sha1.js',
  }
  //2: 回调
  ,{
    /**
     * 更新文件状态和进度
     * param args { id: 文件ID, size: 文件大小, name: 文件名称, status: 状态, percent: 进度 speed: 速度, errorCode: 错误码,serverFileId: 后端文件ID }
     */
    onFileUpdate: function (args) {
    //计算SHA中
    if (args.code == 1 || args.code == 3) {
      vm.videoFileId = 'compute';
    }
    else if (args.code == 2) //计算完SHA
    {
      //计算完SHA值，准备开始上传，这步执行完之后才能执行即上传操作
      qcVideo.uploader.startUpload();
      vm.videoFileId = 'compute';
    }
    else if (args.code == 5)//上传中
    {
      //获取实时进度
      var percent = args.percent + '%';
      vm.videoFileId = 'compute';
    }
    else if (args.code == 6)//上传完成
    {
      //取得回调的视频serverFileId
      vm.videoFileId = args.serverFileId;
      // return videoFileId;
    }
  },
    /**
     * 文件状态发生变化
     * param info  { done: 完成数量 , fail: 失败数量 , sha: 计算SHA或者等待计算SHA中的数量 , wait: 等待上传数量 , uploading: 上传中的数量 }
     */
    onFileStatus: function (info) {
    },
    /**
     *  上传时错误文件过滤提示
     * param args {code:{-1: 文件类型异常,-2: 文件名异常} , message: 错误原因 ， solution: 解决方法}
     */
    onFilterError: function (args) {
      if (args.code == -3)
      {
        alert('上传视频不能大于1G！');
      }
      else
      {
        alert(args.message);
      }
    }
  }
  )) {
  }
}
