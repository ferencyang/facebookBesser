<style>
  #replyCom input{
    width:160px
  }
  #replyCom .ivu-select-selection input{
    width:150px
  }
  #replyCom  .ivu-input-wrapper {
    width:160px !important;
  }
  .ivu-select-dropdown-list>li {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<template>

  <Card id="replyCom">
    <p slot="title" style="height:35px;">
      <!-- {{ $t("message.replayTitle") }} -->
      <ButtonGroup>
        <Button :type="chooseCategory === 'reply' ? 'primary' : 'ghost'" @click="tapBtn('reply')">回复</Button>
        <Button :type="chooseCategory === 'like' ? 'primary' : 'ghost'" @click="tapBtn('like')">点赞</Button>
        <Button :type="chooseCategory === 'forward' ? 'primary' : 'ghost'" @click="tapBtn('forward')">转发</Button>
        <Button :type="chooseCategory === 'follow' ? 'primary' : 'ghost'" @click="tapBtn('follow')">关注</Button>
      </ButtonGroup>
    </p>
    <a href="#" slot="extra" v-if="chooseCategory === 'reply'">
      <Button type="ghost" v-on:click="tapModelSchedule" v-if="showBtn">
        <Icon type="clock" style="padding-right:5px;"></Icon>{{ $t("message.replayBtnClock") }}
      </Button>
      <Button type="primary" v-on:click="tapReplayCom(0, 0)" v-if="showBtn">
        <Icon type="paper-airplane" style="padding-right:5px;"></Icon>{{ $t("message.replayBtnNow") }}
      </Button>

      <!-- <Button type="primary" size="small" @click="tapReplayCom" v-if="showBtn">{{ $t("message.replayBtn") }}</Button> -->
      <Button type="primary" :loading="true" v-else>
        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
      </Button>
    </a>
    <a href="#" slot="extra" v-if="chooseCategory === 'like'">
      <Button type="ghost" size="small" v-on:click="tapModelSchedule" v-if="showBtn">
        <Icon type="clock" style="padding-right:5px;"></Icon>定时点赞
      </Button>
      <Button type="primary" size="small" v-on:click="tapLike(0, 0)" v-if="showBtn">
        <Icon type="paper-airplane" style="padding-right:5px;"></Icon>立即点赞
      </Button>

      <!-- <Button type="primary" size="small" @click="tapReplayCom" v-if="showBtn">{{ $t("message.replayBtn") }}</Button> -->
      <Button type="primary" size="small" :loading="true" v-else>
        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
      </Button>
    </a>
    <a href="#" slot="extra" v-if="chooseCategory === 'forward'">
      <Button type="ghost" size="small" v-on:click="tapModelSchedule" v-if="showBtn">
        <Icon type="clock" style="padding-right:5px;"></Icon>定时转发
      </Button>
      <Button type="primary" size="small" v-on:click="tapForward(0, 0)" v-if="showBtn">
        <Icon type="paper-airplane" style="padding-right:5px;"></Icon>立即转发
      </Button>

      <!-- <Button type="primary" size="small" @click="tapReplayCom" v-if="showBtn">{{ $t("message.replayBtn") }}</Button> -->
      <Button type="primary" size="small" :loading="true" v-else>
        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
      </Button>
    </a>
    <a href="#" slot="extra" v-if="chooseCategory === 'follow'">
      <Button type="ghost" size="small" v-on:click="tapModelSchedule" v-if="showBtn">
        <Icon type="clock" style="padding-right:5px;"></Icon>定时关注
      </Button>
      <Button type="primary" size="small" v-on:click="tapFollow(0, 0)" v-if="showBtn">
        <Icon type="paper-airplane" style="padding-right:5px;"></Icon>立即关注
      </Button>

      <!-- <Button type="primary" size="small" @click="tapReplayCom" v-if="showBtn">{{ $t("message.replayBtn") }}</Button> -->
      <Button type="primary" size="small" :loading="true" v-else>
        {{ $t("message.taskHoldTextOne") }}，{{timecount}}{{ $t("message.taskholdTextTwo") }}
      </Button>
    </a>
    <div v-if="chooseCategory === 'reply'">
      <RadioGroup v-model="replyModelVal" style="padding-bottom:15px;">
        <Radio label="postTimeLine">
          <span>时间线</span>
        </Radio>
        <Radio label="postGroup">
          <span>小组</span>
        </Radio>
        <Radio label="postPage">
          <span>主页
            <Input v-model="replyPageInput" placeholder="输入主页名称..." style="padding-left:8px;width: 200px;" v-if="replyModelVal === 'postPage'"></Input>
            <Input v-model="replyPageNumber" placeholder="输入主页帖子数" style="padding-left:8px;width: 200px;" v-if="replyModelVal === 'postPage'"></Input>
          </span>
        </Radio>
      </RadioGroup>
      <div style="float: right">
        <Select  filterable  :placeholder="'请选择模板类别'" @on-change="getReplayComList">
          <Option v-for="item in selectreplayGroupList" :value="item.id" :key="item.id"  >
            <span >{{ item.name }}</span>
          </Option>
        </Select>
      </div>
      <!-- table -->
      <Table  height="400"  @on-selection-change="tapChoose" :columns="columns3" :data="replayComList"></Table>
      <!-- table end -->
      <p style="padding-top:8px;">
        <label style="color:#888888;font-size:12px;">
          <Icon type="information-circled" style="padding-right:3px;"></Icon>{{ $t("message.replayTipDec") }}
        </label>
        <label style="float:right">
          <a @click="tapAddReplayComDel" style="margin-left:10px;">
            <Icon type="trash-a" style="padding-right:5px;"></Icon>删除
          </a>
          <a @click="modalReplayGroupList = true" style="margin-left:10px;">
            <Icon type="navicon" style="padding-right:5px;"></Icon>分类管理
          </a>
          <a @click="tapAddReplayCom" style="margin-left:10px;">
            <Icon type="android-add" style="padding-right:5px;"></Icon>{{ $t("message.replayAddText") }}
          </a>
        </label>
      </p>
    </div>
    <div v-if="chooseCategory === 'like'">
      <RadioGroup v-model="likeModelVal">
        <Radio label="postTimeLine">
          <span>时间线</span>
        </Radio>
        <Radio label="postGroup">
          <span>小组</span>
        </Radio>
        <Radio label="postPage">
          <span>主页
            <Input v-model="likePageInput" placeholder="输入主页名称..." style="padding-left:8px;width: 200px;" v-if="likeModelVal === 'postPage'"></Input>
            <Input v-model="likePageNumber" placeholder="输入主页帖子数" style="padding-left:8px;width: 200px;" v-if="likeModelVal === 'postPage'"></Input>
          </span>
        </Radio>
      </RadioGroup>
    </div>
    <div v-if="chooseCategory === 'forward'">
      <RadioGroup v-model="forwardModelVal">
        <Radio label="postTimeLine">
          <span>时间线</span>
        </Radio>
        <Radio label="postGroup">
          <span>小组</span>
        </Radio>
        <Radio label="postPage">
          <span>主页
            <Input v-model="forwardPageInput" placeholder="输入主页名称..." style="padding-left:8px;width: 200px;" v-if="forwardModelVal === 'postPage'"></Input>
            <Input v-model="forwardPageNumber" placeholder="输入主页帖子数" style="padding-left:8px;width: 200px;" v-if="forwardModelVal === 'postPage'"></Input>
          </span>
        </Radio>
      </RadioGroup>
    </div>
    <div v-if="chooseCategory === 'follow'">
        <span>主页
            <Input v-model="followPageInput" placeholder="输入主页名称..." style="padding-left:8px;width: 200px;" v-if="followModelVal === 'postPage'"></Input>
        </span>
    </div>

    <!-- 模板添加和编辑 -->
    <Modal v-model="modalReplayCom" :title="modalReplayComEditing ? $t('message.replayEditTitle') : $t('message.replayAddTitle')">
      <Form ref="replayComFormValidate" :model="replayComData" :rules="ruleValidate" label-position="right" :label-width="50">
        <FormItem :label="$t('message.replayAddComContent')" prop="content">
          <Input v-model="replayComData.content" type="textarea" :placeholder="$t('message.replayAddPlaceholderContent')"></Input>
        </FormItem>
        <FormItem :label="$t('message.replayAddComGroupID')" prop="groupID">
          <Select v-model="replayComData.groupID" :placeholder="$t('message.replayAddPlaceholderGroupID')">
            <Option v-for="item in replayGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleFormReset('replayComFormValidate')">{{$t('message.reset')}}</Button>
        <Button type="primary" :loading="modalReplayComLoading" @click="handleAddReplayComSubmit('replayComFormValidate')">{{$t('message.confirm')}}</Button>
      </div>
    </Modal>

    <!-- 模板组列表管理 -->
    <Modal v-model="modalReplayGroupList"  :title="$t('message.replayGroupListTitle')">
       <div style="text-align: left;n:right;margin-bottom:2px;float: left">
        <Button type="error" icon="trash-a" size="small" @click="tapAddReplayGroupDel()">删除</Button>
      </div>
       <div style="text-align:right;margin-bottom:2px">
        <Button type="ghost" icon="plus" size="small" @click="modalReplayGroup = true">添加分类</Button>
      </div>
      <div>
        <Table highlight-row height="300" ref="replayGroupTable" @on-selection-change="tapGroupChoose" :columns="replayGroupColumn" :data="replayGroupList"></Table>
      </div>
    </Modal>

    <!-- 模板组添加和编辑 -->
    <Modal v-model="modalReplayGroup" :title="modalReplayGroupEditing ? $t('message.replayGroupEditTitle') : $t('message.replayGroupAddTitle')">
      <Form ref="replayGroupFormValidate" :model="replayGroupData" :rules="ruleValidate" label-position="right" :label-width="50">
        <FormItem :label="$t('message.replayAddComTitle')" prop="name">
          <Input v-model="replayGroupData.name" :placeholder="$t('message.replayAddPlaceholderTitle')"></Input>
        </FormItem>
        <FormItem :label="$t('message.replayAddComDesc')" prop="desc">
          <Input v-model="replayGroupData.desc" type="textarea" :placeholder="$t('message.replayAddPlaceholderDesc')"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleFormReset('replayGroupFormValidate')">{{$t('message.reset')}}</Button>
        <Button type="primary" :loading="modalReplayGroupLoading" @click="handleReplayGroupSubmit('replayGroupFormValidate')">{{$t('message.confirm')}}</Button>
      </div>
    </Modal>

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
  </Card>

</template>

<script>
export default {
  data() {
    return {
      replyModelVal: 'postTimeLine',
      replyPageInput: '',
      replyPageNumber: '',
      likeModelVal: 'postTimeLine',
      likePageInput: '',
      likePageNumber: '',
      forwardModelVal: 'postTimeLine',
      forwardPageInput: '',
      forwardPageNumber: '',
      followModelVal: 'postPage',
      followPageInput: '',
      followPageNumber: '',
      chooseCategory: 'reply',

      modalReplayCom: false, //模板模态框显示状态
      modalReplayComEditing: false, //模板执行编辑状态
      modalReplayComEditingID: '', //正在编辑的模板ID
      modalReplayComLoading: false, //模板提交后的loading状态

      modalReplayGroupList: false, //模板组列表模态框状态
      modalReplayGroup: false, //模板组编辑模态框显示状态
      modalReplayGroupEditing: false, //模板组执行编辑状态
      modalReplayGroupEditingID: '', //正在编辑的模板组ID
      modalReplayGroupLoading: false, //模板组提交后的loading状态

      replayCom: [],
      replayGroupCom: [],
      columns3: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('message.replayTableTitle'),
          key: 'groupname'
        },
        {
          title: this.$t('message.replayTableContent'),
          key: 'content'
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
                      this.tapAddReplayComDel(params)
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
                      this.tapReplayComEdit(params)
                    }
                  }
                },
                this.$t('message.edit')
              )
            ])
          }
        }
      ],
      //模板组表格列设置
      replayGroupColumn: [
        {
          type: 'selection',
          width: 60,
          align: 'index'
        },
        {
          title: '分类',
          key: 'name'
        },
        {
          title: '描述',
          key: 'desc'
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
                      this.tapAddReplayGroupDel(params)
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
                      this.tapReplayGroupEdit(params)
                    }
                  }
                },
                this.$t('message.edit')
              )
            ])
          }
        }
      ],
      replayComList: [], //模板列表数据 --table使用
      replayGroupList: [],
      selectreplayGroupList: [],
      addReplayComOne: '',

      // 模板部分
      replayComData: {
        content: '',
        groupID: []
      },
      // 模板组部分
      replayGroupData: {
        name: '',
        desc: ''
      },
      ruleValidate: {
        content: [
          {
            required: true,
            message: 'The content cannot be empty',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: 'The title cannot be empty',
            trigger: 'blur'
          }
        ],
        groupID: [
        ],
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ]
      },
      showBtn: true,
      timecount: this.GLOBAL.limitSec,
      modalSchedule: false,
      dateOption: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      formSchedule: {
        items: [
          {
            dateVal: '2017-12-12 08:00',
            // datetwoVal: '08:00',
            index: 1,
            status: 1
          }
        ]
      }
    }
  },
  computed: {
    typeNumber() {
      if (this.chooseCategory === 'reply') {
        //回复
        if (this.replyModelVal === 'postTimeLine') {
          // 时间线回复
          return 65
        } else if (this.replyModelVal === 'postGroup') {
          // 小组回复
          return 115
        } else if (this.replyModelVal === 'postPage') {
          // 主页回复
          return 99
        }
      } else if (this.chooseCategory === 'like') {
        // 点赞
        if (this.likeModelVal === 'postTimeLine') {
          // 时间线点赞
          return 84
        } else if (this.likeModelVal === 'postGroup') {
          // 小组点赞
          return 113
        } else if (this.likeModelVal === 'postPage') {
          // 主页点赞
          return 97
        }
      } else if (this.chooseCategory === 'forward') {
        // 转发(分享)
        if (this.forwardModelVal === 'postTimeLine') {
          // 时间线转发
          return 87
        } else if (this.forwardModelVal === 'postGroup') {
          // 小组转发
          return 114
        } else if (this.forwardModelVal === 'postPage') {
          // 主页转发
          return 98
        }
      }else if (this.chooseCategory === 'follow') {
        // 转发(分享)
        if (this.followModelVal === 'postPage') {
          // 时间线转发
          return 117
        }
      } else {
      }
    }
  },
  mounted() {
    this.getReplayComList()
    this.getReplayGroupList()
  },
  methods: {
    //模板数据获取
    getReplayComList(val) {
      let token = window.localStorage.getItem('token');
      let groupid = val !== "all" ? (val || ""):"" ;
      let mobile = window.localStorage.getItem('mobile');
      let data = {
          token:token,
          mobile:mobile,
          groupid:groupid
      };
      this.axios({
        url: 'besser/fbcc/models/modelList',
        method: 'post',
        data: data,
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
            this.replayComList = res.data.data
          } else {
            console.warning('获取模块列表数据失败', res)
          }
        })
        .catch(err => {
          console.error('获取模块列表数据错误', err)
        })
    },
    //模板组数据获取
    getReplayGroupList() {
      let token = window.localStorage.getItem('token')
      let mobile = window.localStorage.getItem('mobile');
      this.axios({
        url: 'besser/fbcc/models/modelgroupList',
        method: 'post',
        data: {
          token: token,
          mobile:mobile
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
            this.replayGroupList = res.data.data;
            this.selectreplayGroupList = JSON.parse(JSON.stringify(res.data.data));
            this.selectreplayGroupList.unshift({
                id:"all",
                name:"所有分类"
            });
          } else {
            console.warning('获取模版组列表失败', res)
          }
        })
        .catch(err => {
          console.error('获取模版组列表错误', err)
        })
    },
    tapAddReplayCom() {
      this.modalReplayCom = true
    },
    tapBtn(typename) {
      this.chooseCategory = typename
    }, //tapBtn
    tapModelSchedule() {
      let d = new Date()
      let year = d.getFullYear()
      let day = d.getDate()
      let month = d.getMonth() + 1
      let hour = d.getHours()
      let min = d.getMinutes()
      let nowTime = year + '/' + month + '/' + day + ' ' + hour + ':' + min

      this.formSchedule.items[0].dateVal = nowTime
      this.modalSchedule = true
    },
    handleScheduleAdd() {
      let d = new Date()
      let year = d.getFullYear()
      let day = d.getDate()
      let month = d.getMonth() + 1
      let hour = d.getHours()
      let min = d.getMinutes()
      let nowTime = year + '/' + month + '/' + day + ' ' + hour + ':' + min

      this.index++
      this.formSchedule.items.push({
        dateVal: nowTime,
        index: this.index,
        status: 1
      })
    },
    tapScheduleCancel() {
      let nameVal = 'formSchedule'
      this.$refs[nameVal].resetFields()
    },
    handleScheduleDel(index) {
      this.formSchedule.items[index].status = 0
    },
    tapScheduleOk() {
      let nameVal = 'formSchedule'

      this.$refs[nameVal].validate(valid => {
        if (valid) {
          console.log('选择的日期：', this.formSchedule.items)

          let dateItems = this.formSchedule.items
          for (var i = 0; i < dateItems.length; i++) {
            dateItems[i]
            if (dateItems[i].status === 1) {
              let dateValOrg = dateItems[i].dateVal

              let myDateNow = new Date()
              let myDateOrg = new Date(dateValOrg)

              let dateValNow = myDateNow.getTime()
              let dateValSce = myDateOrg.getTime()

              let dateValCha = dateValSce - dateValNow
              // console.log('选择的日期cha：', dateValCha)
              if (dateValCha > 0) {
                let dateValChaTwo = parseInt(dateValCha / 1000)
                if (this.chooseCategory === 'reply') {
                  this.tapReplayCom(dateValNow, dateValChaTwo)
                } else if (this.chooseCategory === 'like') {
                  this.tapLike(dateValNow, dateValChaTwo)
                } else if (this.chooseCategory === 'forward') {
                  this.tapForward(dateValNow, dateValChaTwo)
                }else if (this.chooseCategory === 'follow') {
                  this.tapFollow(dateValNow, dateValChaTwo)
                } else {
                  this.tapReplayCom(dateValNow, dateValChaTwo)
                }
              } else {
                this.$Message.warning('时间不能是过去的')
              }
            }
          } //for
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleAddReplayComSubmit(formName) {
      // 模板编辑、添加提交
      this.modalReplayComLoading = true
      let mobile = window.localStorage.getItem('mobile');
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过，提交请求
          let postUrl = this.modalReplayComEditing
            ? 'besser/fbcc/models/modelEdit'
            : 'besser/fbcc/models/modelAdd'
          let postData = this.modalReplayComEditing
            ? {
                //编辑请求参数
                id: this.modalReplayComEditingID,
                token: window.localStorage.getItem('token'),
                content: this.replayComData.content,
                mobile: mobile,
                groupid: this.replayComData.groupID
              }
            : {
                // 添加请求参数
                token: window.localStorage.getItem('token'),
                content: this.replayComData.content,
                mobile: mobile,
                groupid: this.replayComData.groupID
              }
          this.axios({
            url: postUrl,
            method: 'post',
            data: postData,
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
                this.replayCom = []
                this.$Message.success('操作成功')
              } else {
                this.$Message.warning('操作失败', res)
              }
              this.getReplayComList()
              this.modalReplayCom = false
              this.modalReplayComLoading = false
              this.modalReplayComEditing = false
              this.modalReplayComEditingID = ''
            })
            .catch(err => {
              console.error('操作异常', err)
              this.$Message.error('操作异常')
              this.modalReplayCom = false
              this.modalReplayComLoading = false
              this.modalReplayComEditing = false
              this.modalReplayComEditingID = ''
            })
        } else {
          //
          this.modalReplayComLoading = false
          this.modalReplayComEditing = false
          this.modalReplayComEditingID = ''
          // this.$Message.error('Fail!');
        }
      })
    },
    handleReplayGroupSubmit(formName) {
      // 模板组编辑、添加提交
      this.modalReplayGroupLoading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过，提交请求
          let mobile = window.localStorage.getItem('mobile');
          let postUrl = this.modalReplayGroupEditing
            ? 'besser/fbcc/models/modelgroupEdit'
            : 'besser/fbcc/models/modelgroupAdd'
          let postData = this.modalReplayGroupEditing
            ? {
                //编辑请求参数
                id: this.modalReplayGroupEditingID,
                token: window.localStorage.getItem('token'),
                name: this.replayGroupData.name,
                mobile: mobile,
                desc: this.replayGroupData.desc
              }
            : {
                // 添加请求参数
                token: window.localStorage.getItem('token'),
                name: this.replayGroupData.name,
                mobile: mobile,
                desc: this.replayGroupData.desc
              };
          this.axios({
            url: postUrl,
            method: 'post',
            data: postData,
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
          }).then(res => {
              if (res.data.code === 200) {
                this.$Message.success('操作成功')
                this.replayGroupCom = []
              } else {
                this.$Message.warning('操作失败', res)
              }
              this.getReplayGroupList()
              this.modalReplayGroup = false
              this.modalReplayGroupLoading = false
              this.modalReplayGroupEditing = false
              this.modalReplayGroupEditingID = ''
            }).catch(err => {
              console.error('操作异常', err)
              this.$Message.error('操作异常')
              this.modalReplayGroup = false
              this.modalReplayGroupLoading = false
              this.modalReplayGroupEditing = false
              this.modalReplayGroupEditingID = ''
            })
        } else {
          //
          this.modalReplayGroupLoading = false
          this.modalReplayGroupEditing = false
          this.modalReplayGroupEditingID = ''
          // this.$Message.error('Fail!');
        }
      })
    },
    handleFormReset(formName) {
      this.$refs[formName].resetFields()
    },
    tapReplayComEdit(item) {
      //编辑当前模板
      this.modalReplayCom = true //打开模板编辑窗口
      this.modalReplayComEditing = true //设置模板执行编辑状态
      this.modalReplayComEditingID = item.row.id //设置正在编辑的模板ID
      this.replayComData = {
        content: item.row.content ? item.row.content:'',
        groupID: item.row.groupID ? item.row.groupID:[]
      } //设置编辑前的内容
    },
    tapReplayGroupEdit(item) {
      //编辑当前模板组
      this.modalReplayGroup = true //打开模板编辑窗口
      this.modalReplayGroupEditing = true //设置模板执行编辑状态
      this.modalReplayGroupEditingID = item.row.id //设置正在编辑的模板ID
      this.replayGroupData = {
        name: item.row.name ? item.row.name:'',
        desc: item.row.desc ? item.row.desc:''
      } //设置编辑前的内容
    },
    tapAddReplayComDel(item) {
      if(item && item.row){

          if (!confirm('确定执行删除吗？')) return;
      }else if(!this.replayCom.length) {
          this.$Notice.warning({
              title: "请选择操作的数据",
          });
          return;
      }
      //删除当前模板
      let id = item && item.row ? [item.row.id]:this.replayCom.map(function (v) {
          return v.id
      });
      let mobile = window.localStorage.getItem('mobile');
      this.axios({
        url: 'besser/fbcc/models/modelDel',
        method: 'post',
        data: {
          token: window.localStorage.getItem('token'),
          mobile: mobile,
          id: id
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
            this.replayCom = [];
            this.$Message.success('删除模板成功')
          } else {
            this.$Message.warning('删除模板失败', res)
          }
          this.getReplayComList()
        })
        .catch(err => {
          this.$Message.error('删除模板异常')
        })
    },
    tapAddReplayGroupDel(item) {
      if(item){
          if (!confirm('确定执行删除吗？')) return;
      }else if(!this.replayGroupCom.length){
          this.$Notice.warning({
              title: "请选择操作的数据",
          });
          return;
      }
      //删除当前模板组
      let id = item && item.row ?  [item.row.id]:this.replayGroupCom.map(function (v) {
          return v.id
      });
      let mobile = window.localStorage.getItem('mobile');
      this.axios({
        url: 'besser/fbcc/models/modelgroupDel',
        method: 'post',
        data: {
          token: window.localStorage.getItem('token'),
          mobile: mobile,
          id: id
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
              this.replayGroupCom = []
            this.$Message.success('删除模块组成功')
          } else {
            this.$Message.warning('删除模块组失败', res)
          }
          this.getReplayGroupList()
        })
        .catch(err => {
          console.error('删除模块组异常', err)
          this.$Message.error('删除模块组异常')
        })
    },
    tapChoose(val) {
       this.replayCom = val
    },
    tapGroupChoose(val) {
       this.replayGroupCom = val
    },
    tapLike(dateValNow, timeVal) {
      let taskNow = window.sessionStorage.getItem('taskNow')
      let network = window.sessionStorage.getItem('network')

      if (network !== '200') {
        this.$Message.error(this.$t('message.tipNetWrong'))
      } else if (taskNow !== '' && taskNow !== null) {
        this.$Notice.warning({
          title: taskNow + this.$t('message.tipWarnTaskNowNot')
        })
      } else {
        if (this.likePageInput === '' && this.likeModelVal === 'postPage') {
          this.$Message.warning('请输入主页关键词')
        } else {
          let localstroage = window.localStorage
          let imei = this.checkImeiOnline()
          let token = localstroage.getItem('token')
          if (imei.length > 0) {
            // let postDataVal = '';
            // if(this.likeModelVal === 'postPage') {
            //   postDataVal = this.likePageInput;
            // }
            let batchId =
              new Date().valueOf().toString() +
              Math.floor(Math.random() * 10).toString() +
              Math.floor(Math.random() * 10).toString()
            let tasks = []
            //let postDataVal = '';
            if (this.likeModelVal === 'postPage') {
              tasks.push({
                type: this.typeNumber,
                batchId: batchId,
                data: {
                  text: this.likePageInput,
                  multimedia: [],
                  postnum: this.likePageNumber
                }
              })
              //postDataVal = this.forwardPageInput;
            } else {
              tasks.push({
                type: this.typeNumber,
                batchId: batchId,
                data: ''
              })
            }
            // let tasks = [{
            //     type: this.typeNumber,
            //     batchId: batchId,
            //     data: postDataVal
            // }];

            let mainId = 0
            if (Number(dateValNow) > 0) {
              mainId =
                dateValNow.toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString()
            } else {
              mainId =
                new Date().valueOf().toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString()
            }
            let postTypeVal =
              this.likeModelVal === 'postTimeLine'
                ? 0
                : this.likeModelVal === 'postPages' ? 1 : 2
            let body = {
              imei: imei,
              token: token,
              mainId: mainId,
              delaySecond: timeVal,
              category: postTypeVal,
              tasks: tasks
            }
            let bodyStr = JSON.stringify(body)
            this.$socket.emit('messageholder', {
              sign: 1,
              type: 33,
              body: bodyStr
            })

            this.changeBtnStatus()
            window.sessionStorage.setItem('taskNow', '点赞')

            if (timeVal === 0) {
              this.keepTask(mainId, batchId, this.typeNumber, '点赞', imei)
            }

            this.$Message.success('发布成功')
          } else {
            this.$Message.warning('发布失败')
          }
        }
      } //if tasknow
    },

    tapFollow(dateValNow, timeVal) {
          let taskNow = window.sessionStorage.getItem('taskNow')
          let network = window.sessionStorage.getItem('network')

          if (network !== '200') {
              this.$Message.error(this.$t('message.tipNetWrong'))
          } else if (taskNow !== '' && taskNow !== null) {
              this.$Notice.warning({
                  title: taskNow + this.$t('message.tipWarnTaskNowNot')
              })
          } else {
              if (this.followPageInput === '' && this.followModelVal === 'postPage') {
                  this.$Message.warning('请输入主页关键词')
              } else {
                  let localstroage = window.localStorage
                  let imei = this.checkImeiOnline()
                  let token = localstroage.getItem('token')
                  if (imei.length > 0) {
                      let batchId =
                          new Date().valueOf().toString() +
                          Math.floor(Math.random() * 10).toString() +
                          Math.floor(Math.random() * 10).toString()
                      let tasks = []
                      //let postDataVal = '';
                      if (this.followModelVal === 'postPage') {
                          tasks.push({
                              type: this.typeNumber,
                              batchId: batchId,
                              data: {
                                  text: this.followPageInput,
                                  multimedia: [],
                                  postnum: this.followPageNumber
                              }
                          })
                          //postDataVal = this.forwardPageInput;
                      } else {
                          tasks.push({
                              type: this.typeNumber,
                              batchId: batchId,
                              data: ''
                          })
                      }
                      // let tasks = [{
                      //     type: this.typeNumber,
                      //     batchId: batchId,
                      //     data: postDataVal
                      // }];

                      let mainId = 0
                      if (Number(dateValNow) > 0) {
                          mainId =
                              dateValNow.toString() +
                              Math.floor(Math.random() * 10).toString() +
                              Math.floor(Math.random() * 10).toString() +
                              Math.floor(Math.random() * 10).toString()
                      } else {
                          mainId =
                              new Date().valueOf().toString() +
                              Math.floor(Math.random() * 10).toString() +
                              Math.floor(Math.random() * 10).toString() +
                              Math.floor(Math.random() * 10).toString()
                      }
                      let postTypeVal = 1
                      let body = {
                          imei: imei,
                          token: token,
                          mainId: mainId,
                          delaySecond: timeVal,
                          category: postTypeVal,
                          tasks: tasks
                      }
                      let bodyStr = JSON.stringify(body)
                      this.$socket.emit('messageholder', {
                          sign: 1,
                          type: 33,
                          body: bodyStr
                      })

                      this.changeBtnStatus()
                      window.sessionStorage.setItem('taskNow', '关注')

                      if (timeVal === 0) {
                          this.keepTask(mainId, batchId, this.typeNumber, '关注', imei)
                      }

                      this.$Message.success('发布成功')
                  } else {
                      this.$Message.warning('发布失败')
                  }
              }
          } //if tasknow
      },

    tapForward(dateValNow, timeVal) {
      let taskNow = window.sessionStorage.getItem('taskNow')
      let network = window.sessionStorage.getItem('network')

      if (network !== '200') {
        this.$Message.error(this.$t('message.tipNetWrong'))
      } else if (taskNow !== '' && taskNow !== null) {
        this.$Notice.warning({
          title: taskNow + this.$t('message.tipWarnTaskNowNot')
        })
      } else {
        if (
          this.forwardPageInput === '' &&
          this.forwardModelVal === 'postPage'
        ) {
          this.$Message.warning('请输入主页关键词')
        } else {
          let localstroage = window.localStorage
          let imei = this.checkImeiOnline()
          let token = localstroage.getItem('token')
          if (imei.length > 0) {
            let batchId =
              new Date().valueOf().toString() +
              Math.floor(Math.random() * 10).toString() +
              Math.floor(Math.random() * 10).toString()
            let tasks = []
            //let postDataVal = '';
            if (this.forwardModelVal === 'postPage') {
              tasks.push({
                type: this.typeNumber,
                batchId: batchId,
                data: {
                  text: this.forwardPageInput,
                  multimedia: [],
                  postnum: this.forwardPageNumber
                }
              })
              //postDataVal = this.forwardPageInput;
            } else {
              tasks.push({
                type: this.typeNumber,
                batchId: batchId,
                data: ''
              })
            }
            // let tasks = [{
            //     type: 67,
            //     batchId: batchId,
            //     data: postDataVal
            // }];

            let mainId = 0
            if (Number(dateValNow) > 0) {
              mainId =
                dateValNow.toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString()
            } else {
              mainId =
                new Date().valueOf().toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString()
            }
            let postTypeVal =
              this.forwardModelVal === 'postTimeLine'
                ? 0
                : this.forwardModelVal === 'postPages' ? 1 : 2

            let body = {
              imei: imei,
              token: token,
              mainId: mainId,
              delaySecond: timeVal,
              category: postTypeVal,
              tasks: tasks
            }
            let bodyStr = JSON.stringify(body)
            this.$socket.emit('messageholder', {
              sign: 1,
              type: 33,
              body: bodyStr
            })

            this.changeBtnStatus()
            window.sessionStorage.setItem('taskNow', '转发')

            if (timeVal === 0) {
              this.keepTask(mainId, batchId, this.typeNumber, '转发', imei)
            }

            this.$Message.success('发布成功')
          } else {
            this.$Message.warning('发布失败')
          }
        }
      } //if tasknow
    },

    tapReplayCom(dateValNow, timeVal) {
      let taskNow = window.sessionStorage.getItem('taskNow')
      let network = window.sessionStorage.getItem('network')

      if (network !== '200') {
        this.$Message.error(this.$t('message.tipNetWrong'))
      } else if (taskNow !== '' && taskNow !== null) {
        this.$Notice.warning({
          title: taskNow + this.$t('message.tipWarnTaskNowNot')
        })
      } else {
        let replayCom = this.replayCom.map(function (v) {
            return v.content
        });
        if (replayCom.length == '') {
          this.$Message.warning(this.$t('message.tipWarnReplay'))
        } else if (
          this.replyPageInput === '' &&
          this.replyModelVal === 'postPage'
        ) {
          this.$Message.warning('请输入主页关键词')
        } else {
          let localstroage = window.localStorage
          let imei = this.checkImeiOnline()
          let token = localstroage.getItem('token')
          if (imei.length > 0) {
            //   let postDataVal = '';
            //   if(this.replyModelVal === 'postPage') {
            //     postDataVal = this.replyPageInput;
            //   }
            let batchId =
              new Date().valueOf().toString() +
              Math.floor(Math.random() * 10).toString() +
              Math.floor(Math.random() * 10).toString()
            let tasks = []
            //let postDataVal = '';
            if (this.replyModelVal === 'postPage') {
              tasks.push({
                type: this.typeNumber,
                batchId: batchId,
                data: {
                  text: replayCom,
                  multimedia: [],
                  pagename: this.replyPageInput,
                  postnum: this.replyPageNumber
                }
              })
              //postDataVal = this.forwardPageInput;
            } else {
              tasks.push({
                type: this.typeNumber,
                batchId: batchId,
                data: {
                  text: replayCom
                }
              })
            }
            // let tasks = [{
            //     type: 65,
            //     batchId: batchId,
            //     data: {
            //       postDataVal,
            //       replayCom,
            //     }
            // }];

            let mainId = 0
            if (Number(dateValNow) > 0) {
              mainId =
                dateValNow.toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString()
            } else {
              mainId =
                new Date().valueOf().toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString() +
                Math.floor(Math.random() * 10).toString()
            }

            let postTypeVal =
              this.likeModelVal === 'replyTimeLine'
                ? 0
                : this.likeModelVal === 'replyPages' ? 1 : 2

            let body = {
              imei: imei,
              token: token,
              mainId: mainId,
              delaySecond: timeVal,
              category: postTypeVal,
              tasks: tasks
            }
            let bodyStr = JSON.stringify(body)
            this.$socket.emit('messageholder', {
              sign: 1,
              type: 33,
              body: bodyStr
            });

            this.changeBtnStatus()
            window.sessionStorage.setItem('taskNow', this.$t('message.reply'))

            if (timeVal === 0) {
              this.keepTask(
                mainId,
                batchId,
                this.typeNumber,
                this.$t('message.reply'),
                imei
              )
            }

            this.$Message.success(this.$t('message.tipSuccessTaskOk'))
          } else {
            this.$Message.warning(this.$t('message.tipWarnChooseAccount'))
          }
        }
      } //if tasknow
    },

    checkImeiOnline() {
      let localstroage = window.localStorage
      let imeiGet = localstroage.getItem('devicesList').split(',')
      let deviceListAllOnline = localstroage
        .getItem('deviceListAllOnline')
        .split(',')
      let imei = []
      if (imeiGet[0] !== '' && deviceListAllOnline[0] !== '') {
        for (let i = 0; i < imeiGet.length; i++) {
          if (deviceListAllOnline.indexOf(imeiGet[i]) !== -1) {
            imei.push(imeiGet[i])
          }
        }
      }
      console.log('选择的在线设备是1：', imei)
      var imeiNew = []
      for (let i = 0, l = imei.length; i < l; i++) {
        for (let j = i + 1; j < l; j++) if (imei[i] === imei[j]) j = ++i
        imeiNew.push(imei[i])
      }

      console.log('选择的在线设备是2：', imeiNew)
      return imeiNew
    },

    keepTask(mainId, batchId, type, name, imei) {
      let d = new Date()
      let day = d.getDate()
      let month = d.getMonth() + 1
      let hour = d.getHours()
      let min = d.getMinutes()
      let startTime = month + '/' + day + ' ' + hour + ':' + min
      let imeiList = []
      for (var i = 0; i < imei.length; i++) {
        let imeiListOne = {
          imei: imei[i],
          ret: 0
        }
        imeiList.push(imeiListOne)
      }
      let taskListOne = {
        mainId: mainId,
        batchId: batchId,
        taskName: name,
        taskType: type,
        startTime: startTime,
        endTime: '',
        taskStatus: this.$t('message.tipInfoTaskIng'),
        progress: 0,
        error: 0,
        imeiList: imeiList
      }

      let localstroage = window.localStorage
      let mobileNow = localstroage.getItem('mobile')
      let nameKeyNow = 'taskList' + mobileNow
      let taskListLocal = localstroage.getItem(nameKeyNow)
      if (taskListLocal !== null) {
        let taskListAllLocalArr = JSON.parse(localstroage.getItem(nameKeyNow))
        taskListAllLocalArr.taskList.unshift(taskListOne)
        localstroage.setItem(nameKeyNow, JSON.stringify(taskListAllLocalArr))
      } else {
        let taskList = {
          taskList: [taskListOne]
        }
        let taskListAllLocalString = JSON.stringify(taskList)
        localstroage.setItem(nameKeyNow, taskListAllLocalString)
      }
    },

    changeBtnStatus() {
      this.showBtn = false
      let timecountGet = this.timecount
      if (timecountGet === 0) {
        this.showBtn = true
        this.timecount = this.GLOBAL.limitSec
        window.sessionStorage.setItem('taskNow', '')
      } else {
        timecountGet = timecountGet - 1
        this.timecount = timecountGet
        setTimeout(() => {
          this.changeBtnStatus()
        }, 1000)
      }
    }
  }
}
</script>
