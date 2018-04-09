<style scoped>

.ivu-row-flex {
    background: #f0f2f5;
    background-image: url(../../assets/backgroundimg.svg);
    width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 0 0 157px 0;
    position: relative;
}

.header-background {
    -webkit-app-region: no-drag;
    background-color: #ffffff;
    margin-top: 100px;
    padding-bottom: 30px;
    border-radius: 10px;
}

.header-logo {
    text-align: center;
    margin: 30px 0 20px 0;
}

.login-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

.header-dec {
    text-align: center;
    padding-bottom: 50px;
}

.header-form {
    text-align: center;
}

.ivu-form-item {
    margin-bottom: 15px;
}

.footer {
    position: absolute;
    width: 100%;
    margin: 120px 0 24px 0;
    text-align: center;
}

.footer-dec {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}

</style>

<template>

<Row type="flex" justify="center" align="middle" >
    <div style="position:absolute; right: 15px;top: 5px;font-size:20px;-webkit-app-region: no-drag;">
        <Dropdown trigger="click" @on-click="tapRightMenu">
            <a href="javascript:void(0)">
                <Icon type="navicon-round" style="padding-right:8px;color:#353535;"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="loop">
                    <Icon type="loop" style="padding-right:5px;"></Icon>刷新页面
                </DropdownItem>
                <DropdownItem divided name="aboutus">
                    <Icon type="person-stalker" style="padding-right:5px;"></Icon>关于百森
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <a @click="tapWinMinus">
            <Icon type="minus-round" style="padding-right:8px;color:#353535;"></Icon>
        </a>
        <a @click="tapWinClose">
            <Icon type="close-round" style="color:#353535;"></Icon>
        </a>
    </div>
    <Col span="8" class="header-background">
        <div class="header-logo">
            <img src="../../assets/logo.jpeg" class="logo-img">
        </div>
        <div class="header-dec">
            <p>
                {{ $t("message.slogan") }}
            </p>
        </div>
        <div class="header-form">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
                <FormItem prop="mobile">
                    <Input icon="ios-email-outline" type="email" v-model.trim="formCustom.mobile" placeholder="账号" style="width: 200px;"></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" icon="ios-locked-outline" v-model.trim="formCustom.password" placeholder="登录密码" style="width: 200px;"></Input>
                </FormItem>
                <FormItem style="margin-bottom:-5px;">
                    <Row>
                        <Col span="12" style="padding-left:45px;">
                            <Checkbox v-model="checkboxLogin">记住账号</Checkbox>
                        </Col>
                        <Col span="12" style="float:right;padding-right:15px;">
                            <router-link to="/ForgetPw">忘记密码</router-link>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')" long style="width:200px;margin-top:8px;margin-bottom:15px;"> 立即登录 </Button>
                </FormItem>
            </Form>

            <!-- <Button type="primary" long style="width:200px;margin-top:15px;margin-bottom:15px;"> 登 录 </Button> -->
            <br />
            <router-link to="/Register">没有登录账号？去注册</router-link>
            <br>
            后台测试api修改入口：<Input v-model="IPnow" placeholder="http://api.thebesser.com" style="width: 200px"></Input>
        </div>

        <div class="footer">
            <div class="footer-dec">
                Copyright © 2018 百森科技出品
                <!-- 配置IP -->
                <!-- 配置IP end -->
            </div>
        </div>

    </Col>
</Row>

</template>

<script>

const ipcRenderer = require('electron').ipcRenderer;
export default {
    data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('至少6位密码'));
                }
            };
            const validateMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,20}$/.test(value))) {
                        return callback(new Error('邮箱格式错误'));
                    }
                }
            };

            return {
                IPnow: 'http://api.thebesser.com',  //配置IP
                checkboxLogin: true,
                formCustom: {
                    password: '',
                    mobile: ''
                },
                ruleCustom: {
                    password: [{
                        trigger: 'blur'
                    }],
                    mobile: [{
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            this.getKeepLoginInfo();
            this.getIPnow();
        },
        watch: {
          IPnow: function(val, oldVal) {
              if(!val) {
                  this.IPnow = 'http://api.thebesser.com';
              }
            let localstroage = window.localStorage;
            localstroage.setItem('IPnow', val);
          }
        },
        methods: {
                getIPnow() {
                  //配置IP
                  let localstroage = window.localStorage;
                  this.IPnow = localstroage.getItem('IPnow');
                  if(this.IPnow === null || this.IPnow === '') {
                    localstroage.setItem('IPnow', 'http://api.thebesser.com');
                    this.IPnow = 'http://api.thebesser.com';
                  }
                },
                getKeepLoginInfo() {
                    let localstroage = window.localStorage;
                    let keepLoginInfoString = localstroage.getItem('keepLoginInfo');
                    if (keepLoginInfoString !== null) {
                        let keepLoginInfoObj = JSON.parse(keepLoginInfoString);
                        this.formCustom.mobile = keepLoginInfoObj.keepUserName;
                        this.formCustom.password = keepLoginInfoObj.keepPassWord;
                    }

                },
                handleSubmit(name) {
                    // this.$Message.info('01');
                    let Base64 = require('js-base64').Base64;
                    let sha256 = require('js-sha256').sha256;

                    let mobileEnd = this.formCustom.mobile;
                    let passwordGet = this.formCustom.password;
                    let passwordEnd = Base64.encode(sha256(passwordGet));

                    if (mobileEnd === '') {

                        this.$Message.warning(this.$t('message.tipLoginWord'));

                    } else if (passwordGet === '' || passwordGet.length < 6) {

                        this.$Message.warning(this.$t('message.tipLoginWord'));

                    } else {

                        let network = window.sessionStorage.getItem('network');

                        if (network !== '200') {

                            this.$Message.error(this.$t('message.tipNetworkWrong'));

                        } else {


                            var localstroage = window.localStorage;
                            if (this.checkboxLogin) {

                                let keepLoginInfo = {
                                    keepUserName: mobileEnd,
                                    keepPassWord: passwordGet
                                }

                                localstroage.setItem('keepLoginInfo', JSON.stringify(keepLoginInfo));

                            } else {

                                let keepLoginInfo = {
                                    keepUserName: '',
                                    keepPassWord: ''
                                }
                                localstroage.setItem('keepLoginInfo', JSON.stringify(keepLoginInfo));

                            }

                            let body = {
                                mobile: mobileEnd,
                                password: passwordEnd
                            };
                            let bodyStr = JSON.stringify(body);
                            this.$socket.emit('messageholder', {
                                sign: 1,
                                type: 18,
                                status: 0,
                                body: bodyStr
                            });
                            const msg = this.$Message.loading({
                                content: this.$t('message.tipLoginLoading'),
                                duration: 0
                            });

                        }

                    }

                },
                tapWinMinus() {
                    console.log('===缩小窗口===');
                    ipcRenderer.send('surfbird:window:minimize', true);
                },
                tapWinClose() {
                    console.log('===关闭窗口===');
                    ipcRenderer.send('surfbird:window:close', true);
                },
                tapRightMenu(val) {
                    console.log('右上角菜单:', val)
                    switch (val) {
                        case 'loop':
                            this.$Spin.show();
                            setTimeout(() => {
                                this.$Spin.hide();
                                location.reload();
                            }, 3000);
                            break;
                        case 'aboutus':
                            ipcRenderer.send('surfbird:openHomeUrl', true);
                            break;
                        default:
                            location.reload();
                    }
                },
        }
}

</script>
