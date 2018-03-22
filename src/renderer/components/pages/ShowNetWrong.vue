<style scoped>

.image-left {
    max-width: 430px;
    float: left;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-right: 30px;
}

.dec-right {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
}

.dec-h1 {
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin-bottom: 24px;
}

.dec-text {
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
}

.dec-btn {
    color: rgba(0, 0, 0, 0.45);
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
}

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
    width: 100px;
    height: 30px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    /*width: 600px;*/
    /*margin: 0 auto;*/
    float: left;
    padding-left: 130px;
    padding-top: 8px;
    padding-bottom: 5px;
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

</style>

<template>

<div class="layout">

    <div class="drag-area">

        <Menu mode="horizontal" theme="dark" active-name="0">
            <div class="layout-logo">
                <img src="../../assets/logo.png">
            </div>
            <div class="layout-nav">
                <MenuItem name="1" disabled>
                    <Icon type="camera" size="50"></Icon>
                    <p>发帖</p>
                </MenuItem>
                <MenuItem name="2" disabled>
                    <Icon type="android-person-add" size="50"></Icon>
                    <p>加友</p>
                </MenuItem>
                <MenuItem name="3" disabled>
                    <Icon type="chatbox-working" size="50"></Icon>
                    <p>回复</p>
                </MenuItem>
                <MenuItem name="4" disabled>
                    <Icon type="ios-pulse-strong" size="50"></Icon>
                    <p>养号</p>
                </MenuItem>
                <MenuItem name="5" disabled>
                    <Icon type="ios-list" size="50"></Icon>
                    <p>任务</p>
                </MenuItem>
                <MenuItem name="6" disabled>
                    <Icon type="ios-gear" size="50"></Icon>
                    <p>设置</p>
                </MenuItem>
            </div>
            <div style="position:absolute; right: 15px;top: 5px;color:#ffffff;font-size:16px;-webkit-app-region: no-drag;">
                <Dropdown trigger="click" @on-click="tapRightMenu">
                    <a href="javascript:void(0)">
                        <Icon type="navicon-round" style="padding-right:8px;color:#ffffff;"></Icon>
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
                    <Icon type="minus-round" style="padding-right:8px;color:#ffffff;"></Icon>
                </a>
                <a @click="tapWinClose">
                    <Icon type="close-round" style="color:#ffffff;"></Icon>
                </a>
            </div>
        </Menu>


    </div>

    <Row type="flex" justify="center" align="middle" style="height:552px;padding:50px;text-align: center;">
        <Col span="12">
            <img src="../../assets/500.svg" class="image-left">
        </Col>
        <Col span="12" style="padding-left:50px;">
            <div class="dec-right">
                <h1 class="dec-h1">500</h1>
                <div class="dec-text">抱歉，连接服务器出错了</div>
                <div class="dec-btn">
                    <Button type="primary" @click="tapConnect">刷新页面</Button>
                    <router-link to="/login">
                        <Button type="ghost">重新登录</Button>
                    </router-link>
                </div>
            </div>
        </Col>
    </Row>

    <div class="layout-copy">
        Copyright &copy; 2017 - 2018 百森科技出品
    </div>
</div>

</template>

<script>

const ipcRenderer = require('electron').ipcRenderer;
export default {
    methods: {
        tapConnect: function() {

            this.$Spin.show();
            setTimeout(() => {
                this.$Spin.hide();
                location.reload();
            }, 3000);

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
    }, //methods
}

</script>
