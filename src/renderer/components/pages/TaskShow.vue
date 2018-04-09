<style scoped>

.time {
    margin-top: -3px;
    font-size: 14px;
    font-weight: bold;
}

.content {
    padding-top: 0px;
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

.content-dec {
    /*margin-top: 8px;*/
    /*margin-bottom: 8px;*/
}

.trash-list {
    font-size: 12px;
    color: #80848f;
}

.ivu-btn-text:hover {
    color: #f5222d;
}

a.trash-list:hover {
    color: #ed3f14;
}

.ivu-progress-bg {
    border-radius: 1px;
}

.ivu-progress-inner {
    background-color: #f3f3f3;
    border-radius: 1px;
}

</style>

<template>

<Row type="flex" justify="center" align="top" class="code-row-bg" style="margin-top:0px;overflow:auto;height:100%;">
    <Col span="24">
        <Card>
            <p slot="title">
                {{ $t("message.taskTitle") }}
            </p>
            <a href="#" slot="extra">
          {{ $t("message.taskSwitchDec") }}
          <i-switch size="large" v-model="switchNotice" @on-change="tapSwitchNotice" style="margin-left:15px;">
              <span slot="open">{{ $t("message.taskSwitchOn") }}</span>
              <span slot="close">{{ $t("message.taskSwitchOff") }}</span>
          </i-switch>
        </a>
            <Row>
                <Col span="12">
                    <div class="example-case">

                        <Timeline>
                            <TimelineItem v-for="(item, idx) in taskListAll" :key="idx">
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
                        <p v-if="taskListAllArr.length > 5">
                            <a class="trash-list" @click="trashList">
                                <Icon type="trash-a" style="padding-right:5px;padding-left:20px;"></Icon>{{ $t("message.taskListClean") }}
                            </a>
                            <Page :total="pageTotal" :page-size="5" @on-change="tapPage" size="small" style="float:right;"></Page>
                        </p>
                        <p v-if="taskListAll.length === 0" style="text-align:center;">
                            {{ $t("message.taskListNone") }}
                        </p>
                    </div>
                    <!-- <div class="example-header">
                <span>消息提示</span>
              </div>
              <div class="example-desc">
                <div>
                  <p>
                    打开消息提示功能
                    <Switch size="large" v-model="switchNotice" @on-change="tapSwitchNotice" style="margin-left:15px;">
                        <span slot="open">开启</span>
                        <span slot="close">关闭</span>
                    </Switch>
                  </p>
                </div>
              </div> -->
                </Col>
                <div class="example-split"></div>
                <Col span="12">
                    <div class="example-case">
                        <Timeline>
                            <TimelineItem v-for="(itemDelay, idxDelay) in dalayTaskListAllPage" :key="idxDelay">
                                <Icon slot="dot" type="ios-clock-outline"></Icon>
                                <span>
                          <p class="time">{{itemDelay.doTime}}
                            <Button type="text" style="float:right;" @click="cancleDelayTaskOne(idxDelay)" v-if="showDeviceDelay === idxDelay">{{$t('message.cancelTask')}}</Button>

                          </p>
                          <p class="content">
                            <label class="content-dec">{{itemDelay.imei.length}}{{$t('message.taskListOneAccount')}}</label> |
                            <label class="content-dec">
                              {{itemDelay.taskType}}
                            </label>
                          </p>
                          <a class="content" @click="tapShowDeviceDelay(idxDelay)" v-if="showDeviceDelay !== idxDelay" style="color:#6B717D">
                             {{ $t("message.taskListOneTipDetail") }}<Icon type="chevron-right" style="padding-left:5px;"></Icon>
                          </a>
                          <a class="content" @click="tapShowDeviceDelay(idxDelay)" v-if="showDeviceDelay === idxDelay" style="color:#6B717D">
                             {{ $t("message.taskListOneTipDetail") }}<Icon type="chevron-down" style="padding-left:5px;"></Icon>
                          </a>
                          <div v-for="(itemImei, idxList) in itemDelay.imei" :key="idxList"  v-if="showDeviceDelay === idxDelay">
                            <p class="content">
                              <Icon type="record" style="padding-right:5px;color:#19be6b"></Icon>{{ $t("message.account") }}[ {{itemImei}} ]
                            </p>
                          </div>
                        </span>
                            </TimelineItem>
                        </Timeline>
                        <p v-if="dalayTaskListAllPage.length !== 0">
                            <a class="trash-list" @click="cancleDelayTaskAll">
                                <Icon type="stop" style="padding-right:5px;padding-left:20px;"></Icon>{{$t('message.cancelAll')}}
                            </a>
                            <Page :total="pageTotalDelay" :page-size="5" @on-change="tapPageDelay" size="small" style="float:right;"></Page>
                        </p>
                        <p v-if="dalayTaskListAllPage.length === 0" style="text-align:center;">
                            {{$t('message.NoDelayTask')}}
                        </p>
                    </div>

                </Col>
            </Row>
        </Card>
    </Col>
</Row>

</template>

<script>

export default {
    data() {
            return {
                taskListAll: [],
                taskListAllArr: [],
                delayTaskListAll: [],
                dalayTaskListAllPage: [],
                list: [],
                pageTotal: 0,
                pageTotalDelay: 0,
                showDevice: false,
                showDeviceDelay: false,
                switchNotice: true
            }
        },
        mounted() {
            this.getTaskList();
            this.getDelayTaskList();
        },
        methods: {
            getTaskList() {
                    let localstroage = window.localStorage;
                    let mobileNow = localstroage.getItem('mobile');
                    let nameKeyNow = 'taskList' + mobileNow;
                    let taskListLocal = localstroage.getItem(nameKeyNow);

                    if (taskListLocal !== null) {
                        // console.log('taskListLocal的内容',taskListLocal)
                        let taskListLocalJson = JSON.parse(localstroage.getItem(nameKeyNow));
                        this.taskListAllArr = taskListLocalJson.taskList;
                        this.taskListAll = this.taskListAllArr.slice(0, 5);

                        this.pageTotal = this.taskListAllArr.length;
                        // console.log('taskListGet的内容',this.taskListAllArr)
                        // console.log('taskListAll的内容',this.taskListAll)

                    }

                    let switchNoticeGet = localstroage.getItem('switchNotice');
                    if (switchNoticeGet !== null) {
                        this.switchNotice = switchNoticeGet === 'true' ? true : false;
                        // console.log('switchNotice的内容',switchNoticeGet)
                    }
                },
                getDelayTaskList() {

                    let localstroage = window.localStorage;
                    let token = localstroage.getItem('token');
                    this.axios({
                            url: 'besser/fbcc/tasks/getDelayTasks',
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
                            if (response.data.code === 200) {

                                this.delayTaskListAll = response.data.data;
                                this.pageTotalDelay = this.delayTaskListAll.length;
                                // this.dalayTaskListAllPage = this.delayTaskListAll.slice(0,5);
                                let delayTaskPageOne = this.delayTaskListAll.slice(0, 5);
                                this.delayTaskListShow(delayTaskPageOne);


                            }

                        }, response => {
                            // error callback
                            this.$Message.error(this.$t("message.tipWrong"));
                        });

                },
                delayTaskListShow(delayTaskPageOne) {

                    var delayListOrgTrash = [];
                    for (var i = 0; i < delayTaskPageOne.length; i++) {
                        let mainIdGet = delayTaskPageOne[i].mainId;
                        let delaySecondGet = delayTaskPageOne[i].delaySecond;
                        let doTimeGet = this.getClockTime(mainIdGet, delaySecondGet);
                        let taskTypeGet = '';

                        for (var j = 0; j < delayTaskPageOne[i].tasks.length; j++) {

                            switch (delayTaskPageOne[i].tasks[j].type) {
                                case 33:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.post');
                                    break;
                                case 49:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.addFriendKey');
                                    break;
                                case 50:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.friendTitleOne');
                                    break;
                                case 51:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.friendTitleThree');
                                    break;
                                case 52:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.addFriendTwo');
                                    break;
                                case 53:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.addFriendOK');
                                    break;
                                case 54:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.importingFriends');
                                    break;
                                case 65:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.replay');
                                    break;
                                case 82:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.renovatePersonalTimeLine');
                                    break;
                                case 83:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.ViewDynamics');
                                    break;
                                case 84:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.randomUpvote');
                                    break;
                                case 85:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.viewNews');
                                    break;
                                case 86:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.search');
                                    break;
                                case 87:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.timeLineShare');
                                    break;
                                default:
                                    taskTypeGet = taskTypeGet + ' '+ this.$t('message.taskdetail');
                            }
                            // console.log('任务的名称: ', taskTypeGet)
                        }
                        //
                        let delayTaskListAllOne = {
                            doTime: doTimeGet,
                            taskType: taskTypeGet,
                            imei: delayTaskPageOne[i].imei,
                            mainId: mainIdGet,
                            taskData: delayTaskPageOne[i].tasks[0].data
                        }

                        delayListOrgTrash.push(delayTaskListAllOne);
                    }

                    this.dalayTaskListAllPage = delayListOrgTrash;
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
                tapShowDevice(idx) {
                    this.showDevice = this.showDevice === idx ? false : idx;
                },
                tapShowDeviceDelay(idxDelay) {
                    this.showDeviceDelay = this.showDeviceDelay === idxDelay ? false : idxDelay;
                },
                tapPage(val) {

                    let valLength = (Number(val) - 1) * 5;
                    this.taskListAll = this.taskListAllArr.slice(valLength, valLength + 5);
                },

                tapPageDelay(val) {
                    let valLength = (Number(val) - 1) * 5;
                    let delayTaskPageTwo = this.delayTaskListAll.slice(valLength, valLength + 5);
                    this.delayTaskListShow(delayTaskPageTwo);
                },

                tapSwitchNotice(val) {
                    console.log('开关', val)
                    let localstroage = window.localStorage;
                    localstroage.setItem('switchNotice', val);
                },

                cancleDelayTaskOne(idxDelay) {
                    this.$Message.info(this.$t('message.canceling'));
                    let mainIdGet = this.dalayTaskListAllPage[idxDelay].mainId;
                    let localstroage = window.localStorage;
                    let token = localstroage.getItem('token');
                    this.axios({
                            url: 'besser/fbcc/tasks/cancelDelayTask',
                            method: 'post',
                            data: {
                                token: token,
                                mainId: mainIdGet
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
                            console.log('取消延迟任务: ', response.data)
                            if (response.data.code === 200) {
                                this.$Message.success(this.$t('message.cancelSuccess'));
                                this.dalayTaskListAllPage.splice(idxDelay, 1);

                            }

                        }, response => {
                            // error callback
                            this.$Message.error(this.$t("message.tipWrong"));
                        });

                },

                cancleDelayTaskAll() {

                    let delayPageOne = this.dalayTaskListAllPage;
                    for (var i = 0; i < delayPageOne.length; i++) {
                        this.cancleDelayTaskOne(i);
                    }

                },

                trashList() {
                    this.$Message.loading(this.$t("message.tipLoadClean"));
                    let paras = [];
                    for(let i in this.taskListAllArr){
                        let para ={
                            imei: this.taskListAllArr[i].imeiList[0],
                            batchId: this.taskListAllArr[i].batchId,
                            mainId: this.taskListAllArr[i].mainId
                        }
                        paras.push(para)
                    }
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
                                this.$Message.success(this.$t('message.delTaskListSuccess'));
                                this.taskListAll = [];
                                this.taskListAllArr = [];

                                let taskList = {
                                    taskList: []
                                }
                                let taskListAllLocalString = JSON.stringify(taskList);
                                let localstroage = window.localStorage;
                                let mobileNow = localstroage.getItem('mobile');
                                let nameKeyNow = 'taskList' + mobileNow;
                                localstroage.setItem(nameKeyNow, taskListAllLocalString);
                            } else {
                                this.$Message.warning(this.$t('message.delTaskListError'), res)
                            }
                        })
                        .catch(err => {
                            this.$Message.error(this.$t('message.delTaskListError'))
                        })
                }

        },
        sockets: {
            messageholder(value) {
                switch (value.type) {
                    case 34:
                        if (value.sign === 3) {
                            this.getTaskList();
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
