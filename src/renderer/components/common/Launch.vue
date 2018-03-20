<style scoped>

.ivu-row-flex {
    background: #f0f2f5;
    background-image: url(../../assets/backgroundimg.svg);
    width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 0 0 386px 0;
    position: relative;
}

.header-background {
    -webkit-app-region: no-drag;
    /* background-color:#ffffff; */
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
    margin: 370px 0 24px 0;
    text-align: center;
}

.footer-dec {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}

</style>

<template>

<Row type="flex" justify="center" align="middle" style="-webkit-app-region: drag;">
    <div style="position:absolute; right: 15px;top: 5px;font-size:16px;-webkit-app-region: no-drag;">
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
            <img src="../../assets/logo.png" class="logo-img">
        </div>
        <div class="header-dec">
            <p>
                {{ $t("message.slogan") }}
            </p>
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
            return {}
        },
        methods: {

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
