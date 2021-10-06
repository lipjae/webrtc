<template>
  <q-page class="flex flex-center">
    <video id="localVideo" autoplay muted></video>
    <video id="remoteVideo" autoplay></video>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Remon from '@remotemonster/sdk';

const config = {
  credential: {
    serviceId: 'abcd01ba-d4e9-4e1a-af04-edb9499fe884',
    key: '07444b6f4fa64ec480a31928c38285ca32c0316a4fb8bbe0866dd8f9a90b0cd3'
  },
  view: {
    local: '#localVideo',
    remote: '#remoteVideo'
  },
  media: {
    video: {
        // width: {max: '640', min: '640'},
        // height: {max: '480', min: '480'},
        // codec : 'h264',
        // maxBandwidth: 300,
        // frameRate: {max: 20, min: 20}
    },
    audio : true
  }
}

export default defineComponent({
  name: 'PageIndex',
  methods: {
    getMedia: async function getMedia(constraints) {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        debugger
        console.log(stream)
        /* 스트림 사용 */
      } catch(err) {
        console.log(err)
        /* 오류 처리 */
      }
    }
  },
  async mounted() {
    
    await this.getMedia({})
    // const listener = {
    //   onInit(token) {
    //     // UI 처리등 remon이 초기화 되었을 때 처리하여야 할 작업
    //     console.log(token)
    //   },
    //   onConnect(channelId) {
    //     // 통화 생성 후 대기 혹은 응답
    //     console.log(channelId)
    //   },
    //   onComplete() {
    //     // Caller, Callee간 통화 시작
    //     alert('complete')
    //   },
    //   onClose() {
    //     // 종료'
    //     alert('close')
    //   }
    // }
    // const callee = new Remon({ listener, config })
    // callee.connectCall('test')
  }
})
</script>
