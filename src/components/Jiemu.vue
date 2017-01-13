<template>
  <div class="page has-navbar" v-nav="{title: '最佳节目', showBackButton: true}">
    <div class="page-content text-center">
      <div class="page-fixed loading" v-if="!loadCompelete" transition="expand">
        <div class="loadanimate">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="text">Loading</div>
      </div>
      <div class="page-fixed message">
        <message :page="page"></message>
        <button type="button" class="button button-positive getresults" @click="getCounts">获取结果</button>
      </div>
      <div class="m-p-g">
        <div class="m-p-g__thumbs" data-google-image-layout data-max-height="350">
          <img v-for="item in items" :src="item.src" :data-full="item.large" class="m-p-g__thumbs-img" />
        </div>
        <div class="jieshao">
          <div class="jieshao-item" v-for="jieshao in jieshaos" :class="{active: jieshao.active}" :style="jieshao.style">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style="display: none;">
              <symbol id="wave">
                <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
              </symbol>
            </svg>
            <div class="box">
              <div class="percent">
                <div class="percentNum">{{jieshao.count}}</div>
              </div>
              <div id="water" class="water">
                <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
                  <use xlink:href="#wave"></use>
                </svg>
                <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
                  <use xlink:href="#wave"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="m-p-g__fullscreen"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Message from "./Message.vue";

function showImage(index) {
  if (document.querySelector(`.m-p-g__thumbs img:nth-child(${index})`)) {
    document.querySelector(`.m-p-g__thumbs img:nth-child(${index})`).dispatchEvent(new Event("click"));
  }
}

function setResult(setIndex, index, itemFunc) {
  var item = document.querySelector(`.m-p-g__thumbs img:nth-child(${index})`);
  if (item) {
    var width = item.style.width;
    var height = item.style.height;
    var offsetLeft = item.offsetLeft;
    var offsetTop = item.offsetTop;
    ret.jieshaos.$set(setIndex, itemFunc({
      active: false,
      style: {
        width: width,
        height: height,
        left: offsetLeft + 'px',
        top: offsetTop + 'px'
      }
    }));
  }
}

function initItems() {
  ret.items.forEach(function(v, index) {
     setResult(ret.jieshaos.length, index + 1, function(item) {
      item.count = 0;
      return item;
     });
  });
}

function resizeJieshaoItems() {
  ret.jieshaos.forEach(function(v, index) {
     setResult(index, index + 1, function(item) {
      item.count = 0;
      return item;
     });
  });
}

function setFenshu(fenshu) {
  var items = Array.prototype.slice.call(document.querySelectorAll(".jieshao-item"));
  items.forEach(function(v, index) {
    var interval;
    var percent = 0;
    var jieshao = ret.jieshaos[index];
    if (fenshu[ret.items[index].id]) {
      jieshao.count = percent;
      jieshao.active = true;
      ret.jieshaos.$set(index, jieshao);
      v.querySelector(".water").style.transform='translate(0'+','+(100-percent)+'%)';
      interval=setInterval(function(){
        percent++;
        jieshao.count = percent;
        ret.jieshaos.$set(index, jieshao);
        v.querySelector(".water").style.transform='translate(0'+','+(100-percent)+'%)';
        if(percent==fenshu[ret.items[index].id].count){
          clearInterval(interval);
        }
      },60);
    }
  });
}


var ret = {};

  export default {
    components: {
      Message
    },
    data() {
      ret.items = [];
      ret.loadCompelete = false;
      ret.jieshaos = [];
      ret.page = "jiemu";
      return ret;
    },
    ready() {
      this.getList();
    },
    methods: {
      getList() {
        var self = this;
        fetch("http://192.168.6.120:5555/front/vote/play").then(function(response) {
            return response.json();
        }).then(function(data) {
            ret.items = data;
            setTimeout(function() {
              self.imagesLoad();
            }, 1000);
        });
      },
      getCounts() {
        var self = this;
        fetch("http://192.168.6.120:5555/front/vote/play_count").then(function(response) {
            return response.json();
        }).then(function(data) {
            console.dir(data);
            setTimeout(function() {
              setFenshu(data);
            }, 1000);
        });
      },
      imagesLoad() {
        var elem = document.querySelector('.m-p-g');
        var gallery = new MaterialPhotoGallery(elem);
        MaterialPhotoGallery.onReady = function() {
          ret.loadCompelete = true;
          initItems();
        };
        gallery.onResizeEnd = function() {
            resizeJieshaoItems();
        };
      }
    }
  }
</script>
<style lang="sass">
  $gallery-width: 100%;
  $transition-duration: 0.5s;

  @keyframes wave {
  from {
  transform:rotateZ(0deg);
  }
  to {
  transform:rotateZ(360deg);
  }
  }

  .jieshao {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    pointer-events: none;
    .jieshao-item {
      position: relative;
    position: absolute;
  }
}

.page-fixed {
    position: fixed;
    left: 0;
    top: 44px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .loading {
    position: fixed;
    left: 0;
    top: 44px;
    width: 100%;
    height: 100%;
    background-color:#291f34;
    z-index: 1000;

    .text {
      display: block;
      position: absolute;
      left: 50%;
      top: 35vh;
      transform: translateX(-50%) translateY(-50%);
      font-size: 20px;
      color: #379fb7;
    }

    .loadanimate {
      position:absolute;
    left: 50%;
      top: 35vh;
      transform: translateX(-50%) translateY(-50%);
      display:block;
      width:20vh;
      height:20vh;
      text-align:center;
      filter:contrast(1.2);
    }

  span {
    mix-blend-mode:screen;
    display:block;
    position:absolute;
    border-radius:50%;
    animation:wave 3s infinite linear;
  }

    span:nth-child(0) {
      left:-11%;
      right:-2%;
      top:-12%;
      bottom:-5%;
      transform-origin:46% 53%;
      animation-delay:0;
      background-color:hsl(0, 100%, 50%);
  }

    span:nth-child(1) {
      left:-4%;
      right:-4%;
      top:-9%;
      bottom:-2%;
      transform-origin:47% 50%;
      animation-delay:-1s;
      background-color:hsl(50, 100%, 50%);
  }

    span:nth-child(2) {
      left:-11%;
      right:-4%;
      top:-10%;
      bottom:-11%;
      transform-origin:49% 53%;
      animation-delay:-1.5s;
      background-color:hsl(100, 100%, 50%);
  }

    span:nth-child(3) {
      left:-7%;
      right:-9%;
      top:-11%;
      bottom:-4%;
      transform-origin:47% 52%;
      animation-delay:-2s;
      background-color:hsl(150, 100%, 50%);
  }

    span:nth-child(4) {
      left:-8%;
      right:-3%;
      top:-5%;
      bottom:-11%;
      transform-origin:47% 52%;
      animation-delay:-2.5s;
      background-color:hsl(200, 100%, 50%);
  }

    span:nth-child(5) {
      left:-10%;
      right:-8%;
      top:-4%;
      bottom:-9%;
      transform-origin:48% 51%;
      animation-delay:-3s;
      background-color:hsl(250, 100%, 50%);
  }

    span:nth-child(6) {
      left:-9%;
      right:-11%;
      top:-5%;
      bottom:-8%;
      transform-origin:47% 50%;
      animation-delay:-3.5s;
      background-color:hsl(300, 100%, 50%);
  }
  }

  .message {
    z-index: 10;
    pointer-events: none;
    .chat-panel {
      width: 100%;
    height: 150px;
    position: absolute;
    bottom: 0;
    max-width: 750px;
    background-color: transparent;
    }
  }

  /* 必需 */
  .expand-transition {
    transition: all 3s ease;
    overflow: hidden;
  }
  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter, .expand-leave {
    opacity: 0;
  }

  .m-p-g {
    max-width: $gallery-width;
    margin: 0 auto;

    &__thumbs {

      &-img {
        margin: 0;
        float: left;
        vertical-align: bottom;
        cursor: pointer;
        z-index: 1;
        position: relative;
        opacity: 0;
        filter: brightness(100%);
        -webkit-tap-highlight-color: rgba(black, 0);
        will-change: opacity, transform;
        transition: all $transition-duration cubic-bezier(0.23, 1, 0.32, 1);

        &.active {
          z-index: 50;
      }

        &.layout-completed {
          opacity: 1;
      }

        &.hide {
          opacity: 0;
      }

        &:hover {
          filter: brightness(110%);
      }
    }
  }

    &__fullscreen {
      position: fixed;
      z-index: 10;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: calc(100% - 40px);
      background: rgba(black, 0);
      visibility: hidden;
      transition:
        background .25s ease-out,
        visibility .01s $transition-duration linear;
      will-change: background, visibility;
      backface-visibility: hidden;

      &.active {
        transition:
          background .25s ease-out,
          visibility .01s 0s linear;
        visibility: visible;
        background: rgba(black, 0.95);
    }

      &-img {
        pointer-events: none;
        position: absolute;
        transform-origin: left top;
        top: 50%;
        left: 50%;
        max-height: 100vh;
        max-width: 100%;
        visibility: hidden;
        will-change: visibility;
        transition: opacity $transition-duration ease-out;

        &.active {
          visibility: visible;
          opacity: 1 !important;
          transition:
            transform $transition-duration cubic-bezier(0.23, 1, 0.32, 1),
            opacity $transition-duration ease-out;
      }

        &.almost-active {
          opacity: 0;
          transform: translate3d(0,0,0) !important;
      }
    }
  }

    &__controls {
      position: fixed;
      top: 44px;
      left: 0;
      width: 100%;
      z-index: 200;
      height: 20vh;
      background: linear-gradient(to top, transparent 0%, rgba(black, 0.55) 100%);
      opacity: 0;
      visibility: hidden;
      transition: all $transition-duration cubic-bezier(0.23, 1, 0.32, 1);

      &.active {
        opacity: 1;
        visibility: visible;
    }

      &-close,
      &-arrow {
        appearance: none;
        border: none;
        background: none;

        &:focus {
          outline: none;
      }
    }

      &-arrow {
        position: absolute;
        z-index: 1;
        top: 0;
        width: 20%;
        height: 100vh;
        display: flex;
        align-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(black, 0);
        opacity: 0;

        &:hover {
          opacity: 1;
      }

        &--prev {
          left: 0;
          padding-left: 3vw;
          justify-content: flex-start;
      }

        &--next {
          right: 0;
          padding-right: 3vw;
          justify-content: flex-end;
      }
    }

      &-close {
        position: absolute;
        top: 3vh;
        left: 3vw;
        z-index: 5;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(black, 0);
    }
  }

    &__btn {
      $size: 50px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: $size;
      height: $size;
      border-radius: 50%;
      background: rgba(white, 0.07);
      transition: all .25s ease-out;

      &:hover {
        background: rgba(white, 0.15);
    }
  }

    &__alertBox {
      position: fixed;
      z-index: 999;
      max-width: 700px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 25px;
      border-radius: 3px;
      text-align: center;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.23), 0 10px 40px rgba(0, 0, 0, 0.19);
      color: grey;

      h2 {
        color: red;
    }
  }
  }

  .getresults {
    pointer-events: all;
  }

  /* DEMO */
  body {
    background: #fefefe;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-family: 'Roboto Mono';
  }

  h2 {
    font-weight: 300;
    margin: 4vh 4vw;
    letter-spacing: 3px;
    color: grey;
    text-transform: uppercase;
  }

  .demo-btn {
    display: inline-block;
    margin: 0 2.5px 4vh 2.5px;
    text-decoration: none;
    color: grey;
    padding: 15px;
    line-height: 1;
    min-width: 140px;
    background: rgba(0,0,0, 0.07);
    border-radius: 6px;
  }

  .demo-btn:hover {
    background: rgba(0,0,0,0.12);
  }

  @media (max-width: 640px) {

  .demo-btn {
    min-width: 0;
    font-size: 14px;
  }
  }

  $boxColor:transparent;
  $waterFColor:#4D6DE3;
  $waterBColor:#C7EEFF;

  .box{
    height: 210px;
    width: 210px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: $boxColor;
    border-radius: 100%;
    overflow: hidden;
    .percent{
      position: absolute;
      left: 0;
      top: 0;
      z-index:3;
      width: 100%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      align-items:center;
      justify-content:center;
      color:#fff;
      font-size:64px;
  }
    .water{
      position: absolute;
      left: 0;
      top: 0;
      z-index:2;
      width: 100%;
      height: 100%;
      transform:translate(0,100%);
      background:$waterFColor;
      &_wave{
        width: 200%;
        position: absolute;
        bottom: 100%;
        &_back {
          right: 0;
          fill: $waterBColor;
          animation: wave-back 1.4s infinite linear;
      }
        &_front {
          left: 0;
          fill: $waterFColor;
          margin-bottom: -1px;
          animation: wave-front .7s infinite linear;
      }
    }
  }
  }
  @keyframes wave-front {
  100% {
  transform: translate(-50%, 0);
  }
  }

  @keyframes wave-back {
  100% {
  transform: translate(50%, 0);
  }
  }
</style>