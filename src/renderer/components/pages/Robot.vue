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
    padding: 10px;
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

.demo-Circle-custom {
    & h1 {
        color: #3f414d;
        font-size: 28px;
        font-weight: normal;
    }
    & p {
        color: #657180;
        font-size: 14px;
        margin: 10px 0 15px;
    }
    & span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 14px;
        &:before {
            content: '';
            display: block;
            width: 50px;
            height: 1px;
            margin: 0 auto;
            background: #e0e3e6;
            position: relative;
            top: -15px;
        }
        ;
    }
    & span i {
        font-style: normal;
        color: #3f414d;
    }
}

.record-dort {
    padding-right: 10px;
    animation: ani-spin-bounce 1s 0s ease-in-out infinite;
}

@keyframes fa-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

.record-dort-loop {
    margin-right: 10px;
    -webkit-animation: fa-spin 2s infinite linear;
    animation: fa-spin 2s infinite linear;
}

</style>

<template>

<Row type="flex" justify="center" align="middle" class="code-row-bg">
    <Col span="24">
        <Card>
            <p slot="title">
                {{ $t("message.robot") }}
            </p>
            <a href="#" slot="extra">
                <Button type="ghost" size="small" v-on:click="tapModelSchedule" v-if="showBtn">
                    <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.robotBtnClock") }}
                </Button>
                <Button type="primary" size="small" v-on:click="tapRobet(0, 0)" v-if="showBtn">
                    <Icon type="paper-airplane" style="padding-right:5px;"></Icon>{{ $t("message.robotBtn") }}
                </Button>
                <Button type="primary" size="small" :loading="true" v-else>
                    {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                </Button>
            </a>
            <Row>
                <Col span="24">
                    <div class="example-case">

                        <div v-if="taskGo">
                            <Row type="flex" justify="center" align="top" class="code-row-bg">
                                <Col span="24" style="overflow:auto;height:340px;">
                                    <!-- <h4 style="padding-bottom:15px;">养号任务列表：</h4>
                      <p>
                        <ul v-for="(item, idx) in robotTaskAll" :key="idx">
                          <li>
                            <Icon type="record" class="record-dort" style="color:#2d8cf0;"></Icon>
                            查看动态{{item}}
                          </li>
                          <li><Icon type="record" class="record-dort" style="color:#ed3f14;"></Icon>刷新个人时间线</li>
                          <li><Icon type="record" class="record-dort" style="color:#2d8cf0;"></Icon>查看动态</li>
                          <li><Icon type="record" class="record-dort" style="color:#19be6b;"></Icon>随机点赞</li>
                          <li><Icon type="record" class="record-dort" style="color:#19be6b;"></Icon>查看新闻</li>
                          <li><Icon type="record" class="record-dort" style="color:#19be6b;"></Icon>搜索</li>
                          <li><Icon type="loop" class="record-dort-loop" style="color:#19be6b;"></Icon>在时间线上分享</li>
                        </ul>
                      </p> -->
                                    <Timeline>
                                        <TimelineItem v-for="(item, idx) in robetTaskListAll" :key="idx">
                                            <Icon type="camera" slot="dot" v-if="item.taskType === 33"></Icon>
                                            <Icon type="android-person-add" slot="dot" v-else-if="item.taskType === 49"></Icon>
                                            <Icon type="android-person-add" slot="dot" v-else-if="item.taskType === 50"></Icon>
                                            <Icon type="android-person-add" slot="dot" v-else-if="item.taskType === 51"></Icon>
                                            <Icon type="android-person-add" slot="dot" v-else-if="item.taskType === 52"></Icon>
                                            <Icon type="android-person-add" slot="dot" v-else-if="item.taskType === 53"></Icon>
                                            <Icon type="android-person-add" slot="dot" v-else-if="item.taskType === 54"></Icon>
                                            <Icon type="chatbox-working" slot="dot" v-else-if="item.taskType === 65"></Icon>
                                            <Icon type="pin" slot="dot" v-else-if="item.taskType === 82"></Icon>
                                            <Icon type="pin" slot="dot" v-else-if="item.taskType === 83"></Icon>
                                            <Icon type="pin" slot="dot" v-else-if="item.taskType === 84"></Icon>
                                            <Icon type="pin" slot="dot" v-else-if="item.taskType === 85"></Icon>
                                            <Icon type="pin" slot="dot" v-else-if="item.taskType === 86"></Icon>
                                            <Icon type="pin" slot="dot" v-else-if="item.taskType === 87"></Icon>
                                            <Icon type="ios-list" slot="dot" v-else></Icon>
                                            <span>
                                <p class="time">{{item.taskName}}
                                  <Progress :percent="item.progress" :stroke-width="5" style="width:150px;padding-left:15px;" status="active"></Progress>

                                </p>
                                <p class="content">
                                  <label class="content-dec">{{item.imeiList.length}}{{ $t("message.taskListOneAccount") }}</label> |
                                  <label class="content-dec">{{item.taskStatus}}
                                    <label style="color:#ff9900" v-if="item.error > 0"> {{item.error}}{{ $t("message.taskListOneError") }}</label>
                                  </label>
                                  <label style="float:right;font-size:11px;font-weight:350;color:#888888;">
                                    {{item.startTime}}{{item.endTime !== '' ? ('~ '+item.endTime) : ''}}
                                  </label>
                                </p>
                                <a class="content" @click="tapShowDevice(idx)" v-if="showDevice !== idx" style="color:#6B717D">
                                   {{ $t("message.taskListOneTipDetail") }}<Icon type="chevron-right" style="padding-left:5px;"></Icon>
                                </a>
                                <a class="content" @click="tapShowDevice(idx)" v-if="showDevice === idx" style="color:#6B717D">
                                   {{ $t("message.taskListOneTipDetail") }}<Icon type="chevron-down" style="padding-left:5px;"></Icon>
                                </a>
                                <div v-for="(list, idxList) in item.imeiList" :key="idxList"  v-if="showDevice === idx">
                                  <p class="content">
                                    <Icon type="record" style="padding-right:5px;color:#19be6b"></Icon>{{ $t("message.account") }}[{{list.imei}}]
                                    <div style="padding:5px 15px 3px 15px;" v-if="list.ret === 0">
                                      <label style="color:#1c2438;">{{ $t("message.taskListStepOne") }}</label>
                                      <Icon type="ios-play-outline" style="padding-right:10px;padding-left:10px;color:#80848f;"></Icon>
                                      <label style="color:#80848f;">{{ $t("message.taskListStepTwo") }}</label>
                                      <Icon type="ios-play-outline" style="padding-right:10px;padding-left:10px;color:#80848f;"></Icon>
                                      <label style="color:#80848f;">{{ $t("message.taskListStepThree") }}</label>
                                    </div>
                                    <div style="padding:5px 15px 3px 15px;" v-else-if="list.ret === 1">
                                      <label style="color:#495060;">{{ $t("message.taskListStepOne") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#495060;"></Icon>
                                      <label style="color:#1c2438;">{{ $t("message.taskListStepTwo") }}</label>
                                      <Icon type="ios-play-outline" style="padding-right:10px;padding-left:10px;color:#80848f;"></Icon>
                                      <label style="color:#80848f;">{{ $t("message.taskListStepThree") }}</label>
                                    </div>
                                    <div style="padding:5px 15px 3px 15px;" v-else-if="list.ret === 2">
                                      <label style="color:#495060;">{{ $t("message.taskListStepOne") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#495060;"></Icon>
                                      <label style="color:#495060;">{{ $t("message.taskListStepTwo") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#495060;"></Icon>
                                      <label style="color:#1c2438;">{{ $t("message.taskListStepThree") }}</label>
                                    </div>
                                    <div style="padding:5px 15px 3px 15px;" v-else-if="list.ret === 3">
                                      <label style="color:#495060;">{{ $t("message.taskListStepOne") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#495060;"></Icon>
                                      <label style="color:#495060;">{{ $t("message.taskListStepTwo") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#ff9900;"></Icon>
                                      <label style="color:#ff9900;">{{ $t("message.taskListStepNet") }}</label>
                                    </div>
                                    <div style="padding:5px 15px 3px 15px;" v-else-if="list.ret === 4">
                                      <label style="color:#495060;">{{ $t("message.taskListStepOne") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#495060;"></Icon>
                                      <label style="color:#495060;">{{ $t("message.taskListStepTwo") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#ed3f14;"></Icon>
                                      <label style="color:#ed3f14;">{{ $t("message.taskListStepWrong") }}( {{list.data}} )</label>
                                    </div>
                                    <div style="padding:5px 15px 3px 15px;" v-else>
                                      <label style="color:#495060;">{{ $t("message.taskListStepOne") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#495060;"></Icon>
                                      <label style="color:#495060;">{{ $t("message.taskListStepTwo") }}</label>
                                      <Icon type="ios-play" style="padding-right:10px;padding-left:10px;color:#ff9900;"></Icon>
                                      <label style="color:#ff9900;">{{ $t("message.taskListStepAccountWong") }}</label>
                                    </div>
                                  </p>
                                </div>
                              </span>
                                        </TimelineItem>
                                    </Timeline>
                                    <p v-if="robetTaskListAllArr.length > 5">
                                        <a class="trash-list" @click="trashList">
                                            <Icon type="trash-a" style="padding-right:5px;padding-left:20px;"></Icon>{{ $t("message.taskListClean") }}
                                        </a>
                                        <Page :total="pageTotal" :page-size="20" @on-change="tapPage" size="small" style="float:right;"></Page>
                                    </p>
                                    <p v-if="robetTaskListAll.length === 0" style="text-align:center;">
                                        {{ $t("message.taskListNone") }}
                                    </p>
                                </Col>
                                <!-- <Col span="8" style="padding-top:35px;">

                      <i-circle :percent="80" status="active" style="float:right;">
                        <span class="demo-Circle-inner" style="font-size:24px">80%</span>
                      </i-circle>

                    </Col> -->
                            </Row>
                        </div>

                        <div v-else>

                            <p>
                                <ul>
                                    <li>
                                        <Icon type="loop" style="padding-right:10px;"></Icon>刷新个人时间线</li>
                                    <li>
                                        <Icon type="loop" style="padding-right:10px;"></Icon>查看动态</li>
                                    <li>
                                        <Icon type="loop" style="padding-right:10px;"></Icon>随机点赞</li>
                                    <li>
                                        <Icon type="loop" style="padding-right:10px;"></Icon>查看新闻</li>
                                    <li>
                                        <Icon type="loop" style="padding-right:10px;"></Icon>搜索</li>
                                    <li>
                                        <Icon type="loop" style="padding-right:10px;"></Icon>在时间线上分享</li>
                                </ul>
                            </p>
                        </div>


                    </div>
                    <div class="example-header">
                        <span>功能介绍</span>
                    </div>
                    <div class="example-desc">
                        <div>
                            <p>
                                模仿正常人批量操作，刷动态、看新闻、搜索等。
                            </p>
                        </div>
                    </div>
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
                        <!-- <Col span="3" offset="1">
                        <Button type="ghost" @click="handleScheduleDel(index)">{{ $t("message.delect") }}</Button></Button>
                    </Col> -->
                    </Row>
                </FormItem>
                <!-- <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" long @click="handleScheduleAdd" icon="plus-round">{{ $t("message.postnewClockAdd") }}</Button>
                    </Col>
                </Row>
            </FormItem> -->
            </Form>
        </p>
    </Modal>
    <!-- model end -->
</Row>

</template>

<script>

export default {
    data() {
            return {
                robetTaskListAll: [],
                robetTaskListAllArr: [],
                pageTotal: 0,
                showDevice: false,
                showBtn: true,
                timecount: this.GLOBAL.limitSec,
                taskGo: true,
                robotTaskAll: [],
                modalSchedule: false,
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
                }
            }
        },
        mounted() {
            this.getTaskList();
        },
        methods: {
            getTaskList() {
                    let localstroage = window.localStorage;
                    let mobileNow = localstroage.getItem('mobile');
                    let nameKeyNow = 'robotTaskList' + mobileNow;
                    let taskListLocal = localstroage.getItem(nameKeyNow);

                    if (taskListLocal !== null) {
                        
                        let taskListLocalJson = JSON.parse(localstroage.getItem(nameKeyNow));
                        this.robetTaskListAllArr = taskListLocalJson.taskList;
                        this.robetTaskListAll = this.robetTaskListAllArr.slice(0, 20);
                        console.log('robetTaskListAll',this.robetTaskListAll)
                        this.pageTotal = this.robetTaskListAllArr.length;
                        // console.log('taskListGet的内容',this.taskListAllArr)
                        // console.log('taskListAll的内容',this.taskListAll)

                    }

                    let switchNoticeGet = localstroage.getItem('switchNotice');
                    if (switchNoticeGet !== null) {
                        this.switchNotice = switchNoticeGet === 'true' ? true : false;
                        // console.log('switchNotice的内容',switchNoticeGet)
                    }
                },
                tapShowDevice(idx) {
                    this.showDevice = this.showDevice === idx ? false : idx;
                },
                trashList() {
                    this.$Message.loading(this.$t("message.tipLoadClean"));
                    console.log(this.robetTaskListAllArr)
                    let paras = [];
                    for(let i in this.robetTaskListAllArr){
                        let para ={
                            imei: this.robetTaskListAllArr[i].imeiList[0],
                            batchId: this.robetTaskListAllArr[i].batchId,
                            mainId: this.robetTaskListAllArr[i].mainId
                        }
                        paras.push(para)
                    }
                    this.robetTaskListAll = [];
                    this.robetTaskListAllArr = [];

                    let taskList = {
                        taskList: []
                    }
                    let taskListAllLocalString = JSON.stringify(taskList);
                    let localstroage = window.localStorage;
                    let mobileNow = localstroage.getItem('mobile');
                    let nameKeyNow = 'robotTaskList' + mobileNow;

                    localstroage.setItem(nameKeyNow, taskListAllLocalString);
                    this.axios({
                        url: 'besser/fbcc/tasks/clearHNumber',
                        method: 'post',
                        data: {
                            token: window.localStorage.getItem('token'),
                            para: JSON.stringify(paras)
                        },
                        transformRequest: [
                            function(data) {
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
                                this.$Message.success('清除任务列表成功')
                            } else {
                                this.$Message.warning('清除任务列表异常', res)
                            }
                        })
                        .catch(err => {
                            console.error('清除任务列表异常', err)
                            this.$Message.error('清除任务列表异常')
                        })
                },
                tapPage(val) {

                    let valLength = (Number(val) - 1) * 20;
                    this.robetTaskListAll = this.robetTaskListAllArr.slice(valLength, valLength + 20);
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
                tapScheduleCancel() {
                    let nameVal = 'formSchedule';
                    this.$refs[nameVal].resetFields();
                },
                handleScheduleDel(index) {
                    this.formSchedule.items[index].status = 0;
                },
                tapScheduleOk() {
                    let nameVal = 'formSchedule';

                    this.$refs[nameVal].validate((valid) => {
                        if (valid) {
                            console.log('选择的日期：', this.formSchedule.items)

                            let dateItems = this.formSchedule.items;
                            for (var i = 0; i < dateItems.length; i++) {
                                dateItems[i]
                                if (dateItems[i].status === 1) {
                                    let dateValOrg = dateItems[i].dateVal;

                                    let myDateNow = new Date();
                                    let myDateOrg = new Date(dateValOrg);

                                    let dateValNow = myDateNow.getTime();
                                    let dateValSce = myDateOrg.getTime();

                                    console.log('选择的日期fa：', dateValSce)
                                    console.log('选择的日期now：', dateValNow)

                                    let dateValCha = dateValSce - dateValNow;
                                    console.log('选择的日期cha：', dateValCha)
                                    if (dateValCha > 0) {
                                        console.log('选择的日期cha88：')
                                        let dateValChaTwo = parseInt(dateValCha / 1000);
                                        this.tapRobet(dateValNow, dateValChaTwo);
                                    } else {
                                        this.$Message.warning('时间不能是过去的');
                                    }


                                }

                            } //for


                        } else {
                            this.$Message.error('Fail!');
                        }
                    })
                },
                tapRobet(dateValNow, timeVal) {

                    let taskNow = window.sessionStorage.getItem('taskNow');
                    let network = window.sessionStorage.getItem('network');

                    if (network !== '200') {

                        this.$Message.error(this.$t("message.tipNetWrong"));

                    } else if (taskNow !== '' && taskNow !== null) {

                        this.$Notice.warning({
                            title: taskNow + this.$t("message.tipWarnTaskNowNot"),
                        });

                    } else {

                        let localstroage = window.localStorage;
                        let imei = this.checkImeiOnline();
                        let token = localstroage.getItem('token');
                        if (imei.length > 0) {

                            this.changeBtnStatus();
                            window.sessionStorage.setItem('taskNow', this.$t("message.robot"));

                            this.tapRobetTaskGet(dateValNow, timeVal, imei, token);

                            // if(timeVal === 0){
                            //   this.keepTask('0041', '0042', 81, this.$t("message.robot"), imei);
                            // }

                            this.$Message.success(this.$t("message.tipSuccessTaskOk"));

                        } else {
                            this.$Message.warning(this.$t("message.tipWarnChooseAccount"));
                        }

                    } //if tasknow

                }, //addFriendRecommend

                tapRobetTaskGet(dateValNow, timeVal, imei, token) {

                    this.changeBtnStatus();
                    window.sessionStorage.setItem('taskNow', this.$t("message.reply"));

                    this.axios({
                            url: 'besser/fbcc/tasks/weightRandFnTasks',
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
                            console.log('返回的数据: ', response.data)
                            if (response.data.code === 200) {

                                console.log('返回的数据2: ', response.data.data)
                                let listVal = response.data.data;
                                this.robotTaskAll = listVal;

                                let mainId = 0;
                                if (Number(timeVal) > 0) {
                                    // console.log('mainId的判断')
                                    mainId = dateValNow.toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                    // console.log('mainId的判断2', mainId)
                                } else {
                                    // console.log('mainId的判断3')
                                    mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                }

                                let taskList = [];
                                for (var i = 0; i < listVal.length; i++) {

                                    let batchIdGet = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                    let taskListOne = {
                                        type: listVal[i],
                                        batchId: batchIdGet,
                                        data: {}
                                    }
                                    taskList.push(taskListOne);
                                    let taskNameCreate = '';
                                    switch (listVal[i]) {
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
                                    if (timeVal === 0) {

                                        this.keepRobetTask(mainId, batchIdGet, listVal[i], taskNameCreate, imei);
                                    }
                                    this.keepRobetTaskLocal(mainId, batchIdGet, listVal[i], taskNameCreate, imei, timeVal);


                                }
                                // this.keepRobetTaskMainId(mainId, timeVal);
                                this.tapDoRobet(taskList, dateValNow, mainId, timeVal, imei, token);


                            } else {

                                this.$Notice.warning({
                                    title: this.$t("message.tipErrorettingAccountCancle"),
                                    desc: imei + response.data.msg
                                });

                            }

                        }, response => {
                            // error callback
                            this.$Message.error(this.$t("message.tipWrong"));
                        });




                },

                tapDoRobet(taskList, dateValNow, mainId, timeVal, imei, token) {


                    let body = {
                        imei: imei,
                        token: token,
                        mainId: mainId,
                        delaySecond: timeVal,
                        tasks: taskList
                    };
                    let bodyStr = JSON.stringify(body);
                    this.$socket.emit('messageholder', {
                        sign: 1,
                        type: 33,
                        body: bodyStr
                    });


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

                keepRobetTask(mainId, batchId, type, name, imei) {
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

                getClockTime(mainId) {
                    let sendTime = mainId.substr(0, 13);
                    let d = new Date(Number(sendTime));
                    let day = d.getDate();
                    let month = d.getMonth() + 1;
                    let hour = d.getHours();
                    let min = d.getMinutes();
                    let postTime = month + "/" + day + ' ' + hour + ':' + min;
                    return postTime;
                },

                keepRobetTaskLocal(mainId, batchId, type, name, imei, timeVal) {

                    let startTime = this.getClockTime(mainId);

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
                    let nameKeyNow = 'robotTaskList' + mobileNow;
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
                    this.getTaskList();


                },

                // keepRobetTaskMainId(mainId, timeVal){
                //
                //   if(timeVal > 0){
                //
                //     let taskListOne = {
                //       mainId: mainId,
                //       delaySecond: timeVal
                //     }
                //
                //   }
                //
                //
                //   let localstroage = window.localStorage;
                //   let mobileNow = localstroage.getItem('mobile');
                //   let nameKeyNow = 'robetMainId' + mobileNow;
                //   let taskListLocal = localstroage.getItem(nameKeyNow);
                //   if(taskListLocal !== null){
                //
                //     let taskListAllLocalArr = JSON.parse(localstroage.getItem(nameKeyNow));
                //     taskListAllLocalArr.taskList.unshift(taskListOne);
                //     localstroage.setItem(nameKeyNow, JSON.stringify(taskListAllLocalArr));
                //
                //   }else{
                //     let taskList = {
                //       taskList:[taskListOne]
                //     }
                //     let taskListAllLocalString = JSON.stringify(taskList);
                //     localstroage.setItem(nameKeyNow, taskListAllLocalString);
                //
                //   }
                //
                // },

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

                }

        },
        sockets: {
            messageholder(value) {
                switch (value.type) {
                    case 34:
                        if (value.sign === 3) {
                            let bodayGet = JSON.parse(value.body);
                            switch (bodayGet.type) {
                                case 82:
                                    this.getTaskList();
                                    break;
                                case 83:
                                    this.getTaskList();
                                    break;
                                case 84:
                                    this.getTaskList();
                                    break;
                                case 85:
                                    this.getTaskList();
                                    break;
                                case 86:
                                    this.getTaskList();
                                    break;
                                case 87:
                                    this.getTaskList();
                                    break;
                                default:

                            }

                        } else {
                            // this.$Message.error('获取设备信息失败，请重试');
                        }
                        break;
                    default:

                }
            }
        }
}

</script>
