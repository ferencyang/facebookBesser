<style>

    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    .example-split {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        border: 1px dashed #eee;
    }

    .example-case {
        /*padding: 20px;*/
    }

    .example-header {
        font-weight: 500;
        margin: 26px 0 10px;
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
        padding: 10px 0px 0px 0px;
    }

    .ivu-table td,
    .ivu-table th {
        height: 30px;
    }

    .trash-list {
        font-size: 12px;
        color: #80848f;
    }

    a.trash-list:hover {
        color: #ed3f14;
    }

    .demo-location {
        display: inline-block;
        width: 58px;
        margin-top: 8px;
        background-color: rgb(255, 255, 255);
        border: 1px dashed #dddee1;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: border-color .2s ease;
    }
.selfUpload{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 0;
    opacity: 0;
    cursor: pointer;
}
</style>

<template>

    <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <Col span="24">
        <Card>
            <Row>
                <Col span="24">
                <Tabs v-model="postnewPaneVal" @on-click="postnewPane">
                    <TabPane label="新建发帖" name="action1">
                        <div class="example-case">

                            <div style="padding:15px 15px 10px 15px;width:100%;background-color:#f4f4f4;border-radius:5px;">
                                <Input v-model.trim="inputVal" type="textarea" :rows="3" :placeholder="$t('message.postnewPlaceholder')"></Input>

                                <div class="demo-upload-list" v-for="item in uploadList" style="margin-top:8px;">
                                    <template v-if="item.status === 'finished'">
                                        <img :src="item.url" v-if="item.url.substr(-3) !== 'mp4'">
                                        <img src="../../assets/video.svg" v-else>
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                    </template>
                                </div>
                                <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png','mp4']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
                                        :multiple=true type="drag" :data="extraData" :action="actionUrl" style="display: inline-block;width:58px;margin-top:8px;" v-if="uploadList.length < 9">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="camera" size="20"></Icon>
                                    </div>
                                </Upload>
                                <input v-if="uploadList.length < 9"type="file" id="selfUpload1" class="selfUpload" v-bind:style="{left:15+uploadList.length*65 + 'px'}" style="top:96px">
                                <div class="demo-location">
                                    <Button type="dashed" style="width: 58px;height:58px;line-height: 46px;" @click="handleLocationModel">
                                        <Icon type="ios-location" size="20"></Icon>
                                    </Button>
                                </div>
                                <div style="float:right;padding-top:8px;">
                                    <div style="margin-bottom:8px;font-size:12px;">
                                        分享至：
                                        <RadioGroup v-model="chooseTypeVal">
                                            <Radio label="postTimeLine">时间线</Radio>
                                            <Radio label="postGroups">小组</Radio>
                                        </RadioGroup>
                                    </div>

                                    <Button type="ghost" size="large" v-on:click="tapModelSchedule" v-if="showBtn">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.postnewBtnClock") }}
                                    </Button>
                                    <Button type="primary" size="large" v-on:click="tapSubmit(0, 0)" v-if="showBtn">
                                        <Icon type="paper-airplane" style="padding-right:5px;"></Icon>{{ $t("message.postnewBtnNow") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </div>
                            </div>
                            <Modal :title="$t('message.view')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" v-model="visible">
                                <div v-if="imgName.substr(-3) !== 'mp4'">
                                    <img :src="fileDownUrl + imgName" v-if="visible" style="width: 100%">
                                </div>
                                <div v-else>
                                    <video :src="fileDownUrl + imgName" v-if="visible" style="width: 100%" controls="controls"></video>
                                </div>
                            </Modal>

                        </div>
                        <div class="example-header">
                            <span>{{ $t("message.postnewHistory") }}</span>
                        </div>
                        <div class="example-desc">
                            <div>
                                <p>
                                <Table height="270" :columns="columns7" :data="postNewList"></Table>
                                <div style="margin-top:10px;">
                                    <a class="trash-list" @click="trashList">
                                        <Icon type="trash-a" style="padding-right:5px;padding-left:20px;"></Icon>{{ $t("message.taskListClean") }}
                                    </a>
                                </div>
                                <Modal :title="$t('message.postnewHistoryTitle')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" v-model="showPostNewListOne">

                                    <div v-if="postNewListOneText !== ''">
                                        <h3>{{ $t("message.postnewHistoryText") }}：</h3>
                                        <p style="margin-left:15px;">{{postNewListOneText}}</p>
                                    </div>

                                    <div v-if="postNewListOneImg.length > 0">
                                        <h3>{{ $t("message.postnewHistoryImg") }}：</h3>
                                        <div class="demo-upload-list" v-for="item in postNewListOneImg" style="margin-left:15px;">
                                            <img :src="fileDownUrl + item">
                                        </div>
                                    </div>
                                    <div v-if="postNewListOneVideo.length > 0">
                                        <h3>{{ $t("message.postnewHistoryVideo") }}：</h3>
                                        <div v-for="(item, idx) in postNewListOneVideo" :key="idx" style="margin-left:15px;">
                                            <video :src="fileDownUrl + item" style="width: 50%" controls="controls"></video>
                                        </div>
                                    </div>

                                </Modal>
                                </p>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="模板发帖" name="action2">
                        <div >

                            <div style="clear: both">
                                <Table highlight-row height="400" ref="" @on-current-change="tapChoose" :columns="columns1" :data="postNewComList"></Table>
                            </div>

                            <div style="float:right;padding-top:8px;">
                                <div style="margin-bottom:8px;font-size:12px;">
                                    分享至：
                                    <RadioGroup v-model="chooseTypeVal">
                                        <Radio label="postTimeLine">时间线</Radio>
                                        <Radio label="postGroups">小组</Radio>
                                    </RadioGroup>
                                </div>

                                <Button type="ghost" size="large" v-on:click="tapModelAdd" v-if="showBtn">
                                    <Icon type="clock" style="padding-right:5px;"></Icon>新建模板
                                </Button>
                                <Button type="ghost" size="large" v-on:click="tapModelSchedule" v-if="showBtn">
                                    <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.postnewBtnClock") }}
                                </Button>
                                <Button type="primary" size="large" v-on:click="tapSubmit(0, 0)" v-if="showBtn">
                                    <Icon type="paper-airplane" style="padding-right:5px;"></Icon>{{ $t("message.postnewBtnNow") }}
                                </Button>
                                <Button type="primary" :loading="true" v-else>
                                    {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                </Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                </Col>
            </Row>
        </Card>
        </Col>
        <!-- model -->
        <Modal v-model="modalSchedule" :title="$t('message.postnewBtnClock')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" @on-ok="tapScheduleOk" @on-cancel="tapScheduleCancel">
            <p>
            <Form ref="formSchedule" :model="formSchedule" :label-width="80" style="width: 450px">
                <FormItem v-for="(item, index) in formSchedule.items" v-if="item.status" :key="index" :label="$t('message.postnewClock')" :prop="'items.' + index + '.value'" :rules="{dateVal: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ]}">
                    <Row>
                        <Col span="20">
                        <DatePicker format="yyyy-MM-dd HH:mm" type="datetime" :options="dateOption" v-model="item.dateVal" :placeholder="$t('message.postnewClockplaceholder')" style="width: 200px"></DatePicker>

                        </Col>
                        <Col span="3" offset="1">
                        <Button type="ghost" @click="handleScheduleDel(index)">{{ $t("message.delect") }}</Button>
                        </Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="12">
                        <Button type="dashed" long @click="handleScheduleAdd" icon="plus-round">{{ $t("message.postnewClockAdd") }}</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
            </p>
        </Modal>
        <!-- model end -->
        <!-- model -->
        <Modal v-model="locationModelVal" title="位置" ok-text="确认" cancel-text="取消"  @on-ok="tapLocationOk" @on-cancel="tapLocationCancel">
            <p>
                <Input v-model="locationText" type="textarea" :rows="3" placeholder="请输入定位关键词"></Input>
            </p>
        </Modal>
        <!-- model end -->
        <!-- model -->
        <Modal v-model="modalAdd" title="新建模板" ok-text="确认" cancel-text="取消"  @on-ok="addModel" @on-cancel="clearTempletData">
            <div style="padding:15px 15px 10px 15px;width:100%;background-color:#f4f4f4;border-radius:5px;">
                <Form ref="" :model="templet" :rules="ruleValidate" :label-width="60">
                    <FormItem label="标题" >
                        <Input v-model.trim="templet.title" type="text"  :placeholder='"模板标签"'></Input>
                    </FormItem>
                    <FormItem label="内容" prop="content">
                        <Input v-model.trim="templet.content" type="textarea" :rows="3" :placeholder='"模板内容"'></Input>
                    </FormItem>
                    <FormItem label="图片" >
                        <div class="demo-upload-list" v-for="item in modeluploadList" style="margin-top:8px;">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url" v-if="item.url.substr(-3) !== 'mp4'">
                                <img src="../../assets/video.svg" v-else>
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                            <template>
                                {{item.showProgress}}
                            </template>
                        </div>
                        <Upload ref="modelupload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :on-progress	="handleProgress" :on-error	="handleError" :format="['jpg','jpeg','png','mp4']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
                                :multiple=true type="drag" :action="''" style="display: inline-block;width:58px;margin-top:8px;" v-if="modeluploadList.length < 9">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <input id="selfUpload2" type="file" class="selfUpload" v-if="modeluploadList.length < 9" v-bind:style="{left:(modeluploadList.length<6 ?modeluploadList.length:modeluploadList.length-6 )*65 + 'px',top:(modeluploadList.length<6 ? 6:90 ) + 'px'}">
                    </FormItem>
                    <FormItem label="位置" prop="content">
                        <Input v-model.trim="templet.loc" type="text"  :placeholder='"位置"'></Input>
                    </FormItem>
                </Form>


            </div>
            <Modal :title="$t('message.view')" :ok-text="$t('message.confirm')" :cancel-text="$t('message.cancel')" v-model="visible">
                <div v-if="imgName.substr(-3) !== 'mp4'">
                    <img :src="fileDownUrl + imgName" v-if="visible" style="width: 100%">
                </div>
                <div v-else>
                    <video :src="fileDownUrl + imgName" v-if="visible" style="width: 100%" controls="controls"></video>
                </div>
            </Modal>
        </Modal>
        <!-- model end -->



    </Row>

</template>

<script>

    export default {
        data() {
            return {
                modalSchedule: false,
                locationModelVal: false,
                locationText: '', //位置关键词输入框
                postType: 0,//发帖方式0为新建发帖1为模板发帖
                inputVal: '',
                accountValEnd: '',
                timeValEnd: '',
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                modeluploadList: [],
                extraData: {},
                checkAllGroup: [],
                chooseTypeVal: 'postTimeLine',
                actionUrl: this.GLOBAL.httpSrc + 'besser/fbcc/upload',
                fileDownUrl: "http://besser-facebook-1253592979.cos.ap-shanghai.myqcloud.com/appupgrade/upload/images/",
                showBtn: true,
                timecount: this.GLOBAL.limitSec,
                columns7: [{
                    title: this.$t("message.postnewHistoryTime"),
                    key: 'postTime',
                }, {
                    title: this.$t("message.postnewHistoryContent"),
                    key: 'text'
                }, {
                    title: '类型',
                    key: 'doTime'
                }, {
                    title: this.$t("message.postnewHistoryOp"),
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showPost(params.index)
                                    }
                                }
                            }, this.$t("message.view")),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.removePost(params.index)
                                    }
                                }
                            }, this.$t("message.delect"))
                        ]);
                    }
                }],
                postNewList: [],
                showPostNewListOne: false,
                postNewListOneText: '',
                postNewListOneImg: [],
                postNewListOneVideo: [],
                index: 1,
                dateOption: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                formSchedule: {
                    items: [{
                        dateVal: '2017-12-12 08:00',
                        // datetwoVal: '08:00',
                        index: 1,
                        status: 1
                    }]
                },
                postnewPaneVal: "action1",
                columns1: [/*
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },*/
                    {
                        title: "模板标题",
                        key: 'label'
                    },
                    {
                        title: "模板内容",
                        key: 'content'
                    },
                    {
                        title: "模板图片",
                        key: 'url',
                        render: (h, params) => {
                            var self = this;
                            let urlList =  params.row.url.split(",");
                            console.log(params.row.url)
                            let renders = [];
                            for(let i=0;i<urlList.length;i++){
                                renders.push(
                                    h(
                                        'div',{
                                            style:{
                                                width:'40px',
                                                height:'40px',
                                                float:"left"
                                            }
                                        },
                                        [h(
                                        'img',{
                                            attrs:{
                                                src:self.fileDownUrl + urlList[i]
                                            },
                                            style:{
                                                width:'100%',
                                                height:'100%'
                                            }
                                        }
                                    )])
                                )
                            }
                            return h('div',renders)
                        }
                    },
                    {
                        title: "位置",
                        key: 'position'
                    },
                    {
                        title: this.$t('message.replayTableAction'),
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Button',
                                    {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginLeft: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.tapAddPostDel(params)
                                            }
                                        }
                                    },
                                    this.$t('message.delect')
                                ),
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
                                                this.tapAddPostEdit(params)
                                            }
                                        }
                                    },
                                    this.$t('message.edit')
                                )
                            ])
                        }
                    }
                ],
                postNewComList:[],
                searchValue: "",
                modalAdd: false,
                ruleValidate: {
                    title: [
                        {
                            required: true,
                            message: 'The title cannot be empty',
                            trigger: 'blur'
                        }
                    ]
                },
                templet:{
                    title:"",
                    content:"",
                    url:"",
                    loc:"",
                    id:""
                },
                selectRow:[],
                uploading:false
            }
        },
        computed:{
            typeNumber(){
                if (this.chooseTypeVal === "postTimeLine") {
                    return 33;
                } else if(this.chooseTypeVal === "postPages") {
                    return 34
                } else if(this.chooseTypeVal === "postGroups") {
                    return 35
                } else {
                    return -1;
                }
            }
        },
        methods: {
            getToken() {
                console.log('getToken操作')
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                this.extraData = {
                    token: token
                };
            },
            getPostNewList() {
                let localstroage = window.localStorage;
                let mobileNow = localstroage.getItem('mobile');
                let nameKeyNow = 'postNewList' + mobileNow;
                let postNewListLocal = localstroage.getItem(nameKeyNow);
                if (postNewListLocal !== null) {
                    let postNewListLocalArr = JSON.parse(postNewListLocal);
                    this.postNewList = postNewListLocalArr.List;
                }
            },
            handleLocationModel() {
                this.locationModelVal = true;
            },
            tapLocationOk() {
                this.locationModelVal = false;
            },
            tapLocationCancel() {
                this.locationModelVal = false;
            },
            handleView(name) {
                console.log('handleView操作', name)
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                console.log('handleRemove操作', file)
                let upload = this.postType ? this.modeluploadList:this.uploadList;
                upload.splice(upload.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                console.log('handleSuccess操作', file)
                file.url = this.GLOBAL.httpSrc + 'besser/fbcc/download?fileName=' + file.response.data.fileName;
                file.name = file.response.data.fileName;
            },
            handleFormatError(file) {
                console.log('handleFormatError操作', file)
                this.$Notice.warning({
                    title: this.$t("message.tipWarnFileWrong"),
                    desc: file.name + ', ' + this.$t("message.tipWarnFileWrongText")
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: this.$t("message.tipWarnFileMaxWrong"),
                    desc: file.name + ', ' + this.$t("message.tipWarnFileMaxWrongText")
                });
            },
            handleBeforeUpload() {
                this.uploading = 1;
                let upload = this.postType ? this.modeluploadList:this.uploadList;
                const check = upload.length < 9;
                if (!check) {
                    this.$Notice.warning({
                        title: this.$t("message.tipWarnFileNumWrong")
                    });
                }
                return check;
            },
            handleProgress() {

            },
            handleError() {
                this.uploading = 0;
                console.log(this.modeluploadList)
            },
            clearUploadFile() {

            },
            stringToBytes(str) {

                var Buffer = require('buffer').Buffer
                var b1 = new Buffer(str);
                Buffer.prototype.toByteArray = function() {
                    return Array.prototype.slice.call(this, 0);
                }
                return b1.toByteArray();

            },
            tapModelSchedule() {
                let d = new Date();
                let year = d.getFullYear();
                let day = d.getDate();
                let month = d.getMonth() + 1;
                let hour = d.getHours();
                let min = d.getMinutes();
                let nowTime = year + "/" + month + "/" + day + ' ' + hour + ':' + min;

                this.formSchedule.items[0].dateVal = nowTime;
                this.modalSchedule = true;
            },
            handleScheduleAdd() {
                let d = new Date();
                let year = d.getFullYear();
                let day = d.getDate();
                let month = d.getMonth() + 1;
                let hour = d.getHours();
                let min = d.getMinutes();
                let nowTime = year + "/" + month + "/" + day + ' ' + hour + ':' + min;
                this.index++;
                this.formSchedule.items.push({
                    dateVal: nowTime,
                    index: this.index,
                    status: 1
                });
            },
            handleScheduleDel(index) {
                this.formSchedule.items[index].status = 0;
            },
            tapScheduleOk() {
                let nameVal = 'formSchedule';

                this.$refs[nameVal].validate((valid) => {
                    if (valid) {

                        let dateItems = this.formSchedule.items;
                        for (var i = 0; i < dateItems.length; i++) {
                            if (dateItems[i].status === 1) {
                                let dateValOrg = dateItems[i].dateVal;

                                let myDateNow = new Date();
                                let myDateOrg = new Date(dateValOrg);

                                let dateValNow = myDateNow.getTime();
                                let dateValSce = myDateOrg.getTime();


                                let dateValCha = dateValSce - dateValNow;
                                if (dateValCha > 0) {
                                    let dateValChaTwo = parseInt(dateValCha / 1000);
                                    this.tapSubmit(dateValNow, dateValChaTwo);
                                } else {
                                    this.$Message.warning('时间不能是过去的');
                                }
                            }

                        } //for

                        this.inputVal = '';
                        const fileList = this.$refs.upload.fileList;
                        this.$refs.upload.fileList.splice(0, fileList.length);
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            tapScheduleCancel() {
                let nameVal = 'formSchedule';
                this.$refs[nameVal].resetFields();
            },

            tapSubmit(dateValNow, timeVal) {
                let network = window.sessionStorage.getItem('network');

                if (network !== '200') {

                    this.$Message.error(this.$t("message.tipNetWrong"));

                } else {

                    let localstroage = window.localStorage;
                    let imei = this.checkImeiOnline();
                    let token = localstroage.getItem('token');
                    if (imei.length === 0) {
                        this.$Message.warning(this.$t("message.tipWarnChooseAccount"));
                    } else {

                        let text = this.postType ? this.selectRow[0].content : this.inputVal;
                        let location =  this.postType ? this.selectRow[0].position : this.locationText;
                        let urlList = [];
                        if(!this.postType){
                            for (var i = 0; i < this.uploadList.length; i++) {
                                urlList.push(this.uploadList[i].name)
                            }
                        }else{
                            urlList = this.selectRow[0].url.split(",")
                        }
                        if (text === '' && urlList.length === 0) {

                            this.$Notice.warning({
                                title: this.$t("message.tipWarnPostnewNoContent"),
                            });

                        } else {
                            console.log(this.typeNumber);
                            let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                            let tasks = [{
                                type: this.typeNumber,
                                batchId: batchId,
                                data: {
                                    text: text,
                                    url: urlList,
                                    location: location
                                }
                            }];

                            let mainId = 0;
                            if (Number(dateValNow) > 0) {
                                mainId = dateValNow.toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                            } else {
                                mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                            }
                            let postTypeVal = this.chooseTypeVal === 'postTimeLine' ? 0 : (this.chooseTypeVal === 'postPages' ? 1 : 2);

                            let body = {
                                imei: imei,
                                token: token,
                                mainId: mainId,
                                delaySecond: timeVal,
                                category: postTypeVal,
                                tasks: tasks
                            };
                            let bodyStr = JSON.stringify(body);
                            this.$socket.emit('messageholder', {
                                sign: 1,
                                type: 33,
                                body: bodyStr
                            });

                            this.changeBtnStatus();
                            window.sessionStorage.setItem('taskNow', '发帖');

                            if (timeVal === 0) {
                                this.keepTask(mainId, batchId, this.typeNumber, '发帖', imei);
                            }
                            // 保留发帖纪录
                            this.keepPostNewVal(mainId, timeVal, text, this.uploadList, imei);

                            this.inputVal = '';
                            const fileList = this.$refs.upload.fileList;
                            this.$refs.upload.fileList.splice(0, fileList.length);
                            this.$Message.success(this.$t("message.tipSuccessPostnewOk"));

                        }

                    } //if tasknow

                }

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
                console.log('选择的在线设备是1：', imei)
                var imeiNew = [];
                for (let i = 0, l = imei.length; i < l; i++) {
                    for (let j = i + 1; j < l; j++)
                        if (imei[i] === imei[j]) j = ++i;
                    imeiNew.push(imei[i]);
                }

                console.log('选择的在线设备是2：', imeiNew)
                return imeiNew;
            },
            keepTask(mainId, batchId, type, name, imei) {
                let d = new Date();
                let day = d.getDate();
                let month = d.getMonth() + 1;
                let hour = d.getHours();
                let min = d.getMinutes();
                let startTime = month + "/" + day + ' ' + hour + ':' + min;
                let imeiList = [];
                for (var i = 0; i < imei.length; i++) {
                    let imeiListOne = {
                        imei: imei[i],
                        ret: 0
                    }
                    imeiList.push(imeiListOne);
                }
                let taskListOne = {
                    mainId: mainId,
                    batchId: batchId,
                    taskName: name,
                    taskType: type,
                    startTime: startTime,
                    endTime: '',
                    taskStatus: this.$t("message.tipInfoTaskIng"),
                    progress: 0,
                    error: 0,
                    imeiList: imeiList
                }

                let localstroage = window.localStorage;
                let mobileNow = localstroage.getItem('mobile');
                let nameKeyNow = 'taskList' + mobileNow;
                let taskListLocal = localstroage.getItem(nameKeyNow);
                if (taskListLocal !== null) {

                    let taskListAllLocalArr = JSON.parse(localstroage.getItem(nameKeyNow));
                    taskListAllLocalArr.taskList.unshift(taskListOne);
                    localstroage.setItem(nameKeyNow, JSON.stringify(taskListAllLocalArr));

                } else {
                    let taskList = {
                        taskList: [taskListOne]
                    }
                    let taskListAllLocalString = JSON.stringify(taskList);
                    localstroage.setItem(nameKeyNow, taskListAllLocalString);

                }


            },
            keepPostNewVal(mainId, timeVal, text, urllist, imei) {

                let d = new Date();
                let year = d.getFullYear();
                let day = d.getDate();
                let month = d.getMonth() + 1;
                let hour = d.getHours();
                let min = d.getMinutes();
                let postTime = year + "/" + month + "/" + day + ' ' + hour + ':' + min;

                let videoList = [];
                let imgList = [];
                for (var i = 0; i < urllist.length; i++) {

                    let imgUrlOne = urllist[i].response.data.fileName;
                    let imgUrlType = imgUrlOne.substr(-3);
                    if (imgUrlType !== 'mp4') {
                        imgList.push(imgUrlOne);
                    } else {
                        videoList.push(imgUrlOne);
                    }

                }

                let doTimeType = '';
                let timeValTwo = Number(timeVal);
                if (timeValTwo > 0) {

                    let doTimeGet = this.getClockTime(mainId, timeVal);
                    doTimeType = '定时(' + doTimeGet + ')';

                } else {

                    doTimeType = '即时任务';

                }



                let postNewOne = {
                    postTime: postTime,
                    text: text,
                    doTime: doTimeType,
                    imgList: imgList,
                    videoList: videoList,
                    imeiList: imei
                }

                let localstroage = window.localStorage;
                let mobileNow = localstroage.getItem('mobile');
                let nameKeyNow = 'postNewList' + mobileNow;
                let postNewListLocal = localstroage.getItem(nameKeyNow);
                if (postNewListLocal !== null) {

                    let postNewListLocalArr = JSON.parse(postNewListLocal);
                    postNewListLocalArr.List.unshift(postNewOne);
                    localstroage.setItem(nameKeyNow, JSON.stringify(postNewListLocalArr));
                    this.postNewList.unshift(postNewOne);

                } else {
                    let ListOne = {
                        List: [postNewOne]
                    }
                    localstroage.setItem(nameKeyNow, JSON.stringify(ListOne));
                    this.postNewList = postNewOne;
                }

            },
            changeBtnStatus() {
                this.showBtn = false;
                let timecountGet = this.timecount;
                if (timecountGet === 0) {

                    this.showBtn = true;
                    this.timecount = this.GLOBAL.limitSec;
                    window.sessionStorage.setItem('taskNow', '');

                } else {

                    timecountGet = timecountGet - 1;
                    this.timecount = timecountGet;
                    setTimeout(() => {
                        this.changeBtnStatus();
                    }, 1000);
                }

            },
            getClockTime(mainId, timeVal) {
                let sendTime = mainId.substr(0, 13);
                let doTime = Number(sendTime) + Number(timeVal) * 1000 + 1000;
                let d = new Date(doTime);
                let year = d.getFullYear();
                let day = d.getDate();
                let month = d.getMonth() + 1;
                let hour = d.getHours();
                let min = d.getMinutes();
                let postTime = year + "/" + month + "/" + day + ' ' + hour + ':' + min;
                return postTime;
            },
            showPost(index) {
                this.showPostNewListOne = true;
                this.postNewListOneText = this.postNewList[index].text;
                this.postNewListOneImg = this.postNewList[index].imgList;
                this.postNewListOneVideo = this.postNewList[index].videoList;
            },
            removePost(index) {
                this.postNewList.splice(index, 1);
                console.log('帖子的内容:', this.postNewList)
                let localstroage = window.localStorage;
                let ListOne = {
                    List: this.postNewList
                }
                let mobileNow = localstroage.getItem('mobile');
                let nameKeyNow = 'postNewList' + mobileNow;
                localstroage.setItem(nameKeyNow, JSON.stringify(ListOne));
            },
            trashList() {
                this.$Message.loading(this.$t("message.tipLoadClean"));
                this.postNewList = [];

                let ListOne = {
                    List: this.postNewList
                }
                let localstroage = window.localStorage;
                let mobileNow = localstroage.getItem('mobile');
                let nameKeyNow = 'postNewList' + mobileNow;
                localstroage.setItem(nameKeyNow, JSON.stringify(ListOne));
                this.$Message.success(this.$t("message.tipSuccessClean"));
            },
            tapChoose(row) {//高亮选中行,仅支持单选
                this.selectRow = [];
                this.selectRow.push(row);
            },
            getModelTableList(val) {//获取模板表格数据
                let token = window.localStorage.getItem('token');
                let label = val ? val:"";
                let data = {
                    token: token,
                    label: label
                };
                this.axios({
                    url: 'besser/fbcc/models/noteModelList',
                    method: 'post',
                    data: data,
                    transformRequest: [
                        function (data) {
                            // Do whatever you want to transform the data
                            let ret = ''
                            for (let it in data) {
                                ret +=
                                    encodeURIComponent(it) +
                                    '=' +
                                    encodeURIComponent(data[it]) +
                                    '&'
                            }
                            return ret
                        }
                    ],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.postNewComList = res.data.data
                        } else {
                            console.warning('获取发帖模板列表数据失败', res)
                        }
                    })
                    .catch(err => {
                        console.error('获取发帖模板列表数据错误', err)
                    })
            },
            addModel() {//添加模板数据
                let token = window.localStorage.getItem('token');
                let label = this.templet.title || "";
                let content = this.templet.content || "";
                let position = this.templet.loc || "";
                let url = "";
                let id = this.templet.id || "";
                for(let i =0;i<this.modeluploadList.length;i++){
                    url = url ? url + "," + this.modeluploadList[i].name : this.modeluploadList[i].name
                }
                let data = {
                    token: token,
                    label: label,
                    content: content,
                    position: position,
                    url: url
                };
                id && (data.id = id);
                this.axios({
                    url: id ? 'besser/fbcc/models/noteModelEdit' : "besser/fbcc/models/noteModelAdd",
                    method: "post",
                    data: data,
                    transformRequest: [
                        function(data) {
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
                            if(id !== ""){
                                this.clearTempletData();
                                this.$Message.success("修改模板成功")
                            }else {
                                this.$Message.success("添加模板成功")
                            }
                            this.getModelTableList();
                        }
                    },
                    response => {
                        // error callback
                        this.$Message.error(this.$t("message.tipWrong"));
                    }
                );
            },
            tapModelAdd() {//添加模板显示
                this.modalAdd = true;
            },
            tapAddPostDel(row) {//删除当前行数据
                console.log(row)
                let token = window.localStorage.getItem('token');
                let id = this.postNewComList[row.index].id;
                let data = {
                    token: token,
                    id: id
                };
                this.axios({
                    url: 'besser/fbcc/models/noteModelDel',
                    method: 'post',
                    data: data,
                    transformRequest: [
                        function (data) {
                            // Do whatever you want to transform the data
                            let ret = ''
                            for (let it in data) {
                                ret +=
                                    encodeURIComponent(it) +
                                    '=' +
                                    encodeURIComponent(data[it]) +
                                    '&'
                            }
                            return ret
                        }
                    ],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.getModelTableList();
                            this.$Message.success("删除模板成功");
                        } else {
                            this.$Message.error("删除模板失败");
                        }
                    })
                    .catch(err => {
                        this.$Message.error("删除模板错误");
                    })
            },
            tapAddPostEdit(row) {//编辑模板数据
                console.log(row)
                this.templet.id  = this.postNewComList[row.index].id || "";
                this.templet.title  = row.row.label || "";
                this.templet.content = row.row.content || "";
                this.templet.loc = row.row.position || "";
                this.templet.url = row.row.url || "";
                if(this.templet.url){
                    let img = this.templet.url.split(",")
                    this.modeluploadList = [];
                    for(let i=0;i<img.length;i++){
                        let file = {
                            url: this.fileDownUrl +img[i],
                            name: img[i],
                            status:"finished"
                        };
                        this.modeluploadList.push(file)
                    }
                }
                this.modalAdd = true;
            },
            postnewPane(val){//控制当前发帖方式
                this.postType = val.slice(-1) -1;
            },
            clearTempletData() {//清楚模板数据
                this.templet={
                    title:"",
                        content:"",
                        url:"",
                        loc:"",
                        id:""
                };
                this.modeluploadList = []
            },
            uploadFiles() {
                let self =this;
                var Bucket = 'besser-facebook-1253592979';
                var Region = 'ap-shanghai';
                var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
                var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';

                // 计算签名
                var getAuthorization = function (options, callback) {
                    var method = (options.Method || 'get').toLowerCase();
                    var key = options.Key || '';
                    var pathname = key.indexOf('/') === 0 ? key : '/' + key;

                    /*var url = '../server/auth.php';*/
                    var url = 'http://127.0.0.1:3000/auth.js';
                    var xhr = new XMLHttpRequest();
                    var data = {
                        method: method,
                        pathname: pathname,
                    };
                    xhr.open('POST', url, true);
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.onload = function (e) {
                        if (e.target.responseText === 'action deny') {
                            alert('action deny');
                        } else {
                            callback(e.target.responseText);
                        }
                    };
                    xhr.send(JSON.stringify(data));
                };

                // 上传文件
                var uploadFile = function (file, callback) {
                    let random = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()
                    var Key = 'appupgrade/upload/images/' + random +file.name; // 这里指定上传目录和文件名
                    getAuthorization({Method: 'put', Key: Key}, function (auth) {

                        var url = prefix + Key;
                        var xhr = new XMLHttpRequest();
                        xhr.open('put', url, true);
                        xhr.setRequestHeader('Authorization', auth);
                        xhr.onload = function () {
                            if (xhr.status === 200 || xhr.status === 206) {
                                /*var ETag = xhr.getResponseHeader('etag');*/
                                callback(null, {url: url});
                            } else {
                                callback('文件 ' + Key + ' 上传失败，状态码：' + xhr.status);
                            }
                        };
                        xhr.onerror = function () {
                            callback('文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则');
                        };
                        xhr.send(file);
                    });
                };

                var selfUpload = function (e) {
                    var file = self.postType ? document.getElementById('selfUpload2').files[0] : document.getElementById('selfUpload1').files[0];
                    if (!file) {
                        return;
                    }
                    file && uploadFile(file, function (err, data) {

                        let url = data.url;
                        let name = url.split("/").slice(-1)[0];
                        let file = {
                            url: url,
                            name: name,
                            status:"finished"
                        };
                        if(self.postType){
                            self.modeluploadList.push(file)
                        }else {
                            self.uploadList.push(file)
                        }
                    });
                };
                for(let i=0;i <document.getElementsByClassName('selfUpload').length;i++){
                    document.getElementsByClassName('selfUpload')[i].onchange = selfUpload
                }
            }
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            this.modeluploadList = this.$refs.modelupload.fileList;
            this.getToken();
            this.getPostNewList();
            this.getModelTableList();
            this.uploadFiles();
        }
    }

</script>
