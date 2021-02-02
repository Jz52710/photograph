<template>
     <div class="camera_img">
         <div class="img-box"></div>
         <div v-if="url" class="img_bg_camera">
            <img :src="url" alt="" class="tx_img">
         </div>
    </div>
</template>

<script>
    export default {
        name: "image",
        data(){
            return{
                url:''
            }
        },
        beforeMount() {
            this.url = this.$route.query.path
        }
    }
</script>

<style scoped>

    .camera_img{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        background: url("../assets/img/b3.png") no-repeat center;
        background-size: 100%;
    }
    .img-box{
        width: 362px;
        height: 380px;
        background: url("../assets/img/k.png") no-repeat center;
        background-size: cover;
        position: absolute;
        top: 16%;
        left: 4%;
        z-index: 9;
  }
    .tx_img{
    -moz-transform:scaleX(-1);
    -webkit-transform:scaleX(-1);
    -o-transform:scaleX(-1);
    transform:scaleX(-1);
    position: absolute;
    top: 29%;
    left: 10%;
    width:300px;
    height:200px;
  }
</style>
