import { MUSIC_LIST } from "./data/MusicList";
import Mplayer from "./mplayer.vue";

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
      volume:0
    }
  },
  methods:{
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
    play(){
      console.log("play")
    }
  },
  mounted(){
    //console.log(this.$refs.audio.getVolume())
  },
  
  render() {
    return (
      <div>
        <mplayer opt={opt} ref="audio" onInitVolume={this.initVolume}>
        </mplayer>
        <input type="range" onChange={this.changeVolume.bind(this)} value={this.volume} ref="range"/>
        <button >播放</button>
        <span class="timer"></span>
      </div>
    )
  }
}