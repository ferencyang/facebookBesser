<style scoped>
.ivu-checkbox-wrapper {
  padding: 8px 15px 8px 0px;
  font-size: 14px;
  width: 100%;
}

.ivu-checkbox-group-item {
  border-bottom: 1px solid #d9d9d9;
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu {
  text-align: center;
  /* color: #F8F9FC; */
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
  /* color: #C4C5C6; */
}

.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu {
  padding: 0 20px;
}

.ivu-menu-dark {
  background: -webkit-linear-gradient(left, #8576d8 , #56e0f6); /* Safari 5.1 - 6.0 */

  background: -o-linear-gradient(right, #8576d8 , #56e0f6); /* Opera 11.1 - 12.0 */

  background: -moz-linear-gradient(right, #8576d8 , #56e0f6); /* Firefox 3.6 - 15 */

  background: linear-gradient(to right, #8576d8 , #56e0f6); /* 标准的语法 */
    margin: -1px;
}

.ivu-menu-horizontal {
  height: 90px;
  line-height: 18px;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}

.layout-logo {
  width: 182px;
  height: 51px;
  /*background: #5b6270;*/
  /*border-radius: 3px;*/
  float: left;
  position: relative;
  top: 20px;
  left: 30px;
}

.layout-nav {
  /*width: 600px;*/
  /*margin: 0 auto;*/
  float: left;
  padding-left: 88px;
  padding-top: 8px;
  padding-bottom: 5px;
}

.ivu-checkbox-wrapper {
  padding: 4px 15px 4px 0px;
  font-size: 12px;
}

.layout-assistant {
  width: 300px;
  margin: 0 auto;
  height: inherit;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.drag-area {
  -webkit-app-region: drag;
}

li {
  -webkit-app-region: no-drag;
}
#leftMenu a{
  color: #7894e0
}
</style>

<template>
<div  class="layout">

  <div  class="drag-area">

    <Menu mode="horizontal" theme="dark" active-name="1" @on-select="tapMenu">
      <div class="layout-logo">
        <img style="" src="../../assets/logo.png">
      </div>
      <div class="layout-nav">
        <MenuItem name="1">
        <img src="../../assets/menu01.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '1'">
        <img src="../../assets/m01.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <!-- <Icon type="camera" size="50"></Icon> -->
        <p>{{ $t("message.post") }}</p>
        </MenuItem>
        <MenuItem name="2">
        <img src="../../assets/menu02.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '2'">
        <img src="../../assets/m02.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <p>{{ $t("message.addfriends") }}</p>
        </MenuItem>
        <MenuItem name="3">
        <img src="../../assets/menu03.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '3'">
        <img src="../../assets/m03.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <p>{{ $t("message.reply") }}</p>
        </MenuItem>
        <MenuItem name="4">
        <img src="../../assets/menu04.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '4'">
        <img src="../../assets/m04.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <p>{{ $t("message.robot") }}</p>
        </MenuItem>
        <MenuItem name="5">
        <img src="../../assets/menu05.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '5'">
        <img src="../../assets/m05.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <p>{{ $t("message.taskdetail") }}</p>
        </MenuItem>
        <MenuItem name="6">
        <img src="../../assets/menu06.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '6'">
        <img src="../../assets/m06.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <p>{{ $t("message.analysis") }}</p>
        </MenuItem>
        <MenuItem name="7">
        <img src="../../assets/menu07.png" style="width:40px;height:40px;margin-top:12px;" v-if="menuVal === '7'">
        <img src="../../assets/m07.png" style="width:40px;height:40px;margin-top:12px;" v-else>
        <p>{{ $t("message.settings") }}</p>
        </MenuItem>
      </div>
      <div style="position:absolute; right: 15px;top: 5px;color:#ffffff;font-size:20px;-webkit-app-region: no-drag;">

        <Dropdown trigger="hover" @on-click="tapRightMenu">
          <a href="javascript:void(0)">
            <Icon type="navicon-round" style="padding-right:8px;color:#ffffff;"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="loop">
              <Icon type="loop" style="padding-right:5px;"></Icon>{{ $t("message.loop") }}
            </DropdownItem>
            <DropdownItem name="textsms">
              <Icon type="android-textsms" style="padding-right:5px;"></Icon>{{ $t("message.feedback") }}
            </DropdownItem>
            <!-- <DropdownItem name="update">
              <Icon type="arrow-up-a" style="padding-right:5px;"></Icon>{{ $t("message.update") }}
            </DropdownItem> -->

            <!-- <Dropdown placement="left-start">
              <DropdownItem divided name="setlang">
                <Icon type="earth" style="padding-right:5px;"></Icon>{{langValName}}
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem :selected="langVal === 'CN'" name="CN">简体中文</DropdownItem>
                <DropdownItem :selected="langVal === 'TW'" name="TW">繁體中文</DropdownItem>
                <DropdownItem :selected="langVal === 'EN'" name="EN">English</DropdownItem>
              </DropdownMenu>
            </Dropdown> -->
            <DropdownItem divided name="aboutus">
              <Icon type="person-stalker" style="padding-right:5px;"></Icon>{{ $t("message.aboutus") }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <a @click="tapWinMinus">
          <Icon type="minus-round" style="padding-right:8px;color:#ffffff;"></Icon>
        </a>
        <a @click="tapWinClose">
          <Icon type="close-round" style="color:#ffffff;"></Icon>
        </a>
      </div>
    </Menu>


  </div>

  <Row >
    <Col id="leftMenu" span="6" style="padding-right:15px;overflow:auto;height:600px;">
    <!-- left -->
    <!-- 账号组部分 -->
    <div style="margin-top:20px;margin-left:15px;margin-bottom:10px;">
      {{ $t("message.accountGroup") }}
      <a style="float:right;" v-on:click="tapAddGroup">
        <Icon type="android-add" style="padding-right:5px;"></Icon>{{ $t("message.addGroup") }}
      </a>
    </div>
    <CheckboxGroup style="margin-left:15px;margin-bottom:20px;">

      <div v-for="(item, idx) in devicesGroupAll" :key="idx">
        <Checkbox :indeterminate="false" :value="checkAllGroupOne === idx" @click.prevent.native="handleCheckGroupOne(idx)">
          <Icon type="person-stalker" color="#8576d8" style="padding-left:15px;padding-right:8px;"></Icon>{{item.name}}
        </Checkbox>
      </div>

    </CheckboxGroup>
    <div v-if="checkAllGroupOne !== false">
      <Button type="text" icon="trash-b" style="color:#ed3f14" @click="delCheckGroupOne">{{ $t("message.delGroup") }}</Button>
      <Button type="text" icon="ios-compose-outline" style="color:#2d8cf0" @click="editCheckGroupOne">{{ $t("message.editGroup") }}</Button>
    </div>

    <!-- 单个账号部分 -->
    <div style="margin-top:20px;margin-left:15px;margin-bottom:10px;margin-right:15px;">
      <Row type="flex" justify="center" align="middle">
        <Col span="16">
        <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">{{ $t("message.allacc") }}</Checkbox>
        </Col>
        <Col span="8">
        <a style="float:right;margin-right:-15px;" v-on:click="tapOPerate">
          <Icon type="android-settings" style="padding-right:5px;"></Icon>{{ $t("message.manage") }}
        </a>
        </Col>
      </Row>

    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" style="margin-left:15px;margin-bottom:20px;">

      <div v-for="(item, idx) in devicesListShow" :key="idx">
        <Checkbox :label="item.imei" v-if="item.isOnline" style="width:200px;">
          <Icon type="pause" color="#ff9900" style="padding-left:15px;padding-right:8px;" v-if="item.paused"></Icon>
          <Icon type="record" color="#19be6b" style="padding-left:15px;padding-right:8px;" v-else></Icon>
          {{item.imei}}
        </Checkbox>
        <Checkbox :label="item.imei" v-else="item.isOnline" style="color:#bbbec4;width:200px;" disabled>
          <Icon type="record" color="#bbbec4" style="padding-left:15px;padding-right:8px;"></Icon>{{item.imei}}
        </Checkbox>
      </div>
      <div style="text-align:center;margin-top:2px">
        <Button v-if="expandMoreDevice" type="ghost" icon="chevron-down" size="small" @click="expandMoreDevice = false">展开更多</Button>
        <Button v-else icon="chevron-up" type="ghost" size="small"  @click="expandMoreDevice = true">收起更多</Button>
      </div>
    </CheckboxGroup>

    

    <!-- left end -->
    </Col>
    <Col span="18" style="background-color:#ffffff;padding:20px 15px 15px 15px;height:600px;">
    <!-- main -->
    <router-view/>
    <!-- main end -->
    </Col>
  </Row>

  <!-- model -->
  <Modal v-model="modalAddGroup" :title="$t('message.newGroup')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" @on-ok="tapAddGroupOk" @on-cancel="tapAddGroupCancel">
    <p style="text-align:center;">
      <Transfer :data="dataTransfer" filterable :list-style="listStyle" :not-found-text="$t('message.newGroupNoneTip')" :target-keys="dataTransferKey" :operations="[$t('message.delect'), $t('message.add')]" :titles="[$t('message.myAccount'), $t('message.newGroupAccount')]"
        @on-change="tapTransfer"></Transfer>
    </p>
    <br />
    <p style="text-align:center;">
      <Input :placeholder="$t('message.newGroupTip')" v-model.trim="nameAddGroup" :maxlength="20" style="width: 150px"></Input>
    </p>
  </Modal>
  <!-- model end -->

  <!-- model -->
  <Modal v-model="modalEditGroup" :title="$t('message.editGroup')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" @on-ok="tapAddGroupEdit" @on-cancel="tapAddGroupCancel">
    <p style="text-align:center;">
      <Transfer :data="dataTransfer" filterable :list-style="listStyle" :target-keys="dataTransferKey" :operations="[$t('message.delect'), $t('message.add')]" :titles="[$t('message.myAccount'), $t('message.newGroupAccount')]" @on-change="tapTransfer"></Transfer>
    </p>
    <br />
    <p style="text-align:center;">
      <Input :placeholder="$t('message.newGroupTip')" v-model.trim="nameAddGroup" :maxlength="20" style="width: 150px"></Input>
    </p>
  </Modal>
  <!-- model end -->

  <!-- model -->
  <Modal v-model="modalOperate" :title="$t('message.manageOnlineAccount')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" @on-cancel="tapAddGroupCancel">
    <Table border :columns="columns4" :data="this.devicesListAllTable" @on-selection-change="getSelectionData" ></Table>
    <div slot="footer">
      <Button @click="modalOperate = false">取消</Button>
      <Button type="primary" :loading=false  @click="tapSwitchGroupEdit()">切换账号</Button>
    </div>
  </Modal>
  <!-- model end -->

  <!-- model -->
  <Modal v-model="modalFeedBack" :title="$t('message.feedback')" :ok-text="$t('message.feedbackOk')" :cancel-text="$t('message.cancel')" @on-ok="tapFeedBackOk" @on-cancel="tapAddGroupCancel">
    <p>
      <Input v-model.trim="feedBackVal" type="textarea" :rows="3" :placeholder="$t('message.feedbackTip')"></Input>
    </p>
  </Modal>
  <!-- model end -->

</div>
</template>

<script>
const ipcRenderer = require('electron').ipcRenderer;

export default {
  data() {
    return {
      expandMoreDevice: true, //账号数量展开收起状态控制
      devicesListAll: [],
      devicesGroupAll: [],
      indeterminate: true,
      checkAll: false,
      checkAllGroupOne: false,
      checkAllGroup: [],
      checkAllGroupGet: [],
      devicesListAllImei: [],
      modalAddGroup: false,
      modalEditGroup: false,
      modalOperate: false,
      dataTransfer: [],
      dataTransferKey: [],
      listStyle: {
        width: '200px',
        height: '230px'
      },
      nameAddGroup: '',
      modalFeedBack: false,
      feedBackVal: '',
      langVal: 'CN',
      langValName: '简体中文',
      menuVal: '1',
      columns4:[ {
          type: 'selection',
          width: 60,
          align: 'center'
          },
          {
              title: '在线设备',
              key: 'imei'
          }/*,
          {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h(
                          'Button',
                          {
                              props: {
                                  type: 'primary',
                                  size: 'small'
                              },
                              style: {
                                  marginLeft: '5px'
                              },
                              on: {
                                  click: () => {
                                      this.tapSwitchGroupEdit(params)
                                  }
                              }
                          },
                          "切换下一个账号"
                      )
                  ])
              }
          }*/
      ],
      devicesListAllTable:[],
      selectedData:[]
    }
  },
  mounted() {
    this.getDevice();
    this.checkVersion();
    this.getLangNow();
  },
  computed:{
    // 左侧设备显示数量控制
    devicesListShow(){
      if(this.expandMoreDevice === true) {
        //收起状态，只展示一定数量的设备，由deviceShowCount控制数量
        let deviceShowCount = 8; 
        return this.devicesListAll.length > deviceShowCount ? this.devicesListAll.slice(0,deviceShowCount) : this.deviceslistAll;
      } else {
        //展开状态，显示全部
        return this.devicesListAll;
      }
    }
  },
  watch: {
    checkAllGroup: function(val, oldVal) {

      let checkAllGroupGet = this.checkAllGroup;
      let devicesListAllImei = this.devicesListAllImei;
      let checkAllGroupEnd = [];
      for (var i = 0; i < checkAllGroupGet.length; i++) {

        let getDeviceId = devicesListAllImei.indexOf(checkAllGroupGet[i]);
        if (getDeviceId !== -1) {

          if (this.devicesListAll[getDeviceId].isOnline === true) {
            checkAllGroupEnd.push(checkAllGroupGet[i])
          }

        }


      }

      let localstroage = window.localStorage;
      localstroage.setItem('devicesList', checkAllGroupEnd);
    }
  },
  methods: {
    getLangNow() {
      let langNow = window.localStorage.getItem('langNow');
      this.langVal = langNow;
      switch (langNow) {
        case 'CN':
          this.langValName = '简体中文';
          break;
        case 'TW':
          this.langValName = '繁體中文';
          break;
        case 'EN':
          this.langValName = 'English';
          break;
        default:
          this.langValName = '设置语言';
      }
    },
    tapMenu(val) {
      // //console.log('menu',val)
      this.menuVal = val;
      switch (val) {
        case '1':
          this.$router.push({
            path: '/postnew'
          });
          break;
        case '2':
          this.$router.push({
            path: '/addfriend'
          });
          break;
        case '3':
          this.$router.push({
            path: '/reply'
          });
          break;
        case '4':
          this.$router.push({
            path: '/robot'
          });
          break;
        case '5':
          this.$router.push({
            path: '/task'
          });
          break;
        case '6':
          this.$router.push({
            path: '/analysis'
          });
          break;
        case '7':
          this.$router.push({
            path: '/settings'
          });
          break;
        default:
          this.$router.push({
            path: '/404'
          });
      }
    },
    tapRightMenu(val) {
      //console.log('右上角菜单:', val)
      switch (val) {
        case 'loop':
          this.$Spin.show();
          setTimeout(() => {
            this.$Spin.hide();
            location.reload();
          }, 3000);
          break;
        case 'textsms':
          this.modalFeedBack = true;
          break;
        case 'update':
          this.getUpdater();
          break;
        case 'aboutus':
          ipcRenderer.send('surfbird:openHomeUrl', true);
          break;
        default:
          this.tapLang(val);
          break;
      }
    },
    tapLang(val) {
      //console.log('點擊語言:', val)
      this.$Spin.show();
      window.localStorage.setItem('langNow', val);
      this.$Spin.hide();
      location.reload();
    },
    tapFeedBackOk() {
      //console.log('反馈的内容：', this.feedBackVal)

      let localstroage = window.localStorage;
      let token = localstroage.getItem('token');
      let feedbackConcent = this.feedBackVal;
      let network = window.sessionStorage.getItem('network');

      if (network !== '200') {

        this.$Message.error(this.$t("message.tipNetWrong"));

      } else {
        this.$Message.loading(this.$t("message.tipLoadUp"));

        this.axios({
            url: 'besser/fbcc/systems/feedback',
            method: 'post',
            data: {
              token: token,
              content: feedbackConcent
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
            //console.log('返回的数据: ', response.data)
            if (response.data.code === 200) {
              this.$Message.success(this.$t("message.tipSuccessFeedback"));
            } else {
              this.$Message.error(response.data.msg);
            }

          }, response => {
            // error callback
            this.$Message.error(this.$t("message.tipWrong"));
          });

      } //if...else...

    },
    getUpdater() {
      //console.log('-= 检验版本更新 =-');

      // this.$Message.loading('检查新版本');
      let versionNow = this.GLOBAL.visionNow;
      let updateDowmUrl = window.localStorage.getItem('updateDowmUrl');
      let versionNew = window.localStorage.getItem('versionNew');
      if (versionNow !== null && versionNew !== null && versionNew > versionNow) {
        // this.$Message.destroy();
        this.$Modal.confirm({
          title: this.$t("message.updateTitle"),
          content: '<p>' + this.$t("message.updateTextOk") + '</p>',
          okText: this.$t('message.confirm'),
          cancelText: this.$t('message.cancel'),
          onOk: () => {
            // this.$Message.loading('下载中');
            // this.$Loading.start();
            ipcRenderer.send('surfbird:updateload', updateDowmUrl);
            // this.$Message.destroy();
          },
          onCancel: () => {

          }
        });
      } else {
        this.$Message.destroy();
        this.$Modal.info({
          title: this.$t("message.updateTitle"),
          content: this.$t("message.updateTextNot"),
          okText: this.$t('message.confirm'),
          cancelText: this.$t('message.cancel'),
        });
      }

      ipcRenderer.on('updateMessage:setProgressBar', function(event, message) {
        //console.log('下载进度1：', message)
        let barText = '下载' + message + '%';
        //console.log('下载进度：', barText);
        // let that = this;
        // that.showBar(barText);

      });
      //
      // ipcRenderer.on('updateMessage:stateInterrupted', function(event, message) {
      //     this.$Message.destroy();
      //     this.$Loading.error();
      //     this.$Modal.error({
      //         title: '提示',
      //         content: '下载失败，请重试'
      //     });
      // });
      //
      // ipcRenderer.on('updateMessage:stateCompleted', function(event, message) {
      //   this.$Message.destroy();
      //   this.$Loading.finish();
      //   this.$Modal.confirm({
      //       title: '提示',
      //       content: '<p>下载完成，确认安装更新？</p>',
      //       onOk: () => {
      //           this.$Message.loading('即将重启');
      //           ipcRenderer.send('surfbird:updateOk', true);
      //       },
      //       onCancel: () => {
      //
      //       }
      //   });
      // });


    },
    showBar(barText) {
      this.$Notice.open({
        title: barText
      });
    },
    showDevice() {
      // //console.log('开始显示设备:', this.devicesListAll);
      let deviceListAllOnline = [];
      let deviceListAllOffline = [];
      for (var i = 0; i < this.devicesListAll.length; i++) {
        if (this.devicesListAll[i].isOnline) {
          this.checkAllGroupGet.push(this.devicesListAll[i].imei);
          deviceListAllOnline.push(this.devicesListAll[i].imei);
        } else {
          deviceListAllOffline.push(this.devicesListAll[i].imei);
        }
      }
      this.checkAllGroup = this.checkAllGroupGet;
      let localstroage = window.localStorage;
      localstroage.setItem('deviceListAllOnline', deviceListAllOnline);
      localstroage.setItem('deviceListAllOffline', deviceListAllOffline);

    },
    checkVersion() {

      let localstroage = window.localStorage;
      let token = localstroage.getItem('token');
      this.axios({
          url: 'besser/fbcc/systems/lastVersion',
          method: 'post',
          data: {
            token: token
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
          //console.log('返回的版本数据=-: ', response.data)
          if (response.data.code === 200) {
            localstroage.setItem('versionNew', response.data.data.version);
            localstroage.setItem('updateDowmUrl', response.data.data.upgradeUrl);
            localstroage.setItem('updateForced', response.data.data.forced);

          }

        }, response => {
          // error callback
        });


    },
    tapOPerate() {
      let taskNow = window.sessionStorage.getItem('taskNow');
      let network = window.sessionStorage.getItem('network');

      if (network !== '200') {

        this.$Message.error(this.$t("message.tipNetWrong"));

      } else {

        this.modalOperate = true;
        this.devicesListAllTable = []
        for(let i=0;i<this.devicesListAll.length;i++){
            if(this.devicesListAll[i].isOnline){
                let data = {
                    imei:this.devicesListAll[i].imei
                };
                this.devicesListAllTable.push(data)
            }
        }
      }

    },
    tapOPeratePlayOne(imei) {
      let localstroage = window.localStorage;
      let mobileEnd = localstroage.getItem('mobile');
      let token = localstroage.getItem('token');

      let network = window.sessionStorage.getItem('network');

      if (network !== '200') {

        this.$Message.error(this.$t("message.tipNetWrong"));

      } else {
        this.$Message.loading(this.$t("message.tipLoadPlay"));

        this.axios({
            url: 'besser/fbcc/devices/deviceResume',
            method: 'post',
            data: {
              token: token,
              mobile: mobileEnd,
              imei: imei
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
           // //console.log('返回的数据: ', response.data)
            if (response.data.code === 200) {
              this.$Message.success(this.$t("message.tipSuccessPlay"))
              let body = {
                token: token
              };
              let bodyStr = JSON.stringify(body);
              this.$socket.emit('messageholder', {
                sign: 1,
                type: 21,
                status: 0,
                body: bodyStr
              });
            } else {
              this.$Message.error(response.data.msg);
            }

          }, response => {
            // error callback
            this.$Message.error(this.$t("message.tipWrong"));
          });

      } //if...else...

    },
    tapOPeratePauseOne(imei) {

      let localstroage = window.localStorage;
      let mobileEnd = localstroage.getItem('mobile');
      let token = localstroage.getItem('token');

      let network = window.sessionStorage.getItem('network');

      if (network !== '200') {

        this.$Message.error(this.$t("message.tipNetWrong"));

      } else {
        this.$Message.loading(this.$t("message.tipLoadHold"))
        this.axios({
            url: 'besser/fbcc/devices/devicePause',
            method: 'post',
            data: {
              token: token,
              mobile: mobileEnd,
              imei: imei
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
            ////console.log('返回的数据: ', response.data)
            if (response.data.code === 200) {
              this.$Message.success(this.$t("message.tipSuccessHold"))
              let body = {
                token: token
              };
              let bodyStr = JSON.stringify(body);
              this.$socket.emit('messageholder', {
                sign: 1,
                type: 21,
                status: 0,
                body: bodyStr
              });
            } else {
              this.$Message.error(response.data.msg);
            }

          }, response => {
            // error callback
            this.$Message.error(this.$t("message.tipWrong"));
          });

      } //if...else...

    },
    tapAddGroup() {
      // //console.log('点击了新建事件:');
      let taskNow = window.sessionStorage.getItem('taskNow');
      let network = window.sessionStorage.getItem('network');

      if (network !== '200') {

        this.$Message.error(this.$t("message.tipNetWrong"));

      } else {

        this.modalAddGroup = true;
        this.getDataTransfer();

      }

    },
    getDataTransfer() {

      let dataTransfer = [];
      let dataTransferKey = [];
      for (var i = 0; i < this.devicesListAll.length; i++) {
        let dataTransferOne = {
          'key': this.devicesListAll[i].imei,
          'disabled': false,
        }
        let dataTransferOneKey = this.devicesListAll[i].imei;
        dataTransferKey.push(dataTransferOneKey);
        dataTransfer.push(dataTransferOne);
      }
      this.dataTransfer = dataTransfer;
      // this.dataTransferKey = dataTransferKey;
    },
    tapTransfer(newTargetKeys) {
      ////console.log(newTargetKeys);
      this.dataTransferKey = newTargetKeys;
    },
    tapAddGroupOk() {
      ////console.log('modeladdgroup确认');

      let localstroage = window.localStorage;
      let mobileEnd = localstroage.getItem('mobile');
      let token = localstroage.getItem('token');
      let nameEnd = this.nameAddGroup;
      let imeisEnd = this.dataTransferKey;

      if (nameEnd === '') {
        this.$Message.warning(this.$t("message.tipWarnGroupName"));
      } else if (imeisEnd.length === 0) {
        this.$Message.warning(this.$t("message.tipWarnGroupAccount"));
      } else {

        this.axios({
            url: 'besser/fbcc/devices/groupAdd',
            method: 'post',
            data: {
              token: token,
              mobile: mobileEnd,
              name: nameEnd,
              groupDesc: '',
              imeis: imeisEnd
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
            ////console.log('返回的数据: ', response.data)
            if (response.data.code === 200) {
              this.$Message.success(nameEnd + this.$t("message.tipSuccessGroup"));
              this.dataTransferKey = [];
              this.nameAddGroup = '';
              let localstroage = window.localStorage;
              let mobile = localstroage.getItem('mobile');

              let body = {
                token: token
              };
              let bodyStr = JSON.stringify(body);
              this.$socket.emit('messageholder', {
                sign: 1,
                type: 22,
                status: 0,
                body: bodyStr
              });
            } else {
              this.$Message.error(response.data.msg);
            }

          }, response => {
            // error callback
            this.$Message.error(this.$t("message.tipWrong"));
          });

      } //if...else...


    }, //tapAddGroupOk
    tapAddGroupEdit() {
      ////console.log('modeladdgroup确认');
      let localstroage = window.localStorage;
      let token = localstroage.getItem('token');
      let idKey = this.checkAllGroupOne;
      let name = this.devicesGroupAll[idKey].name;
      let id = this.devicesGroupAll[idKey].id;

      let nameEnd = this.nameAddGroup;
      let imeisEnd = this.dataTransferKey;

      if (nameEnd === '') {
        this.$Message.warning(this.$t("message.tipWarnGroupName"));
      } else if (imeisEnd.length === 0) {
        this.$Message.warning(this.$t("message.tipWarnGroupAccount"));
      } else {

        this.axios({
            url: 'besser/fbcc/devices/groupEdit',
            method: 'post',
            data: {
              id: id,
              token: token,
              name: nameEnd,
              groupDesc: '',
              imeis: imeisEnd
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
            //console.log('返回的数据: ', response.data)
            if (response.data.code === 200) {
              this.$Message.success(nameEnd + this.$t("message.tipSuccessGroupEdit"));
              this.dataTransferKey = [];
              this.nameAddGroup = '';
              this.checkAllGroup = [];
              this.checkAllGroupOne = false;
              let localstroage = window.localStorage;
              let mobile = localstroage.getItem('mobile');

              let body = {
                token: token
              };
              let bodyStr = JSON.stringify(body);
              this.$socket.emit('messageholder', {
                sign: 1,
                type: 22,
                status: 0,
                body: bodyStr
              });
            } else {
              this.$Message.error(response.data.msg);
            }

          }, response => {
            // error callback
            this.$Message.error(this.$t("message.tipWrong"));
          });

      } //if...else...


    }, //tapAddGroupEdit
    tapAddGroupCancel() {
      // //console.log('modeladdgroup取消:');
      this.dataTransferKey = [];
      this.nameAddGroup = '';
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        // this.checkAllGroup = this.checkAllGroupGet;

        for (var i = 0; i < this.devicesListAll.length; i++) {
          if (this.devicesListAll[i].isOnline) {
            this.checkAllGroup.push(this.devicesListAll[i].imei);
          }
        }
        let localstroage = window.localStorage;
        localstroage.setItem('imeiCheck', JSON.stringify(this.checkAllGroup));

      } else {
        this.checkAllGroup = [];
      }
    },
    handleCheckGroupOne(idx) {
      //console.log('点击分组序列：', idx);
      if (this.checkAllGroupOne !== idx) {
        this.checkAllGroup = [];
        this.checkAllGroupOne = idx;
        this.checkAllGroup = this.devicesGroupAll[idx].deviceImeis;
      } else {
        this.checkAllGroup = [];
        this.checkAllGroupOne = false;
      }

    },
    delCheckGroupOne() {
      //console.log('点击删除分组：', this.checkAllGroupOne);
      let localstroage = window.localStorage;
      let token = localstroage.getItem('token');
      let idKey = this.checkAllGroupOne;
      let name = this.devicesGroupAll[idKey].name;
      let id = this.devicesGroupAll[idKey].id;
      let modelText = "<p>" + this.$t("message.delGroupText") + "【" + name + "】?</p>";
      this.$Modal.confirm({
        title: this.$t("message.delGroup"),
        okText: this.$t('message.confirm'),
        cancelText: this.$t('message.cancel'),
        content: modelText,
        onOk: () => {

          this.axios({
              url: 'besser/fbcc/devices/groupDel',
              method: 'post',
              data: {
                token: token,
                id: id
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
              //console.log('返回的数据: ', response.data)
              if (response.data.code === 200) {
                this.$Message.info(this.$t("message.tipInfoGroupDel"));
                this.devicesGroupAll.splice(idKey, 1);
                this.checkAllGroupOne = false;
              } else {
                this.$Message.error(response.data.msg);
              }

            }, response => {
              // error callback
              this.$Message.error(this.$t("message.tipWrong"));
            });

        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },
    editCheckGroupOne() {
      //console.log('点击修改分组：', this.checkAllGroupOne);
      this.modalEditGroup = true;
      let idKey = this.checkAllGroupOne;
      let name = this.devicesGroupAll[idKey].name;
      let id = this.devicesGroupAll[idKey].id;
      let deviceImeis = this.devicesGroupAll[idKey].deviceImeis;

      this.dataTransferKey = deviceImeis;
      this.nameAddGroup = name;
      this.getDataTransfer();

    },
    checkAllGroupChange(data) {
      if (data.length === 15) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    getDevice: function() {
      //console.log('正在获取设备信息');
      let localstroage = window.localStorage;
      let token = localstroage.getItem('token');

      let body = {
        token: token
      };
      let bodyStr = JSON.stringify(body);
      this.$socket.emit('messageholder', {
        sign: 1,
        type: 21,
        status: 0,
        body: bodyStr
      });
      this.$socket.emit('messageholder', {
        sign: 1,
        type: 22,
        status: 0,
        body: bodyStr
      });

    },
    sendNotice(bodayGet) {

      if (bodayGet.ret === 1 || bodayGet.ret === 2 || bodayGet.ret === 3 || bodayGet.ret === 4) {
        this.updateTaskList(bodayGet);
      }

      let localstroage = window.localStorage;
      let switchNotice = localstroage.getItem('switchNotice');

      let typeGet = bodayGet.type;
      switch (typeGet) {
        case 82:
          this.updateRobetTaskList(bodayGet);
          break;
        case 83:
          this.updateRobetTaskList(bodayGet);
          break;
        case 84:
          this.updateRobetTaskList(bodayGet);
          break;
        case 85:
          this.updateRobetTaskList(bodayGet);
          break;
        case 86:
          this.updateRobetTaskList(bodayGet);
          break;
        case 87:
          this.updateRobetTaskList(bodayGet);
          break;
        default:

      }

      if (switchNotice === 'true') {

        let typeGet = bodayGet.type;
        switch (typeGet) {
          case 33:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.post"), bodayGet);
            break;
          case 49:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.addFriendKey"), bodayGet);
            break;
          case 50:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.addFriendSearch"), bodayGet);
            break;
          case 51:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.addFriendRecom"), bodayGet);
            break;
          case 52:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.addFriendTwo"), bodayGet);
            break;
          case 53:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.addFriendOK"), bodayGet);
            break;
          case 54:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.addFriendImport"), bodayGet);
            break;
          case 65:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.reply"), bodayGet);
            break;
          case 66:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '点赞', bodayGet);
            break;
          case 67:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '转发', bodayGet);
            break;
          case 81:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, this.$t("message.robot"), bodayGet);
            break;
          case 82:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '刷新个人时间线', bodayGet);
            break;
          case 83:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '查看动态', bodayGet);
            break;
          case 84:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '随机点赞', bodayGet);
            break;
          case 85:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '查看新闻', bodayGet);
            break;
          case 86:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '搜索', bodayGet);
            break;
          case 87:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '在时间线上分享', bodayGet);
            break;
          default:
            this.sendNoticeValue(bodayGet.ret, bodayGet.imei, '', bodayGet);
        }

      }

    },
    sendNoticeClock(bodayGet) {

      // this.updateTaskList(bodayGet);


      let localstroage = window.localStorage;
      let switchNotice = localstroage.getItem('switchNotice');

      if (switchNotice === 'true') {
        let status = bodayGet.status;
        if (status == 2000) {

          this.$Notice.success({
            title: '定时任务发布成功'
          });

        } else if (status == 4301) {

          this.$Notice.warning({
            title: '定时任务已达上限',
            duration: 0
          });

        }


      }

    },
    updateTaskList(bodayGet) {

      let batchId = bodayGet.batchId;
      let mainId = bodayGet.mainId;
      let imei = bodayGet.imei;
      let ret = bodayGet.ret;
      let type = bodayGet.type;

      let localstroage = window.localStorage;
      let mobileNow = localstroage.getItem('mobile');
      let nameKeyNow = 'taskList' + mobileNow;
      let taskListLocal = localstroage.getItem(nameKeyNow);
      if (taskListLocal !== null) {

        let taskListLocalJson = JSON.parse(localstroage.getItem(nameKeyNow));

        let taskListAll = taskListLocalJson.taskList;


        let taskListId = null;
        let searchBatchId = 0;
        for (var j = 0; j < taskListAll.length; j++) {

          if (taskListAll[j].batchId == batchId) {
            taskListId = j;
            searchBatchId = 1;

            let imeiListAll = taskListAll[taskListId].imeiList;
            let error = 0;
            let retNum = 0;
            for (var i = 0; i < imeiListAll.length; i++) {

              if (imeiListAll[i].imei === imei) {

                imeiListAll[i].ret = ret;
                if (ret === 3) {
                  imeiListAll[i].data = this.$t("message.tipNetWrong");
                } else if (ret === 4) {
                  imeiListAll[i].data = bodayGet.data;
                }

                retNum = retNum + (ret === 0 ? 0 : (ret === 1 ? 1 : 2));
                error = error + ((ret == 3 || ret == 4) ? 1 : 0);

              } else {

                retNum = retNum + (imeiListAll[i].ret === 0 ? 0 : (imeiListAll[i].ret === 1 ? 1 : 2));
                error = error + ((imeiListAll[i].ret == 3 || imeiListAll[i].ret == 4) ? 1 : 0);

              }
            }

            let progress = Math.ceil(retNum * (50 / imeiListAll.length)) > 100 ? 100 : Math.ceil(retNum * (50 / imeiListAll.length));
            if (progress === 100) {

              taskListAll[taskListId].taskStatus = this.$t("message.tipInfoTaskEnd");

              let d = new Date();
              let day = d.getDate();
              let month = d.getMonth() + 1;
              let hour = d.getHours();
              let min = d.getMinutes();
              let endTime = month + "/" + day + ' ' + hour + ':' + min;
              taskListAll[taskListId].endTime = endTime;

            }

            taskListAll[taskListId].error = error;
            taskListAll[taskListId].progress = progress;

            localstroage.setItem(nameKeyNow, JSON.stringify(taskListLocalJson));

          } //if存在

        } //for查找

        if (searchBatchId === 0) {
          //没有找到就创造个
          let startTime = this.getClockTime(mainId);
          let imeiListCreat = [{
            imei: imei,
            ret: ret
          }];

          if (ret === 3) {

            imeiListCreat = [{
              imei: imei,
              ret: ret,
              data: this.$t("message.tipNetWrong")
            }];

          } else if (ret === 4) {

            imeiListCreat = [{
              imei: imei,
              ret: ret,
              data: bodayGet.data
            }];

          }
          let retNumCreat = ret === 0 ? 0 : (ret === 1 ? 1 : 2);
          let errorCreat = (ret == 3 || ret == 4) ? 1 : 0;
          let progressCreat = Math.ceil(retNumCreat * (50 / 1));
          let taskStatusCreat = '';
          let endTimeCreat = '';
          if (progressCreat === 100) {

            taskStatusCreat = this.$t("message.tipInfoTaskEnd");

            let d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let hour = d.getHours();
            let min = d.getMinutes();
            let endTime = month + "/" + day + ' ' + hour + ':' + min;
            endTimeCreat = endTime;

          } else {

            taskStatusCreat = '任务进行中';
            endTimeCreat = '';

          }

          let taskNameCreate = '';
          switch (type) {
            case 33:
              taskNameCreate = '发帖';
              break;
            case 49:
              taskNameCreate = '搜索关键词加友';
              break;
            case 50:
              taskNameCreate = '搜索加友';
              break;
            case 51:
              taskNameCreate = '推荐加友';
              break;
            case 52:
              taskNameCreate = '添加好友的好友';
              break;
            case 53:
              taskNameCreate = '通过好友请求';
              break;
            case 54:
              taskNameCreate = '导入好友';
              break;
            case 65:
              taskNameCreate = '回复';
              break;
            case 65:
              taskNameCreate = '点赞';
              break;
            case 66:
              taskNameCreate = '转发';
              break;
            case 82:
              taskNameCreate = '刷新个人时间线';
              break;
            case 83:
              taskNameCreate = '查看动态';
              break;
            case 84:
              taskNameCreate = '随机点赞';
              break;
            case 85:
              taskNameCreate = '查看新闻';
              break;
            case 86:
              taskNameCreate = '搜索';
              break;
            case 87:
              taskNameCreate = '在时间线上分享';
              break;
            default:
              taskNameCreate = '任务';
          }


          let taskListOne = {
            mainId: mainId,
            batchId: batchId,
            taskName: taskNameCreate,
            taskType: type,
            startTime: startTime,
            endTime: endTimeCreat,
            taskStatus: taskStatusCreat,
            progress: progressCreat,
            error: errorCreat,
            imeiList: imeiListCreat
          }

          taskListLocalJson.taskList.unshift(taskListOne);

          let taskListAllLocalString = JSON.stringify(taskListLocalJson);
          localstroage.setItem(nameKeyNow, taskListAllLocalString);

        } //没有找到


      } else {
        //本地没有，创建
        let startTime = this.getClockTime(mainId);
        let imeiListCreat = [{
          imei: imei,
          ret: ret
        }];

        if (ret === 3) {

          imeiListCreat = [{
            imei: imei,
            ret: ret,
            data: this.$t("message.tipNetWrong")
          }];

        } else if (ret === 4) {

          imeiListCreat = [{
            imei: imei,
            ret: ret,
            data: bodayGet.data
          }];

        }
        let retNumCreat = ret === 0 ? 0 : (ret === 1 ? 1 : 2);
        let errorCreat = (ret == 3 || ret == 4) ? 1 : 0;
        let progressCreat = Math.ceil(retNumCreat * (50));
        if (progressCreat === 100) {

          taskStatusCreat = this.$t("message.tipInfoTaskEnd");

          let d = new Date();
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let hour = d.getHours();
          let min = d.getMinutes();
          let endTime = month + "/" + day + ' ' + hour + ':' + min;
          endTimeCreat = endTime;

        } else {

          taskStatusCreat = '任务进行中';
          endTimeCreat = '';

        }

        let taskNameCreate = '';
        switch (type) {
          case 33:
            taskNameCreate = '发帖';
            break;
          case 49:
            taskNameCreate = '搜索关键词加友';
            break;
          case 50:
            taskNameCreate = '搜索加友';
            break;
          case 51:
            taskNameCreate = '推荐加友';
            break;
          case 52:
            taskNameCreate = '添加好友的好友';
            break;
          case 53:
            taskNameCreate = '通过好友请求';
            break;
          case 54:
            taskNameCreate = '导入好友';
            break;
          case 65:
            taskNameCreate = '回复';
            break;
          case 66:
            taskNameCreate = '点赞';
            break;
          case 67:
            taskNameCreate = '转发';
            break;
          case 82:
            taskNameCreate = '刷新个人时间线';
            break;
          case 83:
            taskNameCreate = '查看动态';
            break;
          case 84:
            taskNameCreate = '随机点赞';
            break;
          case 85:
            taskNameCreate = '查看新闻';
            break;
          case 86:
            taskNameCreate = '搜索';
            break;
          case 87:
            taskNameCreate = '在时间线上分享';
            break;
          default:
            taskNameCreate = '任务';
        }


        let taskListOne = {
          mainId: mainId,
          batchId: batchId,
          taskName: taskNameCreate,
          taskType: type,
          startTime: startTime,
          endTime: endTimeCreat,
          taskStatus: taskStatusCreat,
          progress: progressCreat,
          error: errorCreat,
          imeiList: imeiListCreat
        }

        let taskList = {
          taskList: [taskListOne]
        }
        let taskListAllLocalString = JSON.stringify(taskList);
        localstroage.setItem(nameKeyNow, taskListAllLocalString);


      }

    },


    updateRobetTaskList(bodayGet) {

      let batchId = bodayGet.batchId;
      let mainId = bodayGet.mainId;
      let imei = bodayGet.imei;
      let ret = bodayGet.ret;
      let type = bodayGet.type;

      let localstroage = window.localStorage;
      let mobileNow = localstroage.getItem('mobile');
      let nameKeyNow = 'robotTaskList' + mobileNow;
      let taskListLocal = localstroage.getItem(nameKeyNow);
      if (taskListLocal !== null) {

        let taskListLocalJson = JSON.parse(localstroage.getItem(nameKeyNow));

        let taskListAll = taskListLocalJson.taskList;


        let taskListId = null;
        let searchBatchId = 0;
        for (var j = 0; j < taskListAll.length; j++) {

          if (taskListAll[j].batchId == batchId) {
            taskListId = j;
            searchBatchId = 1;

            let imeiListAll = taskListAll[taskListId].imeiList;
            let error = 0;
            let retNum = 0;
            for (var i = 0; i < imeiListAll.length; i++) {

              if (imeiListAll[i].imei === imei) {

                imeiListAll[i].ret = ret;
                if (ret === 3) {
                  imeiListAll[i].data = this.$t("message.tipNetWrong");
                } else if (ret === 4) {
                  imeiListAll[i].data = bodayGet.data;
                }

                retNum = retNum + (ret === 0 ? 0 : (ret === 1 ? 1 : 2));
                error = error + ((ret == 3 || ret == 4) ? 1 : 0);

              } else {

                retNum = retNum + (imeiListAll[i].ret === 0 ? 0 : (imeiListAll[i].ret === 1 ? 1 : 2));
                error = error + ((imeiListAll[i].ret == 3 || imeiListAll[i].ret == 4) ? 1 : 0);

              }
            }

            let progress = Math.ceil(retNum * (50 / imeiListAll.length)) > 100 ? 100 : Math.ceil(retNum * (50 / imeiListAll.length));
            if (progress === 100) {

              taskListAll[taskListId].taskStatus = this.$t("message.tipInfoTaskEnd");

              let d = new Date();
              let day = d.getDate();
              let month = d.getMonth() + 1;
              let hour = d.getHours();
              let min = d.getMinutes();
              let endTime = month + "/" + day + ' ' + hour + ':' + min;
              taskListAll[taskListId].endTime = endTime;

            }

            taskListAll[taskListId].error = error;
            taskListAll[taskListId].progress = progress;

            localstroage.setItem(nameKeyNow, JSON.stringify(taskListLocalJson));

          } //if存在

        } //for查找

        if (searchBatchId === 0) {
          //没有找到就创造个
          let startTime = this.getClockTime(mainId);
          let imeiListCreat = [{
            imei: imei,
            ret: ret
          }];

          if (ret === 3) {

            imeiListCreat = [{
              imei: imei,
              ret: ret,
              data: this.$t("message.tipNetWrong")
            }];

          } else if (ret === 4) {

            imeiListCreat = [{
              imei: imei,
              ret: ret,
              data: bodayGet.data
            }];

          }
          let retNumCreat = ret === 0 ? 0 : (ret === 1 ? 1 : 2);
          let errorCreat = (ret == 3 || ret == 4) ? 1 : 0;
          let progressCreat = Math.ceil(retNumCreat * (50 / 1));
          let taskStatusCreat = '';
          let endTimeCreat = '';
          if (progressCreat === 100) {

            taskStatusCreat = this.$t("message.tipInfoTaskEnd");

            let d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let hour = d.getHours();
            let min = d.getMinutes();
            let endTime = month + "/" + day + ' ' + hour + ':' + min;
            endTimeCreat = endTime;

          } else {

            taskStatusCreat = '任务进行中';
            endTimeCreat = '';

          }

          let taskNameCreate = '';
          switch (type) {
            case 82:
              taskNameCreate = '刷新个人时间线';
              break;
            case 83:
              taskNameCreate = '查看动态';
              break;
            case 84:
              taskNameCreate = '随机点赞';
              break;
            case 85:
              taskNameCreate = '查看新闻';
              break;
            case 86:
              taskNameCreate = '搜索';
              break;
            case 87:
              taskNameCreate = '在时间线上分享';
              break;
            default:
              taskNameCreate = '任务';
          }


          let taskListOne = {
            mainId: mainId,
            batchId: batchId,
            taskName: taskNameCreate,
            taskType: type,
            startTime: startTime,
            endTime: endTimeCreat,
            taskStatus: taskStatusCreat,
            progress: progressCreat,
            error: errorCreat,
            imeiList: imeiListCreat
          }

          taskListLocalJson.taskList.unshift(taskListOne);

          let taskListAllLocalString = JSON.stringify(taskListLocalJson);
          localstroage.setItem(nameKeyNow, taskListAllLocalString);

        } //没有找到


      } else {
        //本地没有，创建
        let startTime = this.getClockTime(mainId);
        let imeiListCreat = [{
          imei: imei,
          ret: ret
        }];

        if (ret === 3) {

          imeiListCreat = [{
            imei: imei,
            ret: ret,
            data: this.$t("message.tipNetWrong")
          }];

        } else if (ret === 4) {

          imeiListCreat = [{
            imei: imei,
            ret: ret,
            data: bodayGet.data
          }];

        }
        let retNumCreat = ret === 0 ? 0 : (ret === 1 ? 1 : 2);
        let errorCreat = (ret == 3 || ret == 4) ? 1 : 0;
        let progressCreat = Math.ceil(retNumCreat * (50 / 1));
        let taskStatusCreat = '';
        let endTimeCreat = '';
        if (progressCreat === 100) {

          taskStatusCreat = this.$t("message.tipInfoTaskEnd");

          let d = new Date();
          let day = d.getDate();
          let month = d.getMonth() + 1;
          let hour = d.getHours();
          let min = d.getMinutes();
          let endTime = month + "/" + day + ' ' + hour + ':' + min;
          endTimeCreat = endTime;

        } else {

          taskStatusCreat = '任务进行中';
          endTimeCreat = '';

        }

        let taskNameCreate = '';
        switch (type) {
          case 82:
            taskNameCreate = '刷新个人时间线';
            break;
          case 83:
            taskNameCreate = '查看动态';
            break;
          case 84:
            taskNameCreate = '随机点赞';
            break;
          case 85:
            taskNameCreate = '查看新闻';
            break;
          case 86:
            taskNameCreate = '搜索';
            break;
          case 87:
            taskNameCreate = '在时间线上分享';
            break;
          default:
            taskNameCreate = '任务';
        }


        let taskListOne = {
          mainId: mainId,
          batchId: batchId,
          taskName: taskNameCreate,
          taskType: type,
          startTime: startTime,
          endTime: endTimeCreat,
          taskStatus: taskStatusCreat,
          progress: progressCreat,
          error: errorCreat,
          imeiList: imeiListCreat
        }

        let taskList = {
          taskList: [taskListOne]
        }
        let taskListAllLocalString = JSON.stringify(taskList);
        localstroage.setItem(nameKeyNow, taskListAllLocalString);


      }

    },

    getClockTime(mainId) {
      //console.log('时间传入：', mainId);
      let sendTime = mainId.substr(0, 13);
      //console.log('时间传入2：', sendTime);
      let d = new Date(Number(sendTime));
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let hour = d.getHours();
      let min = d.getMinutes();
      let postTime = month + "/" + day + ' ' + hour + ':' + min;
      //console.log('时间传入3：', postTime);
      return postTime;
    },

    sendNoticeValue(ret, imei, dec, bodayGet) {

      // let noticeDec = ret === 1 ? '设备['+imei+']正在执行'+dec+'任务' : (ret === 2 ? '设备['+imei+']'+dec+'成功' : '设备['+imei+']异常');

      if (ret === 1) {

        this.$Notice.info({
          title: this.$t("message.tipInfoTaskTitle"),
          desc: '【' + imei + '： ' + dec + '】' + this.$t("message.tipInfoTaskText")
        });

      } else if (ret === 2) {

        this.$Notice.success({
          title: this.$t("message.tipInfoTaskTitle"),
          desc: '【' + imei + '： ' + dec + '】' + this.$t("message.tipSuccessTaskText")
        });

      } else if (ret === 3) {

        this.$Notice.error({
          title: this.$t("message.tipNetWrong"),
          desc: '【' + imei + '】' + this.$t("message.tipErrorTaskTextNet"),
          duration: 0
        });

      } else if (ret === 4) {

        this.$Notice.error({
          title: this.$t("message.tipErrorTaskTitle"),
          desc: '【' + imei + '】' + this.$t("message.tipErrorTaskTextWrong") + bodayGet.data
        });

      } else if (ret === 5) {

        this.$Notice.open({
          title: this.$t("message.tipOpenTaskTrack"),
          desc: '【' + imei + '】' + this.$t("message.tipOpenTaskTextTrack") + bodayGet.data
        });

      } else if (ret === 6) {

        this.$Notice.success({
          title: this.$t("message.tipInfoTaskTitle"),
          desc: this.$t("message.tipSuccessTaskClockText")
        });

      } else {

        this.$Notice.warning({
          title: this.$t("message.tipInfoTaskTitle")
        });

      }

    },
    tapWinMinus() {
      //console.log('===缩小窗口===');
      ipcRenderer.send('surfbird:window:minimize', true);
    },
    tapWinClose() {
      //console.log('===关闭窗口===');
      ipcRenderer.send('surfbird:window:close', true);
    },
    tapSwitchGroupEdit(params){
          let imei = [];
          imei = params ? params.imei:this.selectedData
          if(!imei.length){
              this.$Message.error('请选择操作设备');
              return;
          }
          let token = window.localStorage.getItem("token");
          let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
          let mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
          let tasks = [{
              data: "",
              batchId: batchId,
              type: 120,
          }]
          let body = {
              token: token,
              mainId: mainId,
              delaySecond: 0,
              category: 0,
              imei: imei,
              tasks: tasks
          }

          let bodyStr = JSON.stringify(body)
          this.$socket.emit("messageholder", {
              sign: 1,
              type: 33,
              status: 0,
              body: bodyStr
          });
          this.$Message.info('已提交切换账号请求');
          this.modalOperate = false;
    },
    getSelectionData(val) {
        this.selectedData = [];
        for(let i=0;i<val.length;i++){
            this.selectedData.push(val[i].imei);
        }
    }
  }, //methods
  sockets: {
    reconnect: function(val) {
      //console.log('成功连接reconnect', val);
      window.sessionStorage.setItem('network', '200');

      this.getDevice();

    },
    connect_error: function(val) {
      //console.log('连接失败了！！！！', val);
      window.sessionStorage.setItem('network', 'connect_error');
      this.devicesListAll = [];
      this.devicesGroupAll = [];
      this.checkAllGroup = [];
      var localstroage = window.localStorage;
      var token = localstroage.getItem('token');

      if (token) {
        this.$router.push('/500');
      } else {
        this.$router.push('/login');
      }

    },
    messageholder(value) {
      // //console.log('检验token',value);
      switch (value.type) {
        case 21:
          //console.log('获取的所有设备信息：', value.body)
          if (value.status === 2000) {
            let localstroage = window.localStorage;
            localstroage.setItem('devicesListAll', '');
            this.devicesListAllImei = [];
            let bodayGet = JSON.parse(value.body);
            this.devicesListAll = bodayGet.devices;
            for (var i = 0; i < this.devicesListAll.length; i++) {
              this.devicesListAllImei.push(this.devicesListAll[i].imei);
            }

            localstroage.setItem('devicesListAll', this.devicesListAllImei);
            this.showDevice();
          } else {
            // this.$Message.error('获取设备信息失败，请重试');
          }
          break;
        case 22:
          if (value.status === 2000) {
            let bodayGet = JSON.parse(value.body);
            this.devicesGroupAll = bodayGet.deviceGroups;
            //console.log('所有分组信息：', bodayGet)
          } else {
            // this.$Message.error('获取设备信息失败，请重试');
          }
          break;
        case 34:
          //console.log('任务反馈数据', value);
          if (value.sign === 3) {

            let bodayGet = JSON.parse(value.body);
            this.sendNotice(bodayGet);


          } else {
            // this.$Message.error('获取设备信息失败，请重试');
          }
          break;
        case 24:
          //console.log('延迟发帖反馈数据', value);
          if (value.sign === 2) {

            if (value.status == 2000) {

              this.$Notice.success({
                title: '定时任务发布成功'
              });

            } else if (value.status == 4301) {

              this.$Notice.warning({
                title: '定时任务已达上限',
                duration: 0
              });

            }
            // let bodayGet = JSON.parse(value.body);
            // this.sendNoticeClock(bodayGet);


          } else {
            // this.$Message.error('获取设备信息失败，请重试');
          }
          break;
        case 85:
          if (value.sign === 3) {

            let bodayGet = JSON.parse(value.body);
            this.$Notice.success({
              title: this.$t("message.tipSuccessAccountUp") + '[' + bodayGet.imei + ']',
            });
            let devicesListAllImei = this.devicesListAllImei;
            let getDeviceId = devicesListAllImei.indexOf(bodayGet.imei);
            this.devicesListAll[getDeviceId].isOnline = true;

            let localstroage = window.localStorage;
            let deviceListAllOnline = localstroage.getItem('deviceListAllOnline');
            if (deviceListAllOnline === '') {
              deviceListAllOnline = [];
            } else {
              deviceListAllOnline = deviceListAllOnline.split(",");
            }

            let deviceListAllOffline = localstroage.getItem('deviceListAllOffline');
            if (deviceListAllOffline === '') {
              deviceListAllOffline = [];
            } else {
              deviceListAllOffline = deviceListAllOffline.split(",");
            }

            for (var i = 0; i < deviceListAllOffline.length; i++) {

              if (deviceListAllOffline[i] === bodayGet.imei) {
                deviceListAllOffline.splice(i, 1);
                deviceListAllOnline.push(bodayGet.imei);
              }

            }
            localstroage.setItem('deviceListAllOnline', deviceListAllOnline);
            localstroage.setItem('deviceListAllOffline', deviceListAllOffline);

          } else {
            // this.$Message.error('获取设备信息失败，请重试');
          }
          break;
        case 86:
          if (value.sign === 3) {

            let bodayGet = JSON.parse(value.body);
            this.$Notice.warning({
              title: this.$t("message.tipWarnAccountDown") + '[' + bodayGet.imei + ']',
            });

            // //console.log('新设备下线信息：', bodayGet.imei)
            let devicesListAllImei = this.devicesListAllImei;
            // //console.log('devicesListAllImei数组：', devicesListAllImei)
            for (var i = 0; i < devicesListAllImei.length; i++) {

              if (devicesListAllImei[i] === bodayGet.imei) {
                this.devicesListAll[i].isOnline = false;
              }

              for (var j = 0; j < this.checkAllGroup.length; j++) {

                if (devicesListAllImei[i] === this.checkAllGroup[j]) {
                  this.checkAllGroup.splice(j, 1);
                }

              }



            }

            let localstroage = window.localStorage;
            let deviceListAllOnline = localstroage.getItem('deviceListAllOnline');
            if (deviceListAllOnline === '') {
              deviceListAllOnline = [];
            } else {
              deviceListAllOnline = deviceListAllOnline.split(",");
            }

            let deviceListAllOffline = localstroage.getItem('deviceListAllOffline');
            if (deviceListAllOffline === '') {
              deviceListAllOffline = [];
            } else {
              deviceListAllOffline = deviceListAllOffline.split(",");
            }
            for (var i = 0; i < deviceListAllOnline.length; i++) {

              if (deviceListAllOnline[i] === bodayGet.imei) {
                deviceListAllOnline.splice(i, 1);
                deviceListAllOffline.push(bodayGet.imei);
              }

            }
            localstroage.setItem('deviceListAllOnline', deviceListAllOnline);
            localstroage.setItem('deviceListAllOffline', deviceListAllOffline);

            // this.showDevice();
          } else {
            // this.$Message.error('获取设备信息失败，请重试');
          }
          break;
        default:

      }
    }
  },
}
</script>
