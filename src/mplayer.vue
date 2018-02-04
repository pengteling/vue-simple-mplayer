<template>
  <div class="mplayer">
    <audio
      :id="options.id"
      controls      
      :src="options.url" 
      :autoplay="options.autoplay"
      :loop ="options.loop"
      :ref="options.id"
      @timeupdate="timeupdate"
      @loadedmetadata="loadedmetadata" 
      @play="playPause"
      @pause="playPause"
      
    >
    </audio>
  </div>
</template>
<script>
const defaultOptions = {
  id: 'mplayer',
  autoplay: true,
  loop: false,
  url: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
}
export default {
  name:'Mplayer',
  props:{
    opt:{
      type:Object,
      required:true
    }
  },
  data() {
    return {      
      //options: Object.assign(defaultOptions ,this.opt).clone()  
      options:{...defaultOptions,...this.opt }    ,
      currentTime:0,
      duration:0,      
      volume:0.8
    }
  },
  computed: {
      audio() {
        return this.$refs[this.options.id]
      },
      
    
  },
  methods:{
    
    // playPause(){
    //   this.status = this.audio.paused ? 'pause' : 'play'
    // },
    // play(){
    //   this.audio.play()
    // },
    // pause(){
    //   this.audio.pause()
    // },
    doPlayPause(){
      if(this.audio.paused){
        this.audio.play()
      }else{
        this.audio.pause()
      }
    },
    playPause(){
      this.$emit("playPause",this.audio.paused)
    },
    getPaused(){
      return this.audio.paused
    },
    timeupdate(){
      this.currentTime =  this.audio.currentTime
      this.$emit("timeupdate",this.audio.currentTime)
    },
    loadedmetadata(){      
      this.duration = this.audio.duration
      this.audio.volume = this.volume
      this.$emit("initVolume",this.volume)
      
      this.$emit("loadedmetadata",this.audio.duration)
    },
    setVolume(volume){
      this.audio.volume = volume
      this.volume = volume
      this.$emit("initVolume",this.volume)
    },
    getVolume(){
      return this.audio.volume
    },
    setCurrentTime(time){
      // console.log(time)
      // this.audio.pause()
      this.audio.currentTime = time
      // this.audio.play()
    }
  },
  mounted(){
    //console.log(this.options)
  }
};
</script>
<style lang="scss" scoped>
.mplayer audio{
  display:none
}
</style>


