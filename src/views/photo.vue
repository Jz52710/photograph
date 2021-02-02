<template>
  <div class="camera_outer" ref="imageToFile">
    <div class="img-box"></div>
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>
    <!--        <img src="../assets/img/jing.png" alt="" class="bg_r_img"/>-->
    <div v-if="imgSrc" class="img_bg_camera">
      <img v-if="loding"  :src="imgSrc" alt="" class="tx_img">
    </div>
    <div class="font-box">{{times}}</div>
    <div class="bt-left" @click="fix"></div>
    <div class="bt-right" @click="remake"></div>
<!--    <div class="bt-right" @click="goto">跳页面</div>-->
  </div>
</template>
<script>

  import AV from 'leancloud-storage'
  // import html2canvas from "html2canvas";
  var APP_ID = 'Eta9AT6VkmU64zloR2B2SGdp-gzGzoHsz'
  var APP_KEY = '61xiHiqwwAvGODyzBnJlxl54'

  AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
    serverURL:'https://eta9at6v.lc-cn-n1-shared.com',
  })

  export default {
    data () {
      return {
        videoWidth: 300,
        videoHeight: 220,
        imgSrc: '',
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
        loding:true,
        // validTip: '验证中'
        timer:null,
        times:15,
        file:'',
        imgjt:'',
      }
    },
    computed: {
    },
    methods: {
      goto(){
        this.$router.push({name:'image',query:{path:'http://lc-eta9at6v.cn-n1.lcfile.com/2sdAcQQbYab3kgyMMceHC0ceXknCqrXY/p.png'}})
      },
      /*
       *@author wf_Huang
       *@Time 2019/6/5 0005 17:35
       *@function  调用权限
       *****************************************/
      getCompetence () {
        var _this = this
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        this.thisVideo = document.getElementById('videoCamera')
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function () {
            _this.thisVideo.play()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*
       *@author wf_Huang
       *@Time 2019/6/5 0005 17:32
       *@function  绘制图片
       *****************************************/
      setImage () {
        var _this = this
        // 点击，canvas画图
        _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
        // 获取图片base64链接
        console.log( '================',this.thisCancas);
        var image = this.thisCancas.toDataURL('image/png')
        _this.imgSrc = image
        console.log( '================',image);
        let a = this.dataURLtoFile(image,'url')
        console.log('aaaa',a)
        this.file = this.dataURLtoFile(image,'url')
        // let b = this.getObjectURL(a)
        // console.log('bbb',b)
        // let blobURL = window.URL.createObjectURL(a);
        // console.log('123',blobURL)
        this.$emit('refreshDataList', this.imgSrc)
        this.loding = true
      },
      /*
       *@author wf_Huang
       *@Time 2019/6/5 0005 17:44
       *@function  base64转文件
       *****************************************/
      dataURLtoFile (dataurl, filename) {
        var arr = dataurl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        // while (n--) {
        //     u8arr[n] = bstr.charCodeAt(n)
        // }
        return new File([u8arr], filename, { type: mime })
      },
//     getObjectURL(file) {
//     var url = null;
//     if (window.createObjectURL !== undefined) { // basic
//         url = window.createObjectURL(file);
//     } else if (window.URL !== undefined) { // mozilla(firefox)
//         url = window.URL.createObjectURL(file);
//     } else if (window.webkitURL !== undefined) { // webkit or chrome
//         url = window.webkitURL.createObjectURL(file);
//     }
//     return url;
// },
      /*
       *@author wf_Huang
       *@Time 2019/6/10 0010 3:41
       *@function  关闭摄像头
       *****************************************/
      stopNavigator () {
        this.thisVideo.srcObject.getTracks()[0].stop()
      },
      //截图
      // screenShot() {
      //   html2canvas(this.$refs.imageToFile, {
      //     width: window.innerWidth,
      //     height: 240,
      //     y:100,
      //     useCORS:true
      //   }).then((canvas) => {// 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      //     this.imgjt = canvas.toDataURL('image/png');
      //     console.log('imgjt-----',this.imgjt)
      //   })
      // },
      //  确认,发送
      fix(){
        const data = { base64: this.imgSrc };
        // resume.txt 是文件名
        const file = new AV.File('p.png', data);
        console.log('file---',file)
        file.save().then((file) => {
          console.log(`文件保存完成。objectId：${file.id}`);
        }, (error) => {
          // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
          console.log(error)
        });
        console.log(13)
        //跳转
        // setTimeout(()=>{
        //   this.$router.push('qr')
        // },2000)
        this.$router.push('qr')
      },
      //  重拍
      remake(){
        console.log(99999)
        this.times = 15
        this.timer = setInterval(()=>{
          this.times--
          console.log(this.times);
          if(this.times===0){
            this.setImage()
            clearInterval(this.timer)
          }
        },1000)
        this.loding = false
        setTimeout(()=>{
          console.log(3);
          this.setImage()
          console.log(4)
        },15000);
      }
    },
    mounted () {
      this.getCompetence();
      this.timer = setInterval(()=>{
        this.times--
        // console.log(this.times);
        if(this.times===0){
          this.setImage()
          clearInterval(this.timer)
        }
      },1000)
    },
    // beforeMount(){
    //
    // },
    beforeDestroy () {
      this.stopNavigator()
    }
  }

</script>
<style scoped>
  .camera_outer{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background: url("../assets/img/b3.png") no-repeat center;
    background-size: 100%;
  }
  video,canvas,.tx_img{
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /*top: 29%;*/
    /*left: 10%;*/
    width:80%;
    height:38%;
  }
  /*框框*/
  .img-box{
    width: 96%;
    height: 70%;
    background: url("../assets/img/k.png") no-repeat center;
    background-size: 100%;
    position: absolute;
    /*top: 16%;*/
    /*left: 4%;*/
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9;
  }
  .bt-left{
    width: 50%;
    height: 50%;
    /*background: black;*/
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    /*bottom: 16%;*/
    /*left: 22%;*/
  }
  .bt-right{
    width: 50%;
    height: 50%;
    /*background: pink;*/
    position: absolute;
    right: 0;
    bottom: 0;
    /*bottom: 16%;*/
    /*right: 22%;*/
    text-align: center;
    color:#fff;
    line-height: 50px;
    z-index: 10;
  }

  .img_bg_camera{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

  }
  img{
    width: 100%;
    height: 100%;
  }
  .img_btn_camera{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(0,0,0,0.3);
    color: #ffffff;

  }
  .loding_img{
    width: 50px;
    height: 50px;
  }
  .font-box{
    position: absolute;
    top: 0%;
    left: 0%;
    font-size: 24px;
    color: white;
  }

</style>


