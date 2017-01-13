<template>
  <div class="page" v-nav="{ title: 'Home' }">
    <div class="page-content">
      <div class="spage-fixed">
        <div id="dm-screen"></div>
      </div>
      <div class="layout flex horizontal container">
        <section class="panel">
          <div style="width: calc(100vw)">
            <button type="button" class="index-coser" @click="showCoser"></button>
            <button type="button" class="index-choujiang" @click="showChouJiang"></button>
          </div>
        </section>
      </div>
      <img id="logo" src="http://p1.qqyou.com/touxiang/UploadPic/2015-6/19/2015061914564960842.jpeg">
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
import Coser from "./Coser.vue";

if (!window.globalConfig.ws) {
  window.globalConfig.ws = new WebSocket(window.globalConfig.wsconfig.location);
}

function appendAvatar(id, src) {
  var image = document.createElement('img');
  image.id = id;
  image.src = src;
  ret.images[id] = image;
  document.body.append(image);
}

window.globalConfig.ws.onmessage = function(e) {
   var message = JSON.parse(e.data);
   if (message.type == "heart_beat") {
    return false;
   }
   if (message.type == 'text') {
     emitMessage(message.content, "#" + message.from);
     if (!ret.images[message.from]) {
        appendAvatar(message.from, message.user.avatar);
     }
   } else {
     emitSystem(message.content);
   }
}

function emitMessage(text, logo) {
  window.globalConfig.damoo.emit({
      text: text,
      font: ret.globalFont,
      logoSelector: logo,
      color: "#c05608",
  });
}

function emitSystem(text) {
   window.globalConfig.damoo.emit({
      text: text,
      font: ret.globalFont,
      logoSelector: "sdsdsdsdsdsds",
      fixed: true,
      color: "#c05608",
  });
}

var ret = {};

ret.images = {};

export default {
  components: {
  },
  data () {
    ret.page = "index";
    return ret;
  },
   created() {
      $vonicModal.fromComponent('default_modal', Modal)
      $vonicModal.fromComponent('coser_model', Coser)
    },
  ready() {
    ret.globalFont = {
      size: 70 / 1440 * window.innerHeight
    }
    if (!window.globalConfig.damoo) {
      window.globalConfig.damoo = Damoo('dm-screen', 'dm-canvas', 20);
      window.globalConfig.damoo.start();
      var gutter = window.innerHeight / 15;
      if (gutter < 30) {
        gutter = 30
      }
      window.globalConfig.damoo.options = {
        top: window.innerHeight / 5,
        gutter: gutter
      };
    }
  },
  methods: {
    showChouJiang() {
      $vonicModal.show('default_modal')
      document.dispatchEvent(new CustomEvent("resetData", {}));
    },
    showCoser() {
      $vonicModal.show('coser_model')
    }
  }
}
</script>
<style lang="scss" src="../scss/style.scss"></style>