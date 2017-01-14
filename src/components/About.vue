<template>
    <div class="page has-navbar" style="background-color: transparent">
      <div class="layout flex horizontal start container">
        <div class="showBigImage" :class="{active: showbig}">
          <div class="picbox great">
            <div class="picbox-item" v-for="logo in greatlogos" track-by="$index">
              <div class="layout flex vertical center">
                <img :src='logo.src'>
                <div class="name">{{logo.name}}</div>
              </div>
            </div>
          </div>
        </div>
        <div id="picbox" class="picbox">
          <div class="picbox-item" v-for="logo in logos" track-by="$index">
            <img :src='logo.src'>
          </div>
          <button type="button" class="button button-positive chongxinhuoqu"
                  @click="getlogos" :disabled="stop || stopchou"></button>
          <button type="button" class="button button-positive sort"
                  @click="sortlogos" :disabled="stop || stopsort"></button>
        </div>
        <div class="jiangchi">
          <div class="jiangchi-item">
            <div class="picbox jiangpinbox">
              <div class="picbox-item" v-for="logo in sandenglogos" track-by="$index">
                <div class="layout flex vertical center">
                  <img :src='logo.src'>
                  <div class="name">{{logo.name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="controlbar">
          <button type="button" class="button button-assertive stopbutton" @click="stopanimate" :disabled="!stop"></button>
          <button type="button" class="button button-balanced sandengjiangbutton" @click="choujiang('sandenglogos')"
                  :disabled="checkSandengDisable()"></button>
          <button type="button" class="button button-balanced erdengjiangbutton" @click="choujiang('sandenglogos')"
                  :disabled="checkErdengDisable()"></button>
          <button type="button" class="button button-balanced yidengjiangbutton" @click="choujiang('sandenglogos')"
                  :disabled="checkYidengDisable()"></button>
          <button type="button" class="button button-balanced tedengjiangbutton" @click="choujiang('sandenglogos')"
                  :disabled="checkTedengDisable()"></button>
        </div>
      </div>
    </div>
</template>
<script>
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generateImages(num) {
  var images = [];
  for (var i = 1; i < num + 1; i++) {
    images.push({
      src: `http://thecodeplayer.com/u/uifaces/${i}.jpg`
    });
  }
  return globalImages;
}

var d = 0;
var s, ry, tz;
var count = 50;
var jiangpinmanagaer = {};

function picShow() {
	return $("#picbox .picbox-item").each(function() {
		d = Math.random() * 1000;
		$(this).delay(d).animate({opacity:1},{
			step:function(n){
				ry=(1-n)*360;
				tz=(1-n)*1000;
				$(this).css("transform","rotateY("+ry+"deg) translateZ("+tz+"px)");
			},
			duration:3000,
			easing:'easeOutQuint',//jquery_easing插件提供的曲线函数。
		})
	}).promise();
}

function picHide() {
      return new Promise(function(resolve, reject) {
            $("#picbox .picbox-item").each(function() {
            d = Math.random() * 1000;
            $(this).delay(d).animate({
                opacity: 0
            }, {
                step: function(n) {//n是当前状态值，此处即是opacity当前的透明度。
                    s = 1 - n;
                    $(this).css("transform", "scale(" + s + ")");
                },
                duration: 1000,
            })
        }).promise().done(function() {
           randomImages().then(function() {
              picShow().done(function() {
                    setTimeout(function() {
                      resolve();
                    }, 0);
              });
           });
        });
      });
}

function randomImages() {
  return new Promise(function(resolve, reject) {
     var _images = shuffle(ret.logos);
     _images.forEach(function(v, index) {
       ret.logos.$set(index, v);
     });
     setTimeout(function() {
      resolve();
     }, 300);
  })
}

function fangDa(index) {
    return new Promise(function(resolve, reject) {
      ret.greatlogos.$set(0, ret.logos[index - 1]);
      ret.showbig = true;
      setTimeout(function() {
        resolve();
      }, 3000);
    });
}

function Suoxiao(index) {
    return new Promise(function(resolve, reject) {
      ret.showbig = false;
      setTimeout(function() {
        resolve();
      }, 1000);
    })
}

window.fangDa = fangDa;

function select(where, index) {
    return new Promise(function(resolve, reject) {
      fangDa(index + 1).then(function() {
        return Suoxiao(index + 1);
      }).then(function() {
        where.$set(where.length, ret.logos[index]);
        setTimeout(function() {
          ret.logos.$remove(ret.logos[index]);
          setTimeout(function() {
            resolve();
          }, 1500);
        }, 0);
      })
    });
}

function jiangpin() {

  var iEnd = -1;
  var lastIndex = -1;  
  var oMain = {};
  var _circle = 3;
  var _len = -1;
  var _iSpeed = 300;
  var _close = false;

  function setRandom() {
      iEnd = Math.floor(Math.random() * oMain.find('.picbox-item').length);
  }

  function setCircleNum(num) {
    _circle = num
  }
  
   function draw(fn){
        var timer = null,
                iNow = oMain.find('.active').index(),
                len = oMain.find('.picbox-item').length,
                circle = _circle, // 至少要转几圈
                iSpeed = _iSpeed,
                count = 0, // 转了多少次
                iLast = len, // 最后一次转圈圈
                slowflag = false,
                slow = len - circle,
                stop  = len - circle - 2;

        (function run(){

            // 前3个加速
            if(!slowflag && count > 2){ iSpeed = 100; }

            // 后3个减速
            if(iLast < slow && iNow > (len / 2)){
              slowflag = true;
              iSpeed = 300;
            }

            iNow++;
            count++;

            if(iNow >= len){ iNow = 0; circle--; }
            oMain.find('.picbox-item').removeClass('active').eq(iNow).addClass('active');

            timer = setTimeout(run, iSpeed);

            if (_close) {
              clearTimeout(timer);
              fn(iNow);
            }

            // 得到结果
            if(iEnd !== -1 && circle <= 0 && iNow == iEnd){

                // 为了最后一圈减速，再跑一圈
                iLast--;
                if(iLast == stop){
                    // clearTimeout(timer);
                    // fn(iEnd);
                }
            }
        })();
    }

  function active(index) {
    lastIndex = index;
    document.querySelector(`.picbox-item:nth-child(${index})`).classList.add("active");
  }

  function reset(index) {
    oMain.find('.picbox-item').removeClass('active')
  }

  function stop() {
    _close = true;
  }

  function clear() {
      reset(lastIndex);
  }
  
  function init(options) {
    oMain = options.oMain;
  }
  
  function start() {
    _close = false;
    return new Promise(function(resolve, reject) {
      draw(function(iEnd) {
        setTimeout(function() {
          resolve(iEnd);
        }, 300);
      });      
    });
  }

  return {
    active,
    reset,
    clear,
    init,
    setRandom,
    setCircleNum,
    stop,
    draw,
    start
  }
}

document.addEventListener("resetData", function() {
  if (ret.checkIndex == 0) {
    if (ret.sandenglogos.length < ret.sandengnum) {
      return false;
    }
  }
  if (ret.checkIndex == 1) {
    if (ret.sandenglogos.length < ret.erdengnum) {
      return false;
    }
  }
  if (ret.checkIndex == 2) {
    if (ret.sandenglogos.length < ret.yidengnum) {
      return false;
    }
  }
  if (ret.checkIndex == 3) {
    if (ret.sandenglogos.length < ret.tedengnum) {
      return false;
    }
  }
  ret.sandenglogos = [];
});

jiangpinmanagaer = jiangpin();


var ret = {};

  export default {
    data() {
      this.reset();
      this.getList();
      ret.sandengnum = window.globalConfig.choujiang.sandeng - 1;
      ret.erdengnum = window.globalConfig.choujiang.erdeng - 1;
      ret.yidengnum = window.globalConfig.choujiang.yideng - 1;
      ret.tedengnum = window.globalConfig.choujiang.tedeng - 1;
      return ret;
    },
    ready() {
      this.reset();
      jiangpinmanagaer.init({
        oMain: $("#picbox")
      });
    },
    methods: {
     reset() {
      ret.sandenglogos = [];
      ret.erdenglogos = [];
      ret.yidenglogos = [];
      ret.greatlogos = [];
      ret.yijingchoudaokeys = [];
      ret.stop = false;
      ret.showbig = false;
      ret.stopchou = false;
      ret.stopsort = false;
      ret.checkIndex = 0;
      ret.logos = [];
    },
      animate() {
        return new Promise(function(resolve, reject) {
          jiangpinmanagaer.clear();
          setTimeout(function() {
            picHide().then(function () {
              resolve();
            });
          }, 0);
        });
      },
      sortlogos() {
        ret.stopsort = true;
        this.animate().then(function() {
          ret.stopsort = false;
        })
      },
      check() {
        if (ret.checkIndex == 0) {
           if (ret.sandenglogos.length > ret.sandengnum) {
              ret.checkIndex = 1;
              return false;
           }
         }
         if (ret.checkIndex == 1) {
           if (ret.sandenglogos.length > ret.erdengnum) {
              ret.checkIndex = 2;
              return false;
           }
         }
         if (ret.checkIndex == 2) {
           if (ret.sandenglogos.length > ret.yidengnum) {
              ret.checkIndex = 3;
              return false;
           }
         }
         if (ret.checkIndex == 3) {
           if (ret.sandenglogos.length > ret.tedengnum) {
              ret.checkIndex = 4;
              return false;
           }
         }
      },
      choujiang(data) {
        var self = this;
        jiangpinmanagaer.setCircleNum(1);
        jiangpinmanagaer.setRandom();
        ret.stop = true;
        jiangpinmanagaer.start().then(function (iEnd) {
          console.log(`${iEnd + 1} 号得到奖品`);
          ret.yijingchoudaokeys.push(ret.logos[iEnd].name);
          select(ret[data], iEnd).then(function() {
            self.check();
            jiangpinmanagaer.reset();
            ret.stop = false;
          });
        });
      },
      stopanimate() {
        jiangpinmanagaer.stop();
      },
      checkSandengDisable() {
        if (ret.checkIndex != 0) {
          return true;
        }
        return ret.stop || ret.sandenglogos.length > ret.sandengnum;
      },
      checkErdengDisable() {
        if (ret.checkIndex != 1) {
          return true;
        }
        return ret.stop || ret.sandenglogos.length > ret.erdengnum;
      },
      checkYidengDisable() {
        if (ret.checkIndex != 2) {
          return true;
        }
        return ret.stop || ret.sandenglogos.length > ret.yidengnum;
      },
      checkTedengDisable() {
        if (ret.checkIndex != 3) {
          return true;
        }
        return ret.stop || ret.sandenglogos.length > ret.tedengnum;
      },
      getlogos() {
        ret.stopchou = true;
        this.getList().then(function() {
          setTimeout(function() {
            ret.stopchou = false;
          }, 0);
        });
      },
      getList() {
        return fetch(window.globalConfig.list).then(function(response) {
            return response.json();
        }).then(function(data) {
            ret.logos = data.filter(function(v, index) {
              return ret.yijingchoudaokeys.indexOf(v.name) < 0;
            });
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 450px;
  padding-top: 3vw;
  justify-content: space-between;
}

#picbox{
	width: 65.9vw;
	perspective: 65.9vw * 6 / 5;/*3D效果*/
	background-image: url("../assets/img/kuang1.png");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 3vw;
	display: inline-flex;
	flex-wrap: wrap;
	position: relative;
}
.picbox img{
	width: 5.5vw;
	height: 5.5vw;
	display: block;
    transition: transform 0.3s ease;
    border: 3px solid #f6a629;
    border-radius: 0.4vw;
}
.picbox-item {
  border-radius: 1vw;
  border: 0.6vw solid transparent;
  margin-left: 0.8vw;
}
.picbox .picbox-item.active {
  border-color: #f6a629;
}
.jiangchi {
  padding-left: 30px;
  text-align: left;
}

.jiangchi .picbox{
  width: 25vw;
}

.chongxinhuoqu {
  background-image: url("../assets/img/again.png");
  background-color: transparent;
  background-size: 100% 100%;
  position: absolute;
  width: 10vw;
  height: 5.53vw;
  right: calc(10% + 12vw);
  bottom: -2vw;
  &:active {
    background-color: transparent;
    animation: 1s buttonanimate;
    animation-iteration-count: infinite;
  }
}

.sort {
  background-image: url("../assets/img/sort.png");
  background-color: transparent;
  background-size: 100% 100%;
  position: absolute;
  width: 10vw;
  height: 5.53vw;
  right: 10%;
  bottom: -2vw;
  &:active {
    background-color: transparent;
    animation: 1s buttonanimate;
    animation-iteration-count: infinite;
  }
}

.jiangpinbox {
    height: 40vw;
	background-image: url("../assets/img/kuang2.png");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 3vw;
	display: flex;
	flex-wrap: wrap;
	position: relative;
    &:after {
      content: '';
      display: block;
      width: 11.7vw;
      height: 7.3vw;
      position: absolute;
      left:0;
      bottom:0;
      background-image: url("../assets/img/chicken.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      transform: translateX(-40%);
    }
}

.showBigImage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: -1;
  background-color: rgba(0,0,0,0.5);
  background-image: url("../assets/img/light.png");
  background-repeat: no-repeat;
  background-position: 17vw center;
  background-size: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  pointer-events: none;
  &.active {
    opacity: 1;
    z-index: 1000;
  }
}

.showBigImage .picbox-item img {
  width: 17.5vw;
  height: 17.5vw;
}

.showBigImage .name {
  position: relative;
  top: 1.5vw;
  color: #fff;
}

.jiangpinbox .picbox-item {
  position: absolute;
  &:nth-child(1) {
    left: 50%;
    top: 3vw;
    transform: translateX(-50%);
  }
  &:nth-child(2) {
    left: 15%;
    top: 12vw;
  }
  &:nth-child(3) {
    right: 15%;
    top: 12vw;
  }
  &:nth-child(4) {
    left: 15%;
    top: 22vw;
  }
  &:nth-child(5) {
    right: 15%;
    top: 22vw;
  }
  .name {
    margin-top: 10px;
    font-size: 20px;
    color: #f6a629;
  }
}

  .controlbar {
    position: absolute;
    left:0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    padding: 0 3vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @mixin button($url) {
    background-image: url($url + ".png");
    background-color: transparent;
    background-size: 100% 100%;
    width: 16.4vw;
    height: 7.5vw;
    cursor: pointer;
    border: none;
    &:active {
      background-color: transparent;
    }
    &:disabled {
      background-image: url($url + "-2.png");
    }
  }

  @keyframes buttonanimate {
    0% {
        transform: scale(1) translateY(0);
    }
    50% {
        transform: scale(0.9) translateY(1%);
    }
    100% {
        transform: scale(1) translateY(0);
    }
  }

  .stopbutton {
    background-image: url("../assets/img/suspend-icon.png");
    background-color: transparent;
    background-size: 100% 100%;
    width: 15.3vw;
    height: 15.3vw;
    cursor: pointer;
    border: none;
    &:active {
      background-color: transparent;
      animation: 1s buttonanimate;
      animation-iteration-count: infinite;
    }
  }

  .sandengjiangbutton {
    @include button("../assets/img/the-third-award");
  }

  .erdengjiangbutton {
    @include button("../assets/img/the-second-award");
  }

  .yidengjiangbutton {
    @include button("../assets/img/first-prize");
  }

  .tedengjiangbutton {
    @include button("../assets/img/outstanding-winner");
  }

</style>