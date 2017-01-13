<template>
    <div class="page" v-nav="{ title: '最佳coser' }">
        <div class="page-content">
            <div class="page-bg" >
                <div class="layout flex horizontal center-center header">
                </div>
                <div class="layout flex horizontal center-center container">
                    <div class="layout inline-flex horizontal center">
                        <div class="huojiang-item" v-for="item in items">
                            <div class="clip-area" :style="item.style"></div>
                            <div class="num">{{item.count}}</div>
                            <img src="../assets/img/frame1.png">
                            <div class="bg"></div>
                        </div>
                    </div>
                </div>
                <div class="layout flex horizontal center-center footer">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var ret = {};

function genBgImg(items) {
    return items.map(function(v, index) {
        v.style = {
            backgroundImage: `url(${v.backgroundImage})`
        };
        console.dir(v.style.backgroundImage);
        return v;
    })
}

export default {
  components: {
  },
  data () {
    ret.page = "index";
    ret.items = [];
    return ret;
  },
  ready() {
    this.getlist();
  },
  methods: {
    getlist() {
        return fetch(window.globalConfig.coser).then(function(response) {
            return response.json();
        }).then(function(data) {
            ret.items = genBgImg(data);
        });
    }
  }
}
</script>
<style lang="scss">
    @mixin mask-image($url,$width: 4vw,$height: 4vw, $content: after, $left: -($width / 2), $top: -($height / 2), $position: left) {
        &:#{$content} {
            content: "";
            width: $width;
            height: $height;
            display: block;
            background-image: url('#{$url}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            position: absolute;
            #{$position}: $left;
            top: $top;
            z-index: 1;
            @if $position == left {
                transform: rotate(-30deg);
            }
        }
    }

    .page-bg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-image: url("../assets/img/bg.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .header {
        position: absolute;
        left: 0;
        top: 3vh;
        width: 100%;
        height: 20vh;
        background-image: url("../assets/img/word1.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .footer {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 20vh;
        background-image: url("../assets/img/word.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .huojiang-item {
        position: relative;
        img {
            display: block;
            width: 15vw;
            max-width: 384px;
            opacity: 0;
        }
        .num {
            font-size: 16px;
            color: #ffffff;
            line-height: 4vw;
        }
        &:nth-child(n+2) {
            margin-left: 3vw;
        }
        &:nth-child(2n+1) {
            .num {
                width: 4vw;
                height: 4vw;
                display: block;
                background-image: url('../assets/img/num.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                position: absolute;
                right: -1.5vw;
                top: -2vw;
                z-index: 1;
            }
            .clip-area {
                top: 1%;
                clip-path: polygon(2% 1%, 98% 1%, 89% 100%, 10% 100%);
            }
        }
        &:nth-child(2n) {
            .num {
                width: 4vw;
                height: 4vw;
                display: block;
                background-image: url('../assets/img/num.png');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                position: absolute;
                right: -1vw;
                top: -2vw;
                z-index: 1;
            }
            .clip-area {
                width: 100%;
                height: 120%;
                left: 1%;
                top: 1.5%;
                clip-path: polygon(7% 0, 90% 0, 97% 80%, 0 80%);
            }
        }
        &:nth-child(1) {
            @include mask-image("../assets/img/champion-icon.png");
            .clip-area {
                clip-path: polygon(4% 2%, 96% 2%, 89% 86%, 10% 86%);
            }
        }
        @for $i from 1 through 5 {
            &:nth-child(#{$i}) {
                background-image: url("../assets/img/frame#{$i}.png");
                background-repeat: no-repeat;
                background-position: center 0;
                background-size: 100%;
                .bg {
                    background-repeat: no-repeat;
                    background-position: bottom;
                    background-size: 100%;
                    background-image: url("../assets/img/frame#{$i}.png");
                }
                @if $i == 2 {
                    background-position: 0 -3px;
                    .clip-area {
                        width: 101%;
                        height: 120%;
                        left: 1%;
                        top: 1%;
                        clip-path: polygon(7% 0,90% 0,97% 65%,0 65%);
                    }
                }
                @if $i == 3 {
                    background-position: 0 -3px;
                    .clip-area {
                        top: 0;
                        width: 101%;
                        clip-path: polygon(2% 1%,97% 1%,89% 87%,10% 87%);
                    }
                }
                @if $i == 4 {
                    .clip-area {
                        clip-path: polygon(7% 0,90% 0,97% 65%,2% 65%);
                    }
                }
                @if $i == 5 {
                    background-position: 0 -4px;
                    .clip-area {
                        top: 0;
                        width: 101%;
                        clip-path: polygon(2% 1%, 97% 1%, 89% 100%, 10% 100%);
                    }
                }
            }
        }
        &:nth-child(2) {
            @include mask-image("../assets/img/second-place-icon.png", $left: -1vw);
        }
        &:nth-child(3) {
            @include mask-image("../assets/img/third-winner-in-contest-icon.png");
        }
        .clip-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 90%;
            overflow: hidden;
            background-repeat: no-repeat;
            background-position: center 0;
            background-image: url("../assets/img/test.jpg");
            background-size: 100%;
        }
        .bg {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 37%;
        }
    }
</style>