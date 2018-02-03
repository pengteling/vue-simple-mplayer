<template>
  <div>
    <mplayer 
      :opt="opt"
      @timeupdate="timeupdate"
      @loadedmetadata="loadedmetadata"        
      ref="player"   
    >
    </mplayer>
    <input type="range" v-model="volume" @change="setVolume(volume)">
    <button ></button>    
    <span class="timer">{{currentTime}} / {{ duration }}</span>
  </div>
</template>
<script>
import { MUSIC_LIST } from "./data/MusicList";
import Mplayer from "./mplayer.vue";
//import Mplayer from './../dist/simpleMplayer.js'
import Vue from "vue";
Vue.use(Mplayer);

export default {
  components: {
    Mplayer
  },
  data() {
    return {
      opt: {
        id: "m1",
        url: MUSIC_LIST[2].file
      },      
      volume: 80     ,
      duration:0,
      currentTime:0
    };
  }, 
  computed:{
    
  },
  methods: {
    timeupdate(currentTime) {
      //获取当前时间
      //console.log(id,time)
      this.currentTime = currentTime
    },
    loadedmetadata(duration){
      this.duration = duration
    },
    setVolume(volume) {
      this.$refs.player.setVolume(volume / 100);
    }
  }
};
</script>
