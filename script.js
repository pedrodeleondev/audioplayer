// TODO: Conexión a JSON

async function data() {
  const response = await fetch("./left/artists/artists.json");
  const json = await response.text();
  localStorage.setItem("Artists", json);
}
data();

// *: Variables

const arts = JSON.parse(localStorage.getItem("Artists"));
const backgroundCenter = document.querySelector(".background");
const nameArtist = document.querySelector("#nameArtist");
const infoArtist = document.querySelector(".info");
const divArtist = document.querySelectorAll(".divArtist");
const audio = document.querySelector("#audio");
const sliderVolume = document.querySelector(".rangeSound");
const songBar = document.querySelector(".songBar");
const songs=document.querySelector(".songs");
const song=document.querySelector(".song");
const btnPlay = document.querySelector(".btnPlay");
let bPlay = false;
const fTimeA = document.querySelector("#fTimeA");
const cTimeA = document.querySelector("#cTimeA");
const btnHeart = document.querySelector(".btnHeart");
const albumPhoto = document.querySelector(".albumPhoto");
const txtSong = document.querySelector("#txtSong");
let bHeart = false;
// !: AddEventListener

//.cloneNode(true) y appendChild

divArtist.forEach((divArtist) => {
  divArtist.addEventListener("mouseover", () => {
    arts.forEach((e) => {
      if (e.name.split(" ").join("").toLowerCase() == divArtist.classList[0]) {
        tippy(divArtist, {
          content: `${e.name} · Artista`,
          placement: "right",
          arrow: false,
          animation: "fade",
        });
      }
    });
  });
  divArtist.addEventListener("click", () => {
  
    arts.forEach((e) => {
      if (e.name.split(" ").join("").toLowerCase() == divArtist.classList[0]) {
        backgroundCenter.style.backgroundImage = `url('${e.background}')`;
        songs.innerHTML="";
        let JSONSongs=Object.values(e.songsA)
        for(let i=0;i<Object.keys(e.songsA).length;i++){
            albumPhoto.style.backgroundImage=`url('${JSONSongs[i].cover}')`;
            txtSong.innerHTML=JSONSongs[i].name;
            let newSong=song.cloneNode(true);
            let newAlbum=albumPhoto.cloneNode(true);
            let newTxt=txtSong.cloneNode(true);
            newAlbum.style.backgroundImage=`url('${JSONSongs[i].cover}')`;
            newTxt.innerHTML=JSONSongs[i].name;
            songs.appendChild(newSong);
         
        }
        nameArtist.innerHTML = e.name;
      }
      songs.style.display="block";
    });
  });
});


sliderVolume.addEventListener("input", () => {
  this.localStorage.setItem("VolumeStorage", (sliderVolume.value / 100))
  changeVolume();

})
function changeVolume() {
  audio.volume = (sliderVolume.value / 100);
  audio.muted = false;
}

audio.addEventListener("timeupdate", () => {
  songBarChange();
})
audio.addEventListener("timeupdate", () => {
  console.log(audio.currentTime);
  if ((audio.currentTime % 60) < 10) {
    cTimeA.innerHTML = Math.trunc(audio.currentTime / 60) + ":0" + Math.trunc(audio.currentTime % 60);
  } else {
    cTimeA.innerHTML = Math.trunc(audio.currentTime / 60) + ":" + Math.trunc(audio.currentTime % 60);
  }
})

window.addEventListener('load', function () {
  if (this.localStorage.getItem("VolumeStorage")) {
    volumeStorage = localStorage.getItem("VolumeStorage");
    sliderVolume.value = volumeStorage * 100;
    audio.volume = (volumeStorage);
    changeVolume();
  } else {
    this.localStorage.setItem("VolumeStorage", (sliderVolume.value / 100));
    changeVolume();
  }
  songBar.value = audio.currentTime;
  if ((audio.duration % 60) < 10) {
    fTimeA.innerHTML = Math.trunc(audio.duration / 60) + ":0" + Math.trunc(audio.duration % 60);
  } else {
    fTimeA.innerHTML = Math.trunc(audio.duration / 60) + ":" + Math.trunc(audio.duration % 60);
  }
});


btnHeart.addEventListener("click", () => {
  alert()
  if (bHeart == false) {
    btnHeart.classList.remove("fa-regular"); 
    btnHeart.classList.add("fa-solid");
    bHeart = true;
  } else{
    btnHeart.classList.remove("fa-solid")
    btnHeart.classList.add("fa-regular");
    bHeart = false;
}})

songBar.addEventListener("input", () => {
  audio.pause();
  audio.currentTime = songBar.value;
})
songBar.addEventListener("change", () => {
  if (bPlay == false) {
    audio.pause();
  } else {
    audio.play();
  }
})
function songBarChange() {
  songBar.max = audio.duration
  songBar.value = audio.currentTime;
}
btnPlay.addEventListener("click", () => {
  if (bPlay == false) {
    audio.play();
    btnPlay.classList.remove("fa-play");
    btnPlay.classList.add("fa-pause")
    bPlay = true;
  } else {
    audio.pause();
    btnPlay.classList.add("fa-play");
    btnPlay.classList.remove("fa-pause")
    bPlay = false;
  }

})