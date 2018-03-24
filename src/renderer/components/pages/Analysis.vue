<style>

    .card_top {
        position: relative;
        overflow: hidden;
        width: 100%;
    }

    .card_top_title {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 22px;
        height: 22px;
    }

    .card_top_icon {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
    }

    .card_top_num {
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.85);
        margin-top: 4px;
        margin-bottom: 0;
        font-size: 30px;
        line-height: 38px;
        height: 38px;
    }

    .card_footer {
        border-top: 1px solid #e8e8e8;
        padding-top: 9px;
        margin-top: 8px;
    }

    .card_content {
        margin-bottom: 12px;
        position: relative;
        height: 46px;
        width: 100%;
    }

    .ivu-progress-bg {
        border-radius: 1px;
    }

    .ivu-progress-inner {
        /* background-color: #FF7540; */
        border-radius: 1px;
    }

    .homepageName {
        cursor: pointer;
        margin: 8px;
        text-align: center;
        border-radius: 6px;
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #fff;
    }

    .homepageIcon {
        position: absolute;
        right: 13px;
        top: -2px;
    }
</style>

<template>

    <div style="overflow:auto;height:580px;">
        <Tabs v-model="analysisTapPaneVal" size="small" @on-click="analysisTapPane" type="card">
            <TabPane label="基本数据" name="tab1">
                <div v-if="analysisTapPaneVal == 'tab1'">
                    <Row style="background:#eee;padding: 10px">
                        <Col span="8">
                        <Card :bordered="false" style="height:180px;margin: 0 8px;">

                            <div class="card_top">
                                <div class="card_top_title">
                                    <span>设备信息</span>
                                    <span class="card_top_icon">
                        <Tooltip content="绑定的设备信息" placement="left-start">
                            <Icon type="ios-information-outline" style="font-size:16px;"></Icon>
                        </Tooltip>
                      </span>

                                </div>
                                <div class="card_top_num">
                                    {{deviceListAllOnline.length + deviceListAllOffline.length}}
                                </div>
                            </div>

                            <div class="card_content" style="padding-top:8px;">
                                <p>
                                    <Icon type="record" style="padding-left:0px;padding-right:8px;color:#00D01F"></Icon>
                                    正常在线 {{deviceListAllOnline.length}}
                                </p>
                                <p>
                                    <Icon type="record" style="padding-left:0px;padding-right:8px;color:#FF0000"></Icon>
                                    异常离线 {{deviceListAllOffline.length}}
                                </p>
                            </div>

                            <div class="card_footer">
                                <div class="card_fooder_dec">
                        <span>
                        {{deviceListAllOffline.length === 0 ? '所有设备运转正常' : ('有' + deviceListAllOffline.length + '个设备异常')}}
                      </span>
                                </div>
                            </div>

                        </Card>
                        </Col>
                        <Col span="8">

                        <Card :bordered="false" style="height:180px;margin: 0 8px;">

                            <div class="card_top">
                                <div class="card_top_title">
                                    <span>好友总数</span>
                                    <span class="card_top_icon">
                    <Tooltip content="所有账号的好友数量总计" placement="left-start">
                        <Icon type="ios-information-outline" style="font-size:16px;"></Icon>
                    </Tooltip>
                  </span>

                                </div>
                                <div class="card_top_num">
                                    {{allFriendCount}}
                                </div>
                            </div>

                            <div class="card_content" style="padding-top:8px;">
                                <p>
                                    <span style="font-weight:300;">周同比</span> <span
                                        style="width:20px;">{{weekrateAll}}</span>
                                    <Icon type="arrow-up-b" style="padding-left:8px;color:#FF0000"></Icon>
                                </p>
                                <p>
                                    <span style="font-weight:300;">日环比</span> <span
                                        style="width:20px;">{{dayrateAll}}</span>
                                    <Icon type="arrow-down-b" style="padding-left:8px;color:#00D01F"></Icon>
                                </p>
                            </div>
                            <div class="card_footer">
                                <div class="card_fooder_dec">
                                    <span>日均增长量 {{dayaddAll}}</span>
                                </div>
                            </div>

                        </Card>

                        </Col>
                        <Col span="8">

                        <Card :bordered="false" style="height:180px;margin: 0 8px;">

                            <div class="card_top">
                                <div class="card_top_title">
                                    <span>任务执行情况</span>
                                    <span class="card_top_icon">
                    <Tooltip content="设备执行任务成功的概率" placement="left-start">
                        <Icon type="ios-information-outline" style="font-size:16px;"></Icon>
                    </Tooltip>
                  </span>

                                </div>
                                <div class="card_top_num">
                                    {{taskCount.successPercent}}%
                                </div>
                            </div>

                            <div class="card_content">
                                <p style="padding-top:15px;padding-right:15px;">
                                    <Progress :percent="taskCount.successPercent" :hide-info="true" :stroke-width="10"
                                              style="border-radius:20px;"></Progress>
                                </p>
                            </div>
                            <div class="card_footer">
                                <div class="card_fooder_dec">
                                    <Icon type="android-checkbox-blank" style="padding-right:3px;color:#3AB9EE"></Icon>
                                    <span style="width:180px;font-weight:400;padding-right:8px;">成功   {{taskCount.successNum}}</span>
                                    <Icon type="android-checkbox-blank" style="padding-right:3px;color:#F3F3F3"></Icon>
                                    <span style="width:180px;font-weight:400">失败   {{taskCount.failNum}}</span>
                                </div>
                            </div>

                        </Card>

                        </Col>
                    </Row>
                    <Row style="background:#eee;padding: 0 10px 8px 10px;">

                        <Col span="24">
                        <Card :bordered="false" style="margin: 0 8px;">

                            <Row>
                                <Col span="8">

                                <Select v-model="deviceOneVal" @on-change="getImeiFriend" clearable filterable
                                        placeholder="请选择或者搜索设备">
                                    <Option v-for="(item,index) in devicesListAll" :value="item" :key="index">{{ item
                                        }}
                                    </Option>
                                </Select>

                                <div style="padding-top:15px;">

                                    <div class="card_top">
                                        <div class="card_top_title" style="margin-bottom:15px;">
                                            <span>该设备好友总数</span>
                                        </div>
                                        <div class="card_top_num">
                                            {{friendOfImeiCount}}
                                        </div>
                                    </div>

                                    <div class="card_content">
                                        <p>
                                            <label style="font-weight:400;width:200px;">周同比 {{weekrate}}</label>
                                            <Icon type="arrow-up-b" style="padding-left:8px;color:#FF0000"></Icon>
                                        </p>
                                        <p>
                                            <label style="width:180px;font-weight:400">日环比 {{dayrate}}</label>
                                            <Icon type="arrow-down-b" style="padding-left:8px;color:#00D01F"></Icon>
                                        </p>
                                    </div>
                                    <div class="card_footer" style="width:180px;">
                                        <div class="card_fooder_dec">
                                            <span>日均增长量 {{dayadd}}</span>
                                        </div>
                                    </div>

                                </div>
                                </Col>
                                <Col span="16">

                                <div style="width: 100%; height:250px;padding-left: 10px">
                                    <IEcharts :option="friendTotalChange"></IEcharts>
                                </div>

                                </Col>
                            </Row>

                        </Card>

                        </Col>
                    </Row>
                    <Row style="background:#eee;padding: 0 10px 8px 10px;">

                        <Col span="24">
                        <Card :bordered="false" style="height:400px;margin: 0 8px;">
                            <Tabs v-model="tabPaneVal" size="small" @on-click="tapTabPane">
                                <TabPane label="发帖" name="tab1"></TabPane>
                                <TabPane label="加友" name="tab2"></TabPane>
                                <TabPane label="互动" name="tab3"></TabPane>
                                <TabPane label="养号" name="tab4"></TabPane>
                                <ButtonGroup slot="extra" size="small">
                                    <Button :type="dateWeekVal" @click.native="tapDateWeek">7天</Button>
                                    <Button :type="dateMonthVal" @click.native="tapDateMonth">30天</Button>
                                </ButtonGroup>
                            </Tabs>

                            <div style="width: 100%; height:300px;">
                                <IEcharts :option="addFriendBar"></IEcharts>
                            </div>


                        </Card>

                        </Col>
                    </Row>
                </div>
            </TabPane>
            <TabPane label="主页分析" name="tab2">
                <div v-if="analysisTapPaneVal == 'tab2'">
                    <div>
                        <Row style="background:#eee;padding: 10px">
                            <Col span="24">
                            <div style="padding: 8px;text-align: center">
                                <div>主页管理</div>
                            </div>
                            </Col>
                            <Col span="8" style="height: 60px" v-for="(item,index) in homepages">
                            <div class="homepageName" @mouseover="delBtnShow(index)" @mouseout="delBtnHide(index)"
                                 v-bind:style="{background:color[index]}">
                                <span>{{item}}</span>
                                <span v-on:click="homePageEidt(1,item)" class="homepageIcon" v-show="active === index">
                                     <Icon type="close" color="#fff"></Icon>
                                </span>
                            </div>
                            </Col>
                            <Col span="8" style="border-radius: 6px;height: 60px" v-if="homepages.length <6">
                            <div @click="addHomePageBtn" class="homepageName" style="background: #fff">
                                <Icon type="plus-circled" style="color:#00D01F"></Icon>
                                <span style="color: #1c2438">添加主页</span>
                            </div>
                            </Col>
                        </Row>
                    </div>


                    <Tabs v-model="homePagePaneVal" size="small" @on-click="homePagePane">
                        <TabPane label="粉丝数" name="tab1"></TabPane>
                        <TabPane label="活跃度" name="tab2"></TabPane>
                        <TabPane label="帖子数" name="tab3"></TabPane>
                        <TabPane label="评论数" name="tab4"></TabPane>
                        <TabPane label="点赞数" name="tab5"></TabPane>
                        <TabPane label="分享数" name="tab6"></TabPane>
                        <TabPane label="浏览数" name="tab7"></TabPane>
                        <ButtonGroup slot="extra" size="small">
                            <Button :type="dateWeekVal" @click.native="tapDateWeek">7天</Button>
                            <Button :type="dateMonthVal" @click.native="tapDateMonth">30天</Button>
                        </ButtonGroup>
                    </Tabs>
                    <div style="position:relative;text-align: center">
                        <div>主页活跃度</div>
                    </div>
                    <div>
                        <div style="width: 100%; height:300px;">
                            <IEcharts :option="homepageDataChange"></IEcharts>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        <!-- 模板组添加和编辑 -->
        <Modal v-model="modalAddHome" :title="'添加主页'">
            <Form ref="addHomePageFormValidate" :model="addHomeData" label-position="right" :label-width="80"
                  :rules="ruleValidate">
                <FormItem :label="'主页名称'" prop="name">
                    <Input v-model="addHomeData.name" placeholder="输入需要添加的主页名称"></Input>
                    <RadioGroup v-model="homepageTypeOption">
                        <Radio label="自己主页"></Radio>
                        <Radio label="同行主页"></Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modalAddHome = false">取消</Button>
                <Button type="primary" :loading="loading" @click="homePageEidt(0)">{{$t('message.confirm')}}</Button>
            </div>
        </Modal>
        <Modal v-model="modaldelHome" :title="'主页管理'">
            <Form label-position="right" :label-width="80">
                <FormItem :label="'主页名称'">
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modalAddHome = false">取消</Button>
                <Button type="primary" :loading="loading" @click="homePageEidt(0)">{{$t('message.confirm')}}</Button>
            </div>
        </Modal>
    </div>

</template>

<script type="text/babel">
    // import {Facebook, FacebookApiException} from 'fb';

    import IEcharts from 'vue-echarts-v3/src/lite.js';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/chart/bar';
    // import 'echarts/lib/chart/pie';
    // import 'echarts/lib/chart/scatter';
    // import 'echarts/lib/chart/radar';
    //
    // import 'echarts/lib/chart/map';
    // import 'echarts/lib/chart/treemap';
    // import 'echarts/lib/chart/graph';
    // import 'echarts/lib/chart/gauge';
    // import 'echarts/lib/chart/funnel';
    // import 'echarts/lib/chart/parallel';
    // import 'echarts/lib/chart/sankey';
    // import 'echarts/lib/chart/boxplot';
    // import 'echarts/lib/chart/candlestick';
    // import 'echarts/lib/chart/effectScatter';
    // import 'echarts/lib/chart/lines';
    // import 'echarts/lib/chart/heatmap';
    //
    // import 'echarts/lib/component/graphic';
    // import 'echarts/lib/component/grid';
    // import 'echarts/lib/component/legend';
    import 'echarts/lib/component/tooltip';
    // import 'echarts/lib/component/polar';
    // import 'echarts/lib/component/geo';
    // import 'echarts/lib/component/parallel';
    // import 'echarts/lib/component/singleAxis';
    // import 'echarts/lib/component/brush';
    //
    import 'echarts/lib/component/title';
    //
    // import 'echarts/lib/component/dataZoom';
    // import 'echarts/lib/component/visualMap';
    //
    // import 'echarts/lib/component/markPoint';
    // import 'echarts/lib/component/markLine';
    // import 'echarts/lib/component/markArea';
    //
    import 'echarts/lib/component/timeline';
    import 'echarts/lib/component/toolbox';

    // import 'zrender/lib/vml/vml';
    export default {
        name: 'view',
        components: {
            IEcharts
        },
        props: {},
        data: () => ({
            tabPaneVal: 'tab1',
            analysisTapPaneVal: 'tab1',
            homePagePaneVal: 'tab1',
            homepageTypeOption: "自己主页",
            devicesListAll: [],
            deviceListAllOnline: [],
            deviceListAllOffline: [],
            deviceOneVal: '选择账号',
            dateWeekVal: 'primary',
            dateMonthVal: 'ghost',
            allFriendCount: 0,
            dayadd: 0,
            weekrate: 0,
            dayrate: 0,
            dayaddAll: 0,
            weekrateAll: 0,
            dayrateAll: 0,
            friendOfImeiCount: 0,
            taskCount: {},
            addFriendBar: {
                title: {
                    text: '操作',
                    textStyle: {
                        fontSize: 14
                    }
                },
                color: ['#2699FF'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '操作次数',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }]
            },
            friendTotalChange: {
                title: {
                    text: '最近7天好友数量增长趋势',
                    padding: [3, 0],
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        show: false,
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                color: ['#7c89dd'],
                grid: {
                    left: '0%',
                    right: '20px',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    show: true,
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '好友增长量',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            borderWidth: "0"
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: "0"
                        }
                    },
                    symbolSize: "0",
                    symbol: "circle",
                    smooth: true,
                    stack: '总量',
                    areaStyle: {
                        normal: {}
                    },
                    data: []
                }]
            },
            homepageDataChange: {
                title: {
                    text: '',
                    padding: [3, 1],
                    textStyle: {
                        fontSize: 14
                    }
                },
                /*color: ['#2699FF'],*/
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                color: ['#59cb59', '#08c4b3', '#3996e3', '#9180f3', '#db61da', '#db61da'],
                grid: {
                    left: '0',
                    right: '20px    ',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '操作次数',
                    type: 'line',
                    barWidth: '60%',
                    data: []
                }, {
                    name: 'asda',
                    type: 'line',
                    barWidth: '60%',
                    data: []
                }]
            },
            homepages: [],
            modalAddHome: false,
            modaldelHome: false,
            addHomeData: {
                name: "",
            },
            loading: false, //模板组执行编辑状态
            ruleValidate: {
                name: [
                    {
                        required: true,
                        message: 'The name cannot be empty',
                        trigger: 'blur'
                    }
                ]
            },
            color: ['#59cb59', '#08c4b3', '#3996e3', '#9180f3', '#db61da', '#ef58bb'],
            myhomepage: [],
            viehomepage: [],
            active: "",
            homepage:{
                'activenum':[],
                'concerns':[],
                'totalposts':[],
                'comment':[],
                'praise':[],
                'share':[],
                'visits':[]
            }
        }),
        mounted() {
            this.getDevice();
            this.getFacebookData();
            this.getTasksCount();
            this.getTasksDailyCount();
            //this.getImeiFriend();
            this.getFacebookData();
            this.getAllHomePages();
        },
        methods: {
            getDevice: function () {
                this.devicesListAll = [];
                let localstroage = window.localStorage;
                let devicesListAllLocal = localstroage.getItem('devicesListAll');
                this.devicesListAll = devicesListAllLocal.split(",");
                this.deviceOneVal = this.devicesListAll[0];

                let deviceListAllOnline = localstroage.getItem('deviceListAllOnline').split(",");
                let deviceListAllOffline = localstroage.getItem('deviceListAllOffline').split(",");

                this.deviceListAllOnline = deviceListAllOnline;
                this.deviceListAllOffline = deviceListAllOffline;

            },
            getTasksCount() {
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                this.axios({
                    url: 'besser/fbcc/tasks/getTasksCount',
                    method: 'post',
                    data: {
                        token: token
                    },
                    transformRequest: [function (data) {
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
                            this.taskCount = response.data.data;
                        }

                    }, response => {
                        // error callback
                        this.$Message.error(this.$t("message.tipWrong"));
                    });
            },
            getTasksDailyCount() {
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                let imei = this.deviceOneVal;
                let days = this.dateWeekVal !== 'primary' ? 30 : 7;
                let type = 0;
                switch (this.tabPaneVal) {
                    case 'tab1':
                        type = 33;
                        break;
                    case 'tab2':
                        type = 49;
                        break;
                    case 'tab3':
                        type = 65;
                        break;
                    case 'tab4':
                        type = 81;
                        break;
                    default:
                        type = 33;
                }
                this.axios({
                    url: 'besser/fbcc/tasks/getTasksDailyCount',
                    method: 'post',
                    data: {
                        token: token,
                        imei: imei,
                        type: type,
                        days: days
                    },
                    transformRequest: [function (data) {
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
                            // this.taskCount = response.data.data;
                            let dataBack = response.data.data.taskDailyCounts;
                            this.addFriendBar.xAxis[0].data = [];
                            this.addFriendBar.series[0].data = [];
                            for (var i = 0; i < dataBack.length; i++) {
                                this.addFriendBar.xAxis[0].data.push(dataBack[i].date.slice(5));
                                this.addFriendBar.series[0].data.push(dataBack[i].failNum + dataBack[i].successNum);
                            }

                        }

                    }, response => {
                        // error callback
                        this.$Message.error(this.$t("message.tipWrong"));
                    });
            },
            tapTabPane(val) {
                this.getTasksDailyCount();
            },
            analysisTapPane(val) {
                this.analysisTapPaneVal = val;
            },
            tapDeviceMenu(val) {
                this.deviceOneVal = val;
            },
            tapDateWeek() {
                if (this.dateWeekVal !== 'primary') {
                    this.dateWeekVal = 'primary';
                    this.dateMonthVal = 'ghost';
                    this.analysisTapPaneVal == "tab1"
                        ? this.getTasksDailyCount()
                        : this.homePagePane.apply(this)
                }

            },
            tapDateMonth() {
                if (this.dateMonthVal !== 'primary') {
                    this.dateWeekVal = 'ghost';
                    this.dateMonthVal = 'primary';
                    this.analysisTapPaneVal == "tab1"
                        ? this.getTasksDailyCount()
                        : this.homePagePane.apply(this)
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
                var imeiNew = [];
                for (let i = 0, l = imei.length; i < l; i++) {
                    for (let j = i + 1; j < l; j++)
                        if (imei[i] === imei[j]) j = ++i;
                    imeiNew.push(imei[i]);
                }
                return imeiNew;
            },
            getImeiFriend(value) {
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                let mobile = localstroage.getItem('mobile');
                let imei = value || this.deviceOneVal;
                this.axios({
                    url: 'besser/fbcc/systems/getNumByImei',
                    method: 'post',
                    data: {
                        token: token,
                        imei: imei
                    },
                    transformRequest: [function (data) {
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
                            this.friendOfImeiCount = Number(response.data.data[0].total);
                            this.dayrate = Number(response.data.data[0].dayrate);
                            this.weekrate = Number(response.data.data[0].weekrate);
                            this.dayadd = Number(response.data.data[0].dayadd);
                            function initWeekArray() {
                                let a = response.data.data[0].weekarray.map(function (v) {
                                    return parseInt(v)
                                })
                                if(!a.includes(0)){
                                    return a.reverse();
                                }
                                for(let i =5;i>-1;i--){
                                    a[i] = a[i] == 0 ? a[i+1]:0;
                                }
                                return a.reverse()
                            }
                            this.friendTotalChange.series[0].data = initWeekArray()
                            this.friendTotalChange.xAxis[0].data = this.getlastDaysDate(7);
                        }

                    }, response => {
                        // error callback
                        this.$Message.error(this.$t("message.tipWrong"));
                    });
            },
            getFacebookData() {
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                let mobile = localstroage.getItem('mobile');
                let imei = this.deviceOneVal;
                this.axios({
                    url: 'besser/fbcc/systems/getFriendsTotalList',
                    method: 'post',
                    data: {
                        token: token,
                        mobile: mobile
                    },
                    transformRequest: [function (data) {
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
                            this.allFriendCount = Number(response.data.data[0].total);
                            this.weekrateAll = Number(response.data.data[0].weekrate);
                            this.dayrateAll = Number(response.data.data[0].dayrate);
                            this.dayaddAll = Number(response.data.data[0].dayadd);
                        }

                    }, response => {
                        // error callback
                        this.$Message.error(this.$t("message.tipWrong"));
                    });
            },
            addHomePageBtn() {
                this.modalAddHome = true;
            },
            homePageEidt(type, homepage) {
                if (type === 0) {
                    this.loading = true;
                    this.$refs['addHomePageFormValidate'].validate(valid => {
                        if (valid) {

                            let localstroage = window.localStorage;
                            let token = localstroage.getItem('token');
                            let account = localstroage.getItem("mobile");
                            let homepage = this.addHomeData.name;
                            let data = {
                                token: token,
                                account: account,
                                type: type
                            };
                            if (this.homepageTypeOption == "自己主页") {
                                data.myhomepage = homepage;
                                data.viehomepage = "";
                                data.opetype = 0;
                            } else {
                                data.myhomepage = "";
                                data.viehomepage = homepage;
                                data.opetype = 1;
                            }
                            this.axios({
                                url: 'besser/fbcc/homepages/homepageEdit',
                                method: 'post',
                                data: data,
                                transformRequest: [function (data) {
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
                                        this.addHomeData.name = ""
                                        this.getAllHomePages()
                                        this.modalAddHome = false
                                        this.loading = false;
                                    }

                                }, response => {
                                    this.$Message.error(this.$t("message.tipWrong"));
                                    this.modalAddHome = true
                                    this.loading = false;
                                });
                        } else {
                            this.loading = false;
                        }
                    })
                } else {
                    let localstroage = window.localStorage;
                    let token = localstroage.getItem('token');
                    let account = localstroage.getItem("mobile");
                    let data = {
                        token: token,
                        account: account,
                        type: type,
                        myhomepage: "",
                        viehomepage: "",
                        opetype: ""
                    };
                    if (this.myhomepage.includes(homepage)) {
                        data.myhomepage = homepage;
                        data.viehomepage = "";
                        data.opetype = 0;
                    }
                    ;
                    if (this.viehomepage.includes(homepage)) {
                        data.viehomepage = homepage;
                        data.myhomepage = "";
                        data.opetype = 1;
                    }
                    ;
                    this.axios({
                        url: 'besser/fbcc/homepages/homepageEdit',
                        method: 'post',
                        data: data,
                        transformRequest: [function (data) {
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
                                this.getAllHomePages()
                            }
                        }, response => {
                            this.$Message.error(this.$t("message.tipWrong"));
                        });
                }
            },
            getAllHomePages() {
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                let account = localstroage.getItem("mobile");
                this.axios({
                    url: 'besser/fbcc/homepages/homepageList',
                    method: 'post',
                    data: {
                        token: token,
                        account: account
                    },
                    transformRequest: [function (data) {
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
                            this.myhomepage = response.data.data[0].myhomepage;
                            this.viehomepage = response.data.data[0].viehomepage;
                            this.homepages = response.data.data[0].myhomepage.concat(response.data.data[0].viehomepage);
                        }
                    }, response => {
                        this.$Message.error(this.$t("message.tipWrong"));
                    });
            },
            getAllHomePagesInfo() {
                let self = this;
                let localstroage = window.localStorage;
                let token = localstroage.getItem('token');
                self.homepage.activenum = [];
                self.homepage.concerns = [];
                self.homepage.totalposts = [];
                self.homepage.comment = [];
                self.homepage.praise = [];
                self.homepage.share = [];
                self.homepage.visits = [];
                for (let i = 0; i < this.homepages.length; i++) {
                    let homepage = this.homepages[i];
                    this.axios({
                        url: 'besser/fbcc/homepages/activedailyList',
                        method: 'post',
                        data: {
                            token: token,
                            homepage: homepage
                        },
                        transformRequest: [function (data) {
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
                    }).then(response => {
                        if (response.data.code === 200) {
                            this.homepageDataChange.series[i] = {
                                name: '',
                                type: 'line',
                                barWidth: '60%',
                                data: []
                            };
                            let days = this.dateWeekVal !== 'primary' ? 30 : 7
                            let dayArr = this.getlastDaysDate(days);
                            self.homepageDataChange.xAxis.data = dayArr;
                            let homepageName = response.data.data[0] && response.data.data[0].homepage
                            if (homepageName) {
                                self.homepage.activenum[i] = [];
                                self.homepage.concerns[i] = [];
                                self.homepage.totalposts[i] = [];
                                self.homepage.comment[i] = [];
                                self.homepage.praise[i] = [];
                                self.homepage.share[i] = [];
                                self.homepage.visits[i] = [];
                                self.homepageDataChange.series[i].name = response.data.data[0].homepage
                                response.data.data.forEach(function (item,index) {
                                    self.homepage.concerns[i].push(item.concerns);
                                    self.homepage.activenum[i].push(item.activenum);
                                    self.homepage.totalposts[i].push(item.totalposts);
                                    self.homepage.comment[i].push(item.comment);
                                    self.homepage.praise[i].push(item.praise);
                                    self.homepage.share[i].push(item.share);
                                    self.homepage.visits[i].push(item.visits);
                                    if(i == (self.homepages.length -1 )&& index === response.data.data.length-1){
                                        self.homePagePane()
                                    }
                                });
                            }
                        }
                    }, response => {
                        this.$Message.error(this.$t("message.tipWrong"));
                    });
                };
            },
            delBtnShow(index) {
                this.active = index;
            },
            delBtnHide(index) {
                this.active = "";
            },
            getlastDaysDate(d) {
                let dateArray = [];
                let date = new Date();
                for (let i = 0; i < d; i++) {
                    dateArray.push(date.toLocaleDateString().slice(5));
                    date.setDate(date.getDate() - 1);
                }
                return dateArray.reverse()
            },
            homePagePane() {
                let self = this;
                let days = this.dateWeekVal !== 'primary' ? 30 : 7;
                let dayArr = this.getlastDaysDate(days);
                self.homepageDataChange.xAxis.data = dayArr;
                if(self.homePagePaneVal === "tab1" || !self.homePagePaneVal){
                    self.homepage.concerns.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }
                if(self.homePagePaneVal === "tab2"){
                    self.homepage.activenum.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }
                if(self.homePagePaneVal === "tab3"){
                    self.homepage.totalposts.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }else if(self.homePagePaneVal === "tab4"){
                    self.homepage.comment.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }else if(self.homePagePaneVal === "tab5"){
                    self.homepage.praise.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }else if(self.homePagePaneVal === "tab6"){
                    self.homepage.share.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }else if(self.homePagePaneVal == "tab7"){
                    self.homepage.visits.forEach(function (item,index) {
                        self.homepageDataChange.series[index].data = self.initDataArray(item).slice(-days)
                    });
                }
            },
            initDataArray(arr) {
                arr = arr.map(function(v){return parseInt(v)});
                arr = arr.concat(new Array(30).fill(0)).slice(0,30);
                return arr.reverse();
            }

        },
        watch: {
            homepages(newVal, oldVal) {
                this.getAllHomePagesInfo();
            }
        }
    };

</script>
