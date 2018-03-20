<style scoped>

.ivu-row-flex {
    background: #f0f2f5;
    background-image: url(../../assets/backgroundimg.svg);
    width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 0 0 91px 0;
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
    margin: 76px 0 24px 0;
    text-align: center;
}

.footer-dec {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}

</style>

<template>

<Row type="flex" justify="center" align="middle" style="-webkit-app-region: drag;">
    <div style="position:absolute; right: 15px;top: 5px;font-size:20px;-webkit-app-region: no-drag;">
        <Dropdown trigger="click" @on-click="tapRightMenu">
            <a href="javascript:void(0)">
                <Icon type="navicon-round" style="padding-right:8px;color:#353535;"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="loop">
                    <Icon type="loop" style="padding-right:5px;"></Icon>{{ $t("message.loop") }}
                </DropdownItem>
                <DropdownItem divided name="aboutus">
                    <Icon type="person-stalker" style="padding-right:5px;"></Icon>{{ $t("message.aboutus") }}
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
                    <Input icon="ios-email-outline" type="email" v-model.trim="formCustom.mobile" placeholder="邮箱" style="width: 200px;"></Input>
                </FormItem>
                <FormItem prop="smscode">
                    <Row>
                        <Col span="12" style="text-align:right;">
                            <Input type="text" v-model.trim="formCustom.smscode" :maxlength="10" placeholder="邮箱验证码" style="width: 100px;"></Input>
                        </Col>
                        <Col span="12" style="text-align:left;padding-left:8px;">
                            <Button type="primary" v-if="checkSendCodeRight === '0'" disabled>发送验证码</Button>
                            <Button @click="tapSendCode" type="primary" v-else-if="checkSendCodeRight === '1'">发送验证码</Button>
                            <Button type="ghost" v-else-if="checkSendCodeRight === '2'">已发至邮箱</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" icon="ios-locked-outline" v-model.trim="formCustom.password" placeholder="至少6位密码，区分大小写" style="width: 200px;"></Input>
                </FormItem>
                <FormItem prop="rePassword">
                    <Input type="password" icon="ios-locked-outline" v-model.trim="formCustom.rePassword" placeholder="再次确认密码" style="width: 200px;"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')" long style="width:200px;margin-top:5px;margin-bottom:15px;"> 注 册 </Button>
                </FormItem>
            </Form>
            <br />
            <router-link to="/login">使用已有账号登录</router-link>
        </div>
        <div class="footer">
            <div class="footer-dec">
                Copyright © 2018 百森科技出品
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
                    callback(new Error(' '));
                } else if (value.length < 6) {
                    callback(new Error(' '));
                } else {
                    if (this.formCustom.rePassword !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('rePassword');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(' '));
                } else if (value !== this.formCustom.password) {
                    callback(new Error(' '));
                } else {
                    callback();
                }
            };
            const validateMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(' '));
                } else {
                    if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,20}$/.test(value))) {
                        return callback(new Error(' '));
                    } else {
                        this.checkSendCodeRight = '1';
                    }
                }
            };

            const validateSmscode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(' '));
                } else if (value.length < 6) {
                    return callback(new Error(' '));
                } else {
                    callback();
                }
            };

            return {
                checkSendCodeRight: '0',
                formCustom: {
                    password: '',
                    rePassword: '',
                    mobile: '',
                    smscode: ''
                },
                ruleCustom: {
                    password: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    rePassword: [{
                        validator: validatePassCheck,
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: validateMobile,
                        trigger: 'blur'
                    }],
                    smscode: [{
                        validator: validateSmscode,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            tapSendCode() {
                    this.checkSendCodeRight = '2';
                    let mobileEnd = this.formCustom.mobile;
                    this.axios({
                            url: 'besser/fbcc/accounts/sendRegMail',
                            method: 'post',
                            data: {
                                mobile: mobileEnd
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
                            console.log('返回的数据: ', response.data)
                            if (response.data.code === 200) {
                                this.checkSendCodeRight = '2';
                            } else {
                                this.$Message.error(response.data.msg);
                                this.checkSendCodeRight = '1';
                            }

                        }, response => {
                            // error callback
                            this.$Message.error('出现错误');
                        });


                },
                handleSubmit(name) {
                    // this.$Message.info('01');

                    let mobileEnd = this.formCustom.mobile;
                    let passwordGet = this.formCustom.password;
                    let passwordGetCheck = this.formCustom.rePassword;
                    let smscodeGet = this.formCustom.smscode;

                    if (!mobileEnd) {
                        this.$Message.error('邮箱不能为空');
                    } else if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,20}$/.test(mobileEnd))) {
                        this.$Message.error('邮箱格式错误');
                    } else if (passwordGet.length < 6) {
                        this.$Message.error('至少6位数密码');
                    } else if (passwordGetCheck != passwordGet) {
                        this.$Message.error('两次密码不一致');
                    } else if (smscodeGet.length < 1) {
                        this.$Message.error('邮箱验证码不能为空');
                    } else {

                        let Base64 = require('js-base64').Base64;
                        let sha256 = require('js-sha256').sha256;
                        let passwordEnd = Base64.encode(sha256(passwordGet));
                        let rePasswordGet = this.formCustom.rePassword;
                        let rePasswordEnd = Base64.encode(sha256(rePasswordGet));

                        this.axios({
                                url: 'besser/fbcc/accounts/register',
                                method: 'post',
                                data: {
                                    mobile: mobileEnd,
                                    password: passwordEnd,
                                    rePassword: rePasswordEnd,
                                    verifiCode: smscodeGet
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
                                console.log('返回的数据: ', response.data)
                                if (response.data.code === 200) {
                                    this.$Message.success('注册成功，去登录!');
                                    this.$router.push('/login');
                                } else {
                                    this.$Message.error(response.data.msg);
                                }

                            }, response => {
                                // error callback
                                this.$Message.error('出现错误');
                            });

                    }








                    // this.$refs[name].validate((valid) => {
                    //   this.$Message.info('02');
                    //     if (valid) {
                    //       this.$Message.info('03');
                    //
                    //
                    //         // this.$Message.success('Success!');
                    //     } else {
                    //         // this.$Message.error('Fail!');
                    //         this.$Message.info('04');
                    //     }
                    //
                    // })
                },
                handleReset(name) {
                    this.$refs[name].resetFields();
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
