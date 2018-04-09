<style scoped>
.example-split {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border: 1px dashed #eee;
}

.example-case {
  padding: 20px;
}

.example-header {
  font-weight: 500;
  margin: 30px 0 10px;
  position: relative;
}

.example-header:before {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #eee;
  position: absolute;
  top: 10px;
  left: 0;
}

.example-header span {
  display: inline-block;
  background: #fff;
  padding: 0 5px 0 10px;
  position: relative;
  margin-left: 10px;
  font-size: 14px;
}

.example-desc {
  font-size: 12px;
  padding: 10px 20px 20px 20px;
}
</style>

<template>

<Tabs value="addPhone">
    <TabPane :label="$t('message.settingAccount')" name="addPhone">
        <!-- addPhone -->
        <Row type="flex" justify="center" align="top" class="code-row-bg" style="padding-top:20px;overflow:auto;height:480px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <p>{{ $t("message.allacc") }}</p>
                                <RadioGroup v-model="devicesListAllChoose" vertical>
                                    <div v-if="devicesListAll.length > 0">

                                        <div v-for="(item, idx) in devicesListAll" :key="idx">
                                            <Radio :label="item">
                                                <Icon type="social-android"></Icon>
                                                <span>{{item}}</span>
                                                <Button type="text" @click="tapDeviceDel(idx)" v-if="item === devicesListAllChoose">{{ $t("message.settingAccountDel") }}</Button>
                                            </Radio>
                                        </div>

                                    </div>
                                    <div v-else>
                                        <h3 style="padding-top:15px;color:#888888;">{{$t('message.noBindDevice')}}</h3>
                                    </div>
                                </RadioGroup>

                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.settingAccountDec") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form ref="formDynamic" :model="formDynamic" :label-width="80">
                                <FormItem v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="$t('message.account') + item.index" :prop="'items.' + index + '.value'" :rules="{required: true, message: ' ', trigger: 'blur'}">
                                    <Row>
                                        <Col span="18">
                                            <Input type="text" v-model="item.value" :placeholder="$t('message.settingAccountNumPlaceholder')"></Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Button type="ghost" @click="handleRemove(index)">{{ $t("message.delete") }}</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Row>
                                        <Col span="12">
                                            <Button type="dashed" long @click="handleAdd" icon="plus-round">{{ $t("message.settingAccountAdd") }}</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formDynamic')" long>{{ $t("message.confirm") }}</Button>

                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- addPhone end -->
    </TabPane>
    <TabPane :label="$t('message.settingLoginPw')" name="changePW">
        <!-- changePW -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:20px;">
            <Col span="12">

                <Card style="width:350px">
                    <div style="text-align:center">
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                            <FormItem :label="$t('message.settingLoginAccount')">
                                {{accountInfo}}
                            </FormItem>
                            <FormItem :label="$t('message.settingLoginOldPw')" prop="oldPasswd">
                                <Input type="password" v-model="formCustom.oldPasswd"></Input>
                            </FormItem>
                            <FormItem :label="$t('message.settingLoginNewPw')" prop="passwd">
                                <Input type="password" v-model="formCustom.passwd"></Input>
                            </FormItem>
                            <FormItem :label="$t('message.settingLoginNewPwCheck')" prop="passwdCheck">
                                <Input type="password" v-model="formCustom.passwdCheck"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="tapChangePW('formCustom')" long>{{ $t("message.confirm") }}</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>

            </Col>
        </Row>
        <!-- changePW end -->
    </TabPane>
    <TabPane :label="$t('message.settingMyAccount')" name="myAccound">
        <!-- myAccound -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:20px;">
            <Col span="12">
                <Card style="width:350px">
                    <div style="text-align:center">
                        <Form>
                            <FormItem :label="$t('message.settingLoginAccount')">
                                {{accountInfo}}
                            </FormItem>
                            <FormItem :label="$t('message.settingMyAccountTime')">
                                {{loginTime}}
                            </FormItem>
                            <FormItem>
                                <Button type="error" @click="logout" long>{{ $t("message.settingMyAccountLogout") }}</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>

            </Col>
        </Row>
        <!-- myAccound end -->
    </TabPane>
    <TabPane :label="$t('message.otherSetting')" name="otherSetting">
        <!-- myAccound -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:20px;">
            <Col span="12">
                <!-- <Card style="width:350px">
                    
                </Card> -->
                <div style="text-align:center">
                    <Button type="primary" long @click="checkAppUpdate">检查app更新</Button>
                </div>
            </Col>
        </Row>
        <!-- myAccound end -->
    </TabPane>
</Tabs>

</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        // callback(new Error('请输入你的xin'));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.tipReginPw")));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error(this.$t("message.tipReginPwCheck")));
      } else {
        callback();
      }
    };
    return {
      accountInfo: "",
      loginTime: "",
      devicesListAll: [],
      devicesListAllChoose: "",
      index: 1,
      formDynamic: {
        items: [
          {
            value: "",
            index: 1,
            status: 1
          }
        ]
      },
      formCustom: {
        oldPasswd: "",
        passwd: "",
        passwdCheck: ""
      },
      ruleCustom: {
        oldPasswd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        passwd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        passwdCheck: [
          {
            validator: validatePassCheck,
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getDevice();
    this.getInfo();
  },
  methods: {
    getDevice: function() {
      this.devicesListAll = [];
      let localstroage = window.localStorage;
      let devicesListAllLocal = localstroage.getItem("devicesListAll");
      if (devicesListAllLocal !== "") {
        this.devicesListAll = devicesListAllLocal.split(",");
      }
    },
    getInfo: function() {
      let localstroage = window.localStorage;
      this.accountInfo = localstroage.getItem("mobile");
      this.loginTime = localstroage.getItem("loginTime");
    },
    checkImeiOnline() {
          let localstroage = window.localStorage;
          let imeiGet = localstroage.getItem('devicesList').split(",");
          let deviceListAllOnline = localstroage.getItem('deviceListAllOnline').split(",");
          let imei = [];
          if (imeiGet[0] !== '' && deviceListAllOnline[0] !== '') {
              for (let i = 0; i < imeiGet.length; i++) {
                  if (deviceListAllOnline.indexOf(imeiGet[i]) !== -1) {
                      imei.push(imeiGet[i]);
                  }
              }
          }

          var imeiNew = [];
          for (let i = 0, l = imei.length; i < l; i++) {
              for (let j = i + 1; j < l; j++)
                  if (imei[i] === imei[j]) j = ++i;
              imeiNew.push(imei[i]);
          }

          return imeiNew;
      },
    checkAppUpdate() {
        let imei = this.checkImeiOnline();
        let token = window.localStorage.getItem("token");
        let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
        let mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
        let tasks = [{
            data: "",
            batchId: batchId,
            type: 118,
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
        this.$Message.info(this.$t('message.submitUpdateRequest'))
    },
    tapDeviceDel(idx) {
      let network = window.sessionStorage.getItem("network");

      if (network !== "200") {
        this.$Message.error(this.$t("message.tipNetWrong"));
      } else {
        this.$Modal.confirm({
          title: this.$t("message.settingAccountTitle"),
          content: this.$t("message.unbindAccountDec"),
          onOk: () => {
            let localstroage = window.localStorage;
            let mobileEnd = localstroage.getItem("mobile");
            let token = localstroage.getItem("token");
            let imei = this.devicesListAll[idx];
            this.axios({
              url: "besser/fbcc/devices/deviceUnbind",
              method: "post",
              data: {
                token: token,
                mobile: mobileEnd,
                imei: imei
              },
              transformRequest: [
                function(data) {
                  // Do whatever you want to transform the data
                  let ret = "";
                  for (let it in data) {
                    ret +=
                      encodeURIComponent(it) +
                      "=" +
                      encodeURIComponent(data[it]) +
                      "&";
                  }
                  return ret;
                }
              ],
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(
              response => {
                if (response.data.code === 200) {
                  this.$Notice.success({
                    title: this.$t('message.unbindSuccess')
                  });

                  this.devicesListAll.splice(idx, 1);

                  let body = {
                    token: token
                  };
                  let bodyStr = JSON.stringify(body);
                  this.$socket.emit("messageholder", {
                    sign: 1,
                    type: 21,
                    status: 0,
                    body: bodyStr
                  });
                } else {
                  this.$Notice.warning({
                    title: this.$t('message.unbindFail'),
                    desc: imei + response.data.msg
                  });
                }
              },
              response => {
                // error callback
                this.$Message.error(this.$t("message.tipWrong"));
              }
            );
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      } //if network
    },
    handleSubmit(name) {
      let network = window.sessionStorage.getItem("network");

      if (network !== "200") {
        this.$Message.error(this.$t("message.tipNetWrong"));
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            let localstroage = window.localStorage;
            let mobileEnd = localstroage.getItem("mobile");
            let token = localstroage.getItem("token");
            let items = this.formDynamic.items;
            for (var i = 0; i < items.length; i++) {
              let idx = items[i].index;
              let status = items[i].status;
              let imei = items[i].value;

              if (status === 1) {
                this.axios({
                  url: "besser/fbcc/devices/deviceBind",
                  method: "post",
                  data: {
                    token: token,
                    mobile: mobileEnd,
                    imei: imei
                  },
                  transformRequest: [
                    function(data) {
                      // Do whatever you want to transform the data
                      let ret = "";
                      for (let it in data) {
                        ret +=
                          encodeURIComponent(it) +
                          "=" +
                          encodeURIComponent(data[it]) +
                          "&";
                      }
                      return ret;
                    }
                  ],
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                }).then(
                  response => {
                    if (response.data.code === 200) {
                      this.$Notice.success({
                        title: this.$t('message.tipSuccessSettingAccountOk')
                      });

                      this.formDynamic.items[idx].status = 0;

                      let body = {
                        token: token
                      };
                      let bodyStr = JSON.stringify(body);
                      this.$socket.emit("messageholder", {
                        sign: 1,
                        type: 21,
                        status: 0,
                        body: bodyStr
                      });
                    } else {
                      this.$Notice.warning({
                        title: this.$t('message.tipErrorSettingAccountFail'),
                        desc: imei + response.data.msg
                      });
                    }
                  },
                  response => {
                    // error callback
                    this.$Message.error(this.$t("message.tipWrong"));
                  }
                );
              } //if...else
            }
          } else {
            this.$Message.error(this.$t("message.tipWrong"));
          }
        });
      } //if network
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    },
    logout() {
      this.$Message.loading(this.$t("message.tipLoadLogout"));
      let localstroage = window.localStorage;
      let mobile = localstroage.getItem("mobile");
      let token = localstroage.getItem("token");

      let body = {
        mobile: mobile,
        token: token
      };
      let bodyStr = JSON.stringify(body);
      this.$socket.emit("messageholder", {
        sign: 1,
        type: 19,
        status: 0,
        body: bodyStr
      });

      this.$Message.warning(this.$t("message.tipSuccessLogout"));
      localstroage.removeItem("token");
      localstroage.removeItem("mobile");

      this.$router.push("/login");
    },
    tapChangePW(name) {
      let network = window.sessionStorage.getItem("network");

      if (network !== "200") {
        this.$Message.error(this.$t("message.tipNetWrong"));
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            let Base64 = require("js-base64").Base64;
            let sha256 = require("js-sha256").sha256;

            let mobileEnd = this.accountInfo;
            let oldPasswordGet = this.formCustom.oldPasswd;
            let oldPasswordEnd = Base64.encode(sha256(oldPasswordGet));
            let newPasswordGet = this.formCustom.passwdCheck;
            let newPasswordEnd = Base64.encode(sha256(newPasswordGet));

            this.axios({
              url: "besser/fbcc/accounts/modifyPassword",
              method: "post",
              data: {
                mobile: mobileEnd,
                oldPassword: oldPasswordEnd,
                newPassword: newPasswordEnd
              },
              transformRequest: [
                function(data) {
                  // Do whatever you want to transform the data
                  let ret = "";
                  for (let it in data) {
                    ret +=
                      encodeURIComponent(it) +
                      "=" +
                      encodeURIComponent(data[it]) +
                      "&";
                  }
                  return ret;
                }
              ],
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }).then(
              response => {
                if (response.data.code === 200) {
                  this.$Message.success(this.$t("message.tipSuccessGroupEdit"));
                  this.formCustom = {
                    oldPasswd: "",
                    passwd: "",
                    passwdCheck: ""
                  };
                } else {
                  this.$Message.error(response.data.msg);
                }
              },
              response => {
                // error callback
                this.$Message.error(this.$t("message.tipWrong"));
              }
            );
          } else {
            this.$Message.error(this.$t("message.tipWrong"));
          }
        });
      } //if network
    }
  },
  sockets: {
    messageholder(value) {
      // console.log('检验token',value);

      if (value.type === 19 && value.status === 2000) {
        // this.$Message.warning('退出登录成功');
        let localstroage = window.localStorage;
        localstroage.setItem("token", "");
        localstroage.setItem("mobile", "");
        this.$router.push("/login");
      }
    }
  }
};
</script>
