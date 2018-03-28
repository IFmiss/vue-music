  // 侦听事件
export function setLrcIndex (index, ref, store) {
  // 设置歌词内容(以索引的形式显示,主要是)
  let musicLrc = store.getters.getCurrentMusic.lyric
  let currentTime = Math.floor(ref.currentTime)
  // for(var i = musicLrcTime; i < musicLrc.length ; i++){
  //   if(musicLrc[musicLrcTime].timeId == Math.floor(currnt)){
  //     $('.music-lrc').text(musicLrc[musicLrcTime].text);
  //     musicLrcTime ++;
  //     return;
  //   }
  // }
  // let _this = this
  if (musicLrc.length === 0) return
  if (musicLrc[index] === undefined) return
  if (musicLrc[index].timeId > currentTime) return
  for (let i = index; i < musicLrc.length; i++) {
      // console.log(Number(musicLrc[index].timeId))
      // console.log(Math.floor(this.$refs.audio.currentTime))
      if (currentTime === Number(musicLrc[index].timeId)) {
        // alert(1)
        console.log(musicLrc[index].text)
        index++
        return
      }
      // console.log(JSON.stringify(lrc))
  }
}
