document.write(" <script language=\"javascript\" src=\"http://qzonestyle.gtimg.cn/open/qcloud/video/h5/h5connect.js\" > <\/script>");

export function videoPlay (id, vodId, appId, width, height) {
var option = {
      "auto_play": "0",
      "file_id": vodId,
      "app_id": appId,
      "definition" : 30,
      "width": width,
      "height": height
}

var player = new qcVideo.Player(
    id,
    option,
    function (e) {
      if (e === 'playing') {
      } else if (e === 'playEnd') {
      } else if (e === 'suspended') {
      }
    }
)
  // let player = new qcVideo.Player('id_video_container', {"auto_play":"0","file_id":"9031868222983402553","app_id":"1251742132","width":1920,"height":1080})
  return player
}
