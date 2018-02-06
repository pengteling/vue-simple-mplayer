import { MUSIC_LIST } from "./data/MusicList"
import { formatTime } from "./utils"
import Mplayer from "./mplayer.vue"

let opt = {
  id: "m1",
  url: MUSIC_LIST[2].file
}
export default {
  name : "App",
  components:{
    Mplayer
  },
  data(){
    return {
      volume:0,
      currentTime:0,
      duration:0,
      paused:true
    }
  },
  computed:{
    timestr (){
       return formatTime(this.currentTime)
    },
    currentPercentAbsolute (){
      return (this.currentTime / this.duration *100)
    }
   },
  methods:{
    timeupdate(currentTime) {
      //获取当前时间
      //console.log(id,time)
      this.currentTime = currentTime
    },
    loadedmetadata(duration){
      this.duration = duration
    },
    changeVolume(e){
      let volume = e.target.value /100
      //调用子组件的方法
      this.$refs.audio.setVolume(volume)
      //console.log(this.$refs.audio)
    },
    initVolume(volume){
      this.volume = volume *100      
      console.log(this.volume)
    },
    onplayPause(paused){
      //console.log("play")
      this.paused = paused
      
    },
    playPause(){
      this.paused = !this.paused
      this.$refs.audio.doPlayPause()
    },
    changeProgress(e){
      let progress = e.target.value
      let currentTime = this.duration * progress /100
      this.$refs.audio.setCurrentTime(currentTime)
    },
    changeSrc(url){
      this.$refs.audio.setSrc(url)
    },
    onEnded(){
      console.log("ended")
    }
  },
  mounted(){
    //console.log(this.$refs.audio.getVolume())
  },
  
  render() {
    return (
      <div>
        <mplayer
         opt={opt}
         ref="audio" 
         onInitVolume={this.initVolume}
         onTimeupdate={this.timeupdate}
         onLoadedmetadata ={this.loadedmetadata}
         onPlayPause={this.onplayPause}
         onEnded={this.onEnded}

        />
        音量：<input type="range" onChange={this.changeVolume} value={this.volume} ref="range"/>
        <button onClick={this.playPause}>{this.paused? "播放":"暂停"}</button>
        进度条：<input type="range" value={this.currentPercentAbsolute} onChange={this.changeProgress} ref="progress"/>
        <span class="timer">{this.timestr}</span>
        切换：<button onClick={this.changeSrc.bind(this,MUSIC_LIST[4].file)}>切换</button>
      </div>
    )
  }
}