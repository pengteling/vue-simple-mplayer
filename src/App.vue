<template>
  <div>
    <mplayer 
      :opt="opt"
      @timeupdate="timeupdate"
      @loadedmetadata="loadedmetadata"        
      :ref="opt.id"   
    >
    </mplayer>
    <input type="range" v-model="volume" @change="setVolume(opt.id,volume)">
    <mplayer 
      :opt="opt2"
      @timeupdate="timeupdate"
      @loadedmetadata="loadedmetadata"     
      :ref="opt2.id"  
    >
    </mplayer>
    <span class="timer"></span>
  </div>
</template>
<script>
import {MUSIC_LIST} from './data/MusicList'
import Mplayer from './mplayer.vue'
export default {
  components:{
    Mplayer
  },
  data(){
    return{      
      opt:{
        id:"m1",
        url:MUSIC_LIST[2].file
      },
      opt2:{
        id:"m2",
        url:MUSIC_LIST[3].file,
        autoplay:false
      },
      volume:0
    }
  },
  methods:{
   timeupdate(currentTime,id){ //获取当前时间
     //console.log(id,time)
   },
   loadedmetadata(duration,id){ //获取总时长
     console.log(duration,id)
   },
   setVolume(audio,volume){
     //this.$refs[audio].setVolume(volume)
     console.log(audio,volume)
    //  this.$refs[audio].setVolume(volume)
    this.$refs[audio].setVolume(volume/100)
   }
  }
}
</script>
