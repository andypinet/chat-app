<template>
    <section class="panel chat-panel flex-1" id="chatContainer">
        <div class="chat">
            <ul class="index" v-if="page == 'index' ">
                <li v-for="message in messages" :class="message.fromType">
                    <div v-if="message.type == 'text'">
                        <a class="user" href="#"><img alt="" :src="message.user.avatar" /></a>
                        <div class="date">
                            {{message.user.name}} {{message.date}}
                        </div>
                        <div class="message">
                            <div class="hider">
                                <span>Click to read</span>
                            </div>
                            <p v-html="message.content">
                            </p>
                            <span class="end"></span>
                        </div>
                    </div>
                    <div v-if="message.type == 'SYSTEM'">
                        <div class="others-message">
                            <div class="text" v-html="message.content">
                            </div>
                        </div>
                        <span class="end"></span>
                    </div>
                </li>
            </ul>
            <ul class="jiemu" v-if="page == 'jiemu' ">
                <li v-for="message in messages" :class="message.fromType">
                    <div v-if="message.type == 'text'">
                        <a class="user" href="#"><img alt="" :src="message.user.avatar" /></a>
                        <div class="date">
                            {{message.user.name}} {{message.date}}
                        </div>
                        <div class="message">
                            <div class="hider">
                                <span>Click to read</span>
                            </div>
                            <p v-html="message.content">
                            </p>
                            <span class="end"></span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="others-message">
                            <div class="text">
                                该消息暂时不支持
                            </div>
                        </div>
                        <span class="end"></span>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
var BTimeAgo = require('better-timeago');
var locale_zh_cn = require('better-timeago-locale-zh-cn');
BTimeAgo.locale('zh-cn', locale_zh_cn);

var testMessages = [];

function transfromMessage(v) {
    v["date"] = BTimeAgo(parseFloat(v.time * 1000)).print();
    return v;
}

function transformMessages(messages) {
  return messages.map(function(v) {
    return transfromMessage(v);
  })
}

var ret = {};

function goToEnd() {
  if (document.querySelector("#chatContainer .chat ul li:last-child .end")) {
    document.querySelector("#chatContainer .chat ul li:last-child .end").scrollIntoView({block: "end", behavior: "smooth"});
  }
}

export default {
    props: {
     page: String
    },
  data () {
    ret.messages = [];
    return ret;
  },
  ready() {
    var container = document.querySelector("#chatContainer .chat");
    var containerStyle = window.getComputedStyle(container);
    var containerHeight = container.offsetHeight - parseFloat(containerStyle.paddingTop) - parseFloat(containerStyle.paddingBottom) - 65;

    if (ret.messages.length < 1) {
        ret.messages= _.cloneDeep(window.globalConfig.messages);
    }

    window.globalConfig.ws.onmessage = function(e) {
      console.log(e.data);
      ret.messages.forEach(function(v) {
         v.date =  BTimeAgo(parseFloat(v.time * 1000)).print();
      });
      var message = transfromMessage(JSON.parse(e.data));
      if (message.type != 'heart_beat') {
          window.globalConfig.messages.push(message);
          ret.messages.push(message);
          console.dir(message);
      }
      setTimeout(function() {
        goToEnd();
      }, 300)
    }

    window.addEventListener("resize", function () {
        goToEnd();
    });
  }
}
</script>
