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

<Tabs value="searchKeyWordAdd">
    <TabPane :label="$t('message.friendTitleOne')" name="searchKeyWordAdd">
        <!-- searchKeyWordAdd -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:50px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <h2>{{ $t("message.addFriendKey") }}</h2>
                                <p>{{ $t("message.friendTitleOneDec") }}</p>
                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.friendTitleOneTip") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form :label-width="80">
                                <FormItem :label="$t('message.addFriendTipOneKey')">
                                    <Input v-model.trim="keyWord" :maxlength="30" :placeholder="$t('message.addFriendTipOnePlaceholder')"></Input>
                                </FormItem>
                                <FormItem>

                                    <Button type="primary" @click="tapAddFriendBtn(49, 0, 0)" long v-if="showBtn49">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(49)" v-if="showBtn49" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- searchKeyWordAdd -->
    </TabPane>
    <TabPane :label="$t('message.friendTitleThree')" name="recommendAdd">
        <!-- recommendAdd -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:50px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <h2>{{ $t("message.addFriendRecom") }}</h2>
                                <p>{{ $t("message.friendTitleThreeDec") }}</p>
                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.friendTitleThreeTip") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form :label-width="80">
                                <FormItem>
                                    <Button type="primary" @click="tapAddFriendBtn(51, 0, 0)" long v-if="showBtn51">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(51)" v-if="showBtn51" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- recommendAdd end -->
    </TabPane>
    <TabPane :label="$t('message.friendTitleFour')" name="addOtherFriends">
        <!-- addOtherFriends -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:50px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <h2>{{ $t("message.addFriendTwo") }}</h2>
                                <p>{{ $t("message.friendTitleFourDec") }}</p>
                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.friendTitleFourTip") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form :label-width="80">
                                <FormItem>
                                    <Button type="primary" @click="tapAddFriendBtn(52, 0, 0)" long v-if="showBtn52">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(52)" v-if="showBtn52" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- addOtherFriends end -->
    </TabPane>
    <TabPane :label="$t('message.friendTitleFive')" name="passApply">
        <!-- passApply -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:50px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <h2>{{ $t("message.addFriendOK") }}</h2>
                                <p>{{ $t("message.friendTitleFiveDec") }}</p>
                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.friendTitleFiveTip") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form :label-width="80">
                                <FormItem>
                                    <Button type="primary" @click="tapAddFriendBtn(53, 0, 0)" long v-if="showBtn53">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(53)" v-if="showBtn53" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- passApply end -->
    </TabPane>
    <TabPane :label="$t('message.friendTitleSix')" name="importFriends">
        <!-- importFriends -->
        <!-- 有更改，先只改客户端，后期加接口 -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:50px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <h2>{{ $t("message.addFriendImport") }}</h2>
                                <p>{{ $t("message.friendTitleSixDec") }}</p>
                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.friendTitleSixTip") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form :label-width="80">
                                <FormItem>
                                    <!-- <Upload :format="['csv']" :data="extraData" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-success="handleSuccess" :action="actionUrl">
                                        <Button type="ghost" icon="ios-cloud-upload-outline">csv文件</Button>
                                    </Upload> -->
                                    <!-- 邀请好友加小组 -->
                                    <!-- <RadioGroup v-model="chooseTypeVal" style="padding-left:5px;">
                                        <Radio label="点赞"></Radio>
                                        <Radio label="加小组"></Radio>
                                    </RadioGroup> -->
                                </FormItem>
                                <FormItem>
                                    <!-- <Button type="primary" @click="tapAddFriendBtn(54, 0, 0)" long v-if="showBtn54">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(54)" v-if="showBtn54" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button> -->
                                    <Button type="primary" @click="tapAddFriendBtn(116, 0, 0)" long v-if="showBtn54">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(116)" v-if="showBtn54" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- importFriends end -->
    </TabPane>
    <TabPane :label="$t('message.friendTitleTwo')" name="saearchAdd">
        <!-- saearchAdd -->
        <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:50px;">
            <Col span="24">
                <Card>
                    <Row>
                        <Col span="12">
                            <div class="example-case">
                                <h2>{{ $t("message.addFriendSearch") }}</h2>
                                <p>{{ $t("message.friendTitleTwoDec") }}</p>
                            </div>
                            <div class="example-header">
                                <span>{{ $t("message.addFriendTip") }}</span>
                            </div>
                            <div class="example-desc">
                                <div>
                                    <p>
                                        {{ $t("message.friendTitleTwoTip") }}
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <div class="example-split"></div>
                        <Col span="12" style="padding:20px;">
                            <Form :label-width="80">
                                <FormItem :label="$t('message.search')">
                                    <Input v-model.trim="searchWord" :placeholder="$t('message.addFriendTipTwoPlaceholder')"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="tapAddFriendBtn(112, 0, 0)" long v-if="showBtn50">{{ $t("message.addFriendBtn") }}</Button>
                                    <Button type="ghost" long v-on:click="tapModelSchedule(112)" v-if="showBtn50" style="margin-top:10px;">
                                        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.addFriendBtnClock") }}
                                    </Button>
                                    <Button type="primary" :loading="true" v-else>
                                        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- saearchAdd end -->
    </TabPane>
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
</Tabs>

</template>

<script>

export default {
    data() {
            return {
                keyWord: '',
                fileName: '',
                searchWord: '',
                extraData: {},
                actionUrl: this.GLOBAL.httpSrc + 'besser/fbcc/upload',
                timecount: this.GLOBAL.limitSec,
                showBtn49: true,
                showBtn50: true,
                showBtn51: true,
                showBtn52: true,
                showBtn53: true,
                showBtn54: true,
                modalSchedule: false,
                checkValNum: 0,
                chooseTypeVal: '点赞',
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
        methods: {
            tapAddFriendBtn(val, dateValNow, dateValChaTwo) {

                    switch (val) {
                        case 49:
                            this.addFriendKeyWord(49, dateValNow, dateValChaTwo);
                            break;
                        case 112:
                            this.addFriendSearch(112, dateValNow, dateValChaTwo);
                            break;
                        case 51:
                            this.addFriendOther(51, dateValNow, dateValChaTwo);
                            break;
                        case 52:
                            this.addFriendOther(52, dateValNow, dateValChaTwo);
                            break;
                        case 53:
                            this.addFriendOther(53, dateValNow, dateValChaTwo);
                            break;
                        case 116:
                            this.addFriendOther(116, dateValNow, dateValChaTwo);
                            break;
                        default:
                            this.$Message.warning(this.$t("message.tipWrong"));
                    }

                }, //tapAddKeyWord

                tapModelSchedule(val) {

                    let d = new Date();
                    let year = d.getFullYear();
                    let day = d.getDate();
                    let month = d.getMonth() + 1;
                    let hour = d.getHours();
                    let min = d.getMinutes();
                    let nowTime = year + "/" + month + "/" + day + ' ' + hour + ':' + min;

                    this.formSchedule.items[0].dateVal = nowTime;
                    this.modalSchedule = true;
                    this.checkValNum = val;

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
                                        this.tapAddFriendBtn(this.checkValNum, dateValNow, dateValChaTwo);
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

                addFriendKeyWord(val, dateValNow, timeVal) {

                    let taskNow = window.sessionStorage.getItem('taskNow');
                    let network = window.sessionStorage.getItem('network');

                    if (network !== '200') {

                        this.$Message.error(this.$t("message.tipNetWrong"));

                    } else if (taskNow !== '' && taskNow !== null) {

                        this.$Notice.warning({
                            title: taskNow + this.$t("message.tipWarnTaskNowNot"),
                        });

                    } else {

                        let keyWordGet = this.keyWord;

                        if (keyWordGet === '') {

                            this.$Message.warning(this.$t("message.addFriendTipOnePlaceholder"));

                        } else {

                            let localstroage = window.localStorage;
                            let imei = this.checkImeiOnline();
                            let token = localstroage.getItem('token');

                            if (imei.length > 0) {

                                // let taskId = (new Date()).valueOf().toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString();
                                // let body = {
                                //   imei: imei,
                                //   batchId: taskId,
                                //   token: token,
                                //   type: 49,
                                //   data: keyWordGet
                                // };
                                // let bodyStr = JSON.stringify(body);
                                // this.$socket.emit('messageholder', {
                                //   sign: 1,
                                //   type: 33,
                                //   body: bodyStr
                                // });


                                let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();

                                let tasks = [{
                                    type: 49,
                                    batchId: batchId,
                                    data: keyWordGet
                                }];

                                let mainId = 0;
                                if (Number(dateValNow) > 0) {
                                    // console.log('mainId的判断')
                                    mainId = dateValNow.toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                    // console.log('mainId的判断2', mainId)
                                } else {
                                    mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                }

                                let body = {
                                    imei: imei,
                                    token: token,
                                    mainId: mainId,
                                    delaySecond: timeVal,
                                    tasks: tasks
                                };
                                let bodyStr = JSON.stringify(body);
                                this.$socket.emit('messageholder', {
                                    sign: 1,
                                    type: 33,
                                    body: bodyStr
                                });

                                this.changeBtnStatus(49);
                                window.sessionStorage.setItem('taskNow', this.$t("message.addFriendKey"));

                                this.keepTask(mainId, batchId, 49, this.$t("message.addFriendKey"), imei);
                                this.keyWord = '';
                                this.$Message.success(this.$t("message.tipSuccessTaskOk"));

                            } else {
                                this.$Message.warning(this.$t("message.tipWarnChooseAccount"));
                            }

                        }

                    } //if tasknow
                }, //addFriendKeyWord

                addFriendSearch(val, dateValNow, timeVal) {

                    let taskNow = window.sessionStorage.getItem('taskNow');
                    let network = window.sessionStorage.getItem('network');

                    if (network !== '200') {

                        this.$Message.error(this.$t("message.tipNetWrong"));

                    } else if (taskNow !== '' && taskNow !== null) {

                        this.$Notice.warning({
                            title: taskNow + this.$t("message.tipWarnTaskNowNot"),
                        });

                    } else {

                        let searchWordGet = this.searchWord;

                        if (searchWordGet === '') {

                            this.$Message.warning(this.$t("message.addFriendTipTwoPlaceholder"));

                        } else {

                            let localstroage = window.localStorage;
                            let imei = this.checkImeiOnline();
                            let token = localstroage.getItem('token');
                            if (imei.length > 0) {

                                // let taskId = (new Date()).valueOf().toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString();
                                // let body = {
                                //   imei: imei,
                                //   batchId: taskId,
                                //   token: token,
                                //   type: 50,
                                //   data: searchWordGet
                                // };
                                // let bodyStr = JSON.stringify(body);
                                // this.$socket.emit('messageholder', {
                                //   sign: 1,
                                //   type: 33,
                                //   body: bodyStr
                                // });

                                let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();

                                let tasks = [{
                                    type: val,
                                    batchId: batchId,
                                    data: searchWordGet
                                }];

                                let mainId = 0;
                                if (Number(dateValNow) > 0) {
                                    // console.log('mainId的判断')
                                    mainId = dateValNow.toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                    // console.log('mainId的判断2', mainId)
                                } else {
                                    // console.log('mainId的判断3')
                                    mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                }

                                let body = {
                                    imei: imei,
                                    token: token,
                                    mainId: mainId,
                                    delaySecond: timeVal,
                                    tasks: tasks
                                };
                                let bodyStr = JSON.stringify(body);
                                this.$socket.emit('messageholder', {
                                    sign: 1,
                                    type: 33,
                                    body: bodyStr
                                });


                                this.changeBtnStatus(50);
                                window.sessionStorage.setItem('taskNow', this.$t("message.addFriendSearch"));

                                this.keepTask(mainId, batchId, 50, this.$t("message.addFriendSearch"), imei);
                                this.searchWord = '';
                                this.$Message.success(this.$t("message.tipSuccessTaskOk"));

                            } else {
                                this.$Message.warning(this.$t("message.tipWarnChooseAccount"));
                            }

                        }

                    } //if tasknow

                }, //addFriendSearch

                addFriendOther(val, dateValNow, timeVal) {

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
                            //
                            // let taskId = (new Date()).valueOf().toString()+Math.floor(Math.random()*10).toString()+Math.floor(Math.random()*10).toString();
                            //
                            // let body = {
                            //   imei: imei,
                            //   batchId: taskId,
                            //   token: token,
                            //   type: val
                            // };
                            // let bodyStr = JSON.stringify(body);
                            // this.$socket.emit('messageholder', {
                            //   sign: 1,
                            //   type: 33,
                            //   body: bodyStr
                            // });

                            let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();

                            let tasks = [{
                                type: val,
                                batchId: batchId,
                                data: {}
                            }];

                            let mainId = 0;
                            if (Number(dateValNow) > 0) {
                                // console.log('mainId的判断')
                                mainId = dateValNow.toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                // console.log('mainId的判断2', mainId)
                            } else {
                                // console.log('mainId的判断3')
                                mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                            }

                            let body = {
                                imei: imei,
                                token: token,
                                mainId: mainId,
                                delaySecond: timeVal,
                                tasks: tasks
                            };
                            let bodyStr = JSON.stringify(body);
                            this.$socket.emit('messageholder', {
                                sign: 1,
                                type: 33,
                                body: bodyStr
                            });

                            let taskName = val === 51 ? this.$t("message.addFriendRecom") : (val === 52 ? this.$t("message.addFriendTwo") : (val === 53 ? this.$t("message.addFriendOK") : '邀请好友'));

                            this.changeBtnStatus(val);
                            window.sessionStorage.setItem('taskNow', taskName);

                            this.keepTask(mainId, batchId, val, taskName, imei);
                            this.$Message.success(this.$t("message.tipSuccessTaskOk"));

                        } else {
                            this.$Message.warning(this.$t("message.tipWarnChooseAccount"));
                        }

                    } //if tasknow

                }, //addFriendRecommend

                addFriendCsv(val, dateValNow, timeVal) {

                    let taskNow = window.sessionStorage.getItem('taskNow');
                    let network = window.sessionStorage.getItem('network');

                    if (network !== '200') {

                        this.$Message.error(this.$t("message.tipNetWrong"));

                    } else if (taskNow !== '' && taskNow !== null) {

                        this.$Notice.warning({
                            title: taskNow + this.$t("message.tipWarnTaskNowNot"),
                        });

                    } else {

                        let fileNameGet = this.fileName;
                        if (fileNameGet !== '') {

                            let localstroage = window.localStorage;
                            let imei = this.checkImeiOnline();
                            let token = localstroage.getItem('token');
                            if (imei.length > 0) {

                                let batchId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();

                                let tasks = [{
                                    type: 54,
                                    batchId: batchId,
                                    data: fileNameGet
                                }];

                                let mainId = 0;
                                if (Number(dateValNow) > 0) {
                                    // console.log('mainId的判断')
                                    mainId = dateValNow.toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                    // console.log('mainId的判断2', mainId)
                                } else {
                                    // console.log('mainId的判断3')
                                    mainId = (new Date()).valueOf().toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
                                }

                                let body = {
                                    imei: imei,
                                    token: token,
                                    mainId: mainId,
                                    delaySecond: timeVal,
                                    tasks: tasks
                                };
                                let bodyStr = JSON.stringify(body);
                                this.$socket.emit('messageholder', {
                                    sign: 1,
                                    type: 33,
                                    body: bodyStr
                                });

                                this.changeBtnStatus(54);
                                window.sessionStorage.setItem('taskNow', this.$t("message.addFriendImport"));

                                this.keepTask(mainId, batchId, 54, this.$t("message.addFriendImport"), imei);
                                this.fileName = '';
                                this.$Message.success(this.$t("message.tipSuccessTaskOk"));

                            } else {
                                this.$Message.warning(this.$t("message.tipWarnChooseAccount"));
                            }

                        } else {
                            this.$Message.warning(this.$t("message.tipWarnAddfriendImport"));
                        }

                    } //if tasknow
                }, //addFriendCsv

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

                changeBtnStatus(val) {

                    switch (val) {
                        case 49:
                            this.showBtn49 = false;
                            break;
                        case 50:
                            this.showBtn50 = false;
                            break;
                        case 51:
                            this.showBtn51 = false;
                            break;
                        case 52:
                            this.showBtn52 = false;
                            break;
                        case 53:
                            this.showBtn53 = false;
                            break;
                        case 54:
                            this.showBtn54 = false;
                            break;
                    }

                    let timecountGet = this.timecount;
                    if (timecountGet === 0) {

                        switch (val) {
                            case 49:
                                this.showBtn49 = true;
                                break;
                            case 50:
                                this.showBtn50 = true;
                                break;
                            case 51:
                                this.showBtn51 = true;
                                break;
                            case 52:
                                this.showBtn52 = true;
                                break;
                            case 53:
                                this.showBtn53 = true;
                                break;
                            case 54:
                                this.showBtn54 = true;
                                break;
                        }
                        this.timecount = this.GLOBAL.limitSec;
                        window.sessionStorage.setItem('taskNow', '');

                    } else {

                        timecountGet = timecountGet - 1;
                        this.timecount = timecountGet;
                        setTimeout(() => {
                            this.changeBtnStatus(val);
                        }, 1000);
                    }

                },

                getToken() {
                    console.log('getToken操作')
                    let localstroage = window.localStorage;
                    let token = localstroage.getItem('token');
                    this.extraData = {
                        token: token
                    };
                },

                handleSuccess(res, file) {
                    console.log('handleSuccess操作', file)
                    this.fileName = file.response.data.fileName;
                },

                handleFormatError(file) {
                    console.log('handleFormatError操作', file)
                    this.$Notice.warning({
                        title: this.$t("message.tipWarnFileWrong"),
                        desc: file.name + ', ' + this.$t("message.tipWarnFileWrongCsv")
                    });
                },
                handleMaxSize(file) {
                    this.$Notice.warning({
                        title: this.$t("message.tipWarnFileMaxWrong"),
                        desc: file.name + ', ' + this.$t("message.tipWarnFileMaxWrongText")
                    });
                },


        },
        mounted() {
            this.getToken();
        }
}

</script>
