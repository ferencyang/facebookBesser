<template>
<div class="layout" id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkGroup01: false,
      checkGroup02: false,
      checkGroup03: false,
      checkAllGroup: []
    }
  },
  methods: {
    tokenCheck: function() {

      let localstroage = window.localStorage;
      let token = localstroage.getItem('token');
      let mobile = localstroage.getItem('mobile');

      let body = {
        mobile: mobile,
        token: token
      };
      let bodyStr = JSON.stringify(body);
      this.$socket.emit('messageholder', {
        sign: 1,
        type: 20,
        status: 0,
        body: bodyStr
      });
      this.$Spin.hide();
    },
    switchCheck: function() {
      this.axios({
          url: 'https://banfang.info/api/besser/lock',
          method: 'post',
          data: {
            token: '456'
          },
          transformRequest: [function(data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => {
          // if(response.data.code === 100007){
          //   this.$router.push('/lockpage');
          // }
        }, response => {});

    }
  }, //methods
  mounted() {
    this.switchCheck();
  },
  sockets: {
    connect: function() { //这里是监听connect事件
      this.$Spin.show();
      console.log('连接成功，检验token');

      window.sessionStorage.setItem('network', '200');

      let localstroage = window.localStorage;
      let switchNoticeVal = localstroage.getItem('switchNotice');
      console.log('检验switchNoticeVal', switchNoticeVal);
      if (switchNoticeVal === null) {
        localstroage.setItem('switchNotice', 'true');
      }
      this.tokenCheck();


    },
    connect_timeout: function() {
      console.log('连接超时connect_timeout');
      window.sessionStorage.setItem('network', 'connect_timeout');
      this.$Spin.hide();
    },

    reconnecting: function(val) {
      console.log('重连reconnecting', val);
      window.sessionStorage.setItem('network', 'reconnecting');
      if (val > 100) {
        this.$socket.disconnect();
        this.$Spin.hide();
      }
    },
    reconnect_failed: function() {
      console.log('连接错误reconnect_failed');
      window.sessionStorage.setItem('network', 'reconnect_failed');
    },
    messageholder(value) {
      // console.log('检验token',value);
      var localstroage = window.localStorage;
      switch (value.type) {
        case 18:
          console.log('登录的结果', value);
          this.$Message.destroy();
          if (value.status === 2000) {
            this.$Message.success('登录成功');
            var bodayGet = JSON.parse(value.body);
            let token = bodayGet.token;
            let mobile = bodayGet.mobile;
            localstroage.setItem('token', token);
            localstroage.setItem('mobile', mobile);

            let d = new Date();
            let year = d.getFullYear();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let hour = d.getHours();
            let min = d.getMinutes();
            let loginTime = year + "/" + month + "/" + day + ' ' + hour + ':' + min;
            localstroage.setItem('loginTime', loginTime);


            this.$router.push('/postnew');

          } else {
            this.$Message.error('账号或密码错误');
          }
          break;
        case 19:
          this.$Message.destroy();
          if (value.status === 2000) {
            let localstroage = window.localStorage;
            localstroage.removeItem('token');
            localstroage.removeItem('mobile');
            this.$Message.warning('退出登录');
            this.$router.push('/login');

          } else {
            this.$Message.error('操作失败');
          }
          break;
        case 20:
          console.log('检验token的结果', value);
          this.$Message.destroy();
          if (value.status === 2000) {
            this.$router.push('/postnew');
            this.$Spin.hide();
          } else {
            this.$Spin.hide();
            // this.$Message.error('登录失效，请重新登录');
            this.$router.push('/login');
          }
          break;
        default:

      }

    }
  },
  created() {
    // this.$socket.emit('chatevent', {body: "userName"});

  }
}
</script>

<style scoped>
.layout {
  background: #ffffff;
  width: 100%;
  height: 100%;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
