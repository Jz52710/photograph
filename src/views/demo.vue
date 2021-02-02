<template>
    <div class="box">
        <!--        <div class="an" @click="next"></div>-->
        <div class="qr-code-box" ref="imageToFile">
            <!--            <vue-qr :logoSrc="config.logo" :text="config.value" class="qr-code-pic" :correctLevel="3" :margin="0"-->
            <!--                    :dotScale="0.5"></vue-qr>-->
            <img :src="config.logo" alt="">
            <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
            <button type="button" class="shot-btn" @click="screenShot">截图</button>

            <img :src="img" v-if="img"/>
        </div>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas'
    // import VueQr from 'vue-qr';
    export default {
        data () {
            return {
                videoWidth: 300,
                videoHeight: 220,
                config: {
                    value: '',
                    logo: require('../assets/logo.png')
                },
                img: ""
            }
        },
        computed: {
            html2canvas,
            // VueQr
        },
        methods: {
            next(){
                this.$router.push('public')
            },
            screenShot() {
                html2canvas(this.$refs.imageToFile, {
                    width: 150,
                    height: 110,
                    x:100,
                    y:100
                }).then((canvas) => {// 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
                    this.img = canvas.toDataURL('image/png');
                    console.log('img-----',this.img)
                })
            },

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
        },
        mounted () {
            this.config.value = "https://www.baidu.com/";
        },
        // beforeMount(){
        //
        // },
        beforeDestroy () {

        }
    }

</script>

<style scoped>
    .box{
        width: 100%;
        height: 100%;
        position: absolute;
        /*background: rebeccapurple;*/
        /*background: url("../assets/img/b1.png") no-repeat ;*/
        background-size: cover;
    }
    .an{
        width: 150px;
        height: 60px;
        background: black;
        position: absolute;
        bottom: 19%;
        right: 29%;
        /*border-radius: 50%;*/
    }
</style>
