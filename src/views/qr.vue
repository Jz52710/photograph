<template>
    <div class="box">
        <!--        <div class="an" @click="next"></div>-->
        <input id="text" type="text" :value=urltext style="width:80%"/>
        <div id="qrcode" style="" class="qr-box" />
        <div class="font-box">{{times}}</div>
    </div>
</template>

<script>
    import AV from 'leancloud-storage'
    var APP_ID = 'Eta9AT6VkmU64zloR2B2SGdp-gzGzoHsz'
    var APP_KEY = '61xiHiqwwAvGODyzBnJlxl54'

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY,
        serverURL:'https://eta9at6v.lc-cn-n1-shared.com',
    })

    import QRCode from "@/qrcode/qrcode.min.js"

    export default {
        data () {
            return {
                url:'',
                urltext:'',
                urlleft:'http://lc-Eta9AT6V.cn-n1.lcfile.com/7c700d9d849a597bd7e9.html/images.html',
                times:30,
                look:true
            }
        },
        computed: {
        },
        methods: {
            next(){
                this.$router.push('photo')
            }
        },
        mounted () {
            //拿取数据
            const query = new AV.Query('_File');
            console.log("query111",query)
            query.limit(200);
            query.addAscending('createdAt');
            // query.include('attachments');
            query.find().then((todos) => {
                console.log("todossuoyou++",todos)
                // console.log("todos-1",todos[todos.length-1])
                this.url = todos[todos.length-1].attributes.url
                console.log("data===",this.url)
                this.urltext = this.urlleft + '?path=' + this.url
                console.log('url----',this.urltext)
            })


            //二维码
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                width : 370,
                height : 370,
            });

            var inputField = document.getElementById("text");

            function makeCode () {
                if (!inputField.value) {
                    inputField.focus();
                    return;
                }

                qrcode.makeCode(inputField.value);
            }

            makeCode();

            inputField.addEventListener("keydown", (e) => {
                if (e.keyCode == 13) {
                    makeCode();
                }
            });
            inputField.addEventListener("blur", makeCode);

            this.timer = setInterval(()=>{
                this.times--
                // console.log(this.times);
                if(this.times===0){
                    this.urltext = ''
                    this.$router.push('/')
                    clearInterval(this.timer)
                }
            },1000)
            //锁
            // this.look = false
            // this.look = true
        },


        // beforeMount(){
        //
        // },
        // beforeDestroy () {
        //
        // }
        destroyed() {
            this.urltext=''
        }
    }

</script>

<style scoped>
    .box{
        width: 100%;
        height: 100%;
        position: absolute;
        /*background: rebeccapurple;*/
        background: url("../assets/img/b4.png") no-repeat ;
        background-size: cover;
    }
    .box input{
        /*display: none;*/
        position: absolute;
        top: -20px;
        left: 0;
    }
    .an{
        width: 196px;
        height: 60px;
        background: black;
        position: absolute;
        bottom: 30%;
        right: 22%;
        /*border-radius: 50%;*/
    }
    .qr-box{
        width:26rem;
        height:26rem;
        /*margin-top:15px;*/
        position: absolute;
        top: 28.6%;
        right: 0;
        bottom: 0;
        left: 33%;
        /*margin: auto;*/
    }
    .font-box{
    position: absolute;
    top: 0%;
    left: 0%;
    font-size: 24px;
    color: white;
  }
</style>
