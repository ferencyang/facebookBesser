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

</style>

<template>

<div style="overflow:auto;height:580px;">

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
                        <Icon type="record" style="padding-left:0px;padding-right:8px;color:#00D01F"></Icon>正常在线 {{deviceListAllOnline.length}} </p>
                    <p>
                        <Icon type="record" style="padding-left:0px;padding-right:8px;color:#FF0000"></Icon>异常离线 {{deviceListAllOffline.length}} </p>
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
                        <span style="font-weight:300;">周同比</span> <span style="width:20px;">15%</span>
                        <Icon type="arrow-up-b" style="padding-left:8px;color:#FF0000"></Icon>
                    </p>
                    <p>
                        <span style="font-weight:300;">日环比</span> <span style="width:20px;">2%</span>
                        <Icon type="arrow-down-b" style="padding-left:8px;color:#00D01F"></Icon>
                    </p>
                </div>
                <div class="card_footer">
                    <div class="card_fooder_dec">
                        <span>日均增长量 1,122</span>
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

                        <Progress :percent="taskCount.successPercent" :hide-info="true" :stroke-width="10" style="border-radius:20px;"></Progress>

                    </p>

                </div>
                <div class="card_footer">
                    <div class="card_fooder_dec">
                        <Icon type="android-checkbox-blank" style="padding-right:3px;color:#3AB9EE"></Icon><span style="width:180px;font-weight:320;padding-right:8px;">成功   {{taskCount.successNum}}</span>
                        <Icon type="android-checkbox-blank" style="padding-right:3px;color:#F3F3F3"></Icon><span style="width:180px;font-weight:320">失败   {{taskCount.failNum}}</span>
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

                        <Select v-model="deviceOneVal" @on-change="getImeiFriend" clearable filterable placeholder="请选择或者搜索设备">
                            <Option v-for="(item,index) in devicesListAll" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <!-- <Dropdown @on-click="tapDeviceMenu">
                            <Button type="ghost">
                                {{deviceOneVal}}
                                <Icon type="arrow-down-b" style="padding-left:5px;"></Icon>
                            </Button>
                            <DropdownMenu slot="list" v-for="(item, idx) in devicesListAll" :key="idx">
                                <DropdownItem :selected="deviceOneVal === item" :name="item">{{item}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> -->

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
                                    <label style="font-weight:320;width:200px;">周同比 15%</label>
                                    <Icon type="arrow-up-b" style="padding-left:8px;color:#FF0000"></Icon>
                                </p>
                                <p>
                                    <label style="width:180px;font-weight:320">日环比 0% </label>
                                    <Icon type="arrow-down-b" style="padding-left:8px;color:#00D01F"></Icon>
                                </p>
                            </div>
                            <div class="card_footer" style="width:180px;">
                                <div class="card_fooder_dec">
                                    <span>日均增长量 1,122</span>
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col span="16">

                        <div style="width: 100%; height:250px;">
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
// import 'echarts/lib/component/title';
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
        devicesListAll: [],
        deviceListAllOnline: [],
        deviceListAllOffline: [],
        deviceOneVal: '选择账号',
        dateWeekVal: 'primary',
        dateMonthVal: 'ghost',
        allFriendCount: 0,
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
            color: ['#A93EE6'],
            grid: {
                left: '0%',
                right: '0%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                show: false,
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }],
            yAxis: [{
                show: true,
                type: 'value',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#333"
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: "#cccccc"
                    }
                },
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
                data: [120, 132, 101, 134, 90, 230, 210]
            }]
        },

    }),
    mounted() {
        this.getDevice();
        this.getFacebookData();
        this.getTasksCount();
        this.getTasksDailyCount();
        //this.getImeiFriend();
        this.getFacebookData();
    },
    methods: {
        getDevice: function() {
            this.devicesListAll = [];
            let localstroage = window.localStorage;
            let devicesListAllLocal = localstroage.getItem('devicesListAll');
            this.devicesListAll = devicesListAllLocal.split(",");
            this.deviceOneVal = this.devicesListAll[0];
            console.log('设备数组：', this.devicesListAll);

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
                  console.log('任务返回的数据: ', response.data)
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
                  console.log('任务日常返回的数据: ', response.data)
                  if (response.data.code === 200) {
                    // this.taskCount = response.data.data;
                    let dataBack = response.data.data.taskDailyCounts;
                    this.addFriendBar.xAxis[0].data = [];
                    this.addFriendBar.series[0].data = [];
                    for (var i = 0; i < dataBack.length; i++) {
                      this.addFriendBar.xAxis[0].data.push(dataBack[i].date);
                      this.addFriendBar.series[0].data.push(dataBack[i].failNum + dataBack[i].successNum);
                    }

                  }

              }, response => {
                  // error callback
                  this.$Message.error(this.$t("message.tipWrong"));
              });
        },
        tapTabPane(val) {
          console.log('点击选择项：', val)
          this.tabPaneVal = val;
          this.getTasksDailyCount();
        },
        tapDeviceMenu(val) {
            // console.log('右上角菜单:',val)
            this.deviceOneVal = val;
        },
        tapDateWeek() {

            if (this.dateWeekVal !== 'primary') {
                this.dateWeekVal = 'primary';
                this.dateMonthVal = 'ghost';
                this.getTasksDailyCount();
            }

        },
        tapDateMonth() {

            if (this.dateMonthVal !== 'primary') {
                this.dateWeekVal = 'ghost';
                this.dateMonthVal = 'primary';
                this.getTasksDailyCount();
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
        getImeiFriend(value){
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
                        this.friendOfImeiCount = response.data.data;
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
                        this.allFriendCount = response.data.data;
                    }

                }, response => {
                    // error callback
                    this.$Message.error(this.$t("message.tipWrong"));
                });
        }
    }
};

</script>
