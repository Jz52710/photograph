<template>
    <div class="box">
        <div class="an" @click="next"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        computed: {
        },
        methods: {
            next(){
                this.$router.push('public')
            }
        },
        mounted () {

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
        background: url("../assets/img/b1.png") no-repeat ;
        background-size: cover;
    }
    .an{
        width: 100%;
        height: 100%;
        /*background: black;*/
        position: absolute;
        /*bottom: 19%;*/
        /*right: 29%;*/
        /*border-radius: 50%;*/
    }
</style>
