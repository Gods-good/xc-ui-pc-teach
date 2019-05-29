<template>
  <div>
    <el-button type="primary" @click="teachplayFormVisible = true">添加课程计划</el-button>
    <el-tree
      :data="teachplanList"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>

    <el-dialog title="添加课程计划" :visible.sync="teachplayFormVisible" >
    <el-form ref="teachplayForm"  :model="teachplanActive" label-width="140px" style="width:600px;" :rules="teachplanRules" >
      <el-form-item label="上级结点" >
      <el-select v-model="teachplanActive.parentid" placeholder="默认为根结点">
        <el-option
          v-for="item in teachChapterList"
          :key="item.id"
          :label="item.pname"
          :value="item.id">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="章节/课时名称" prop="pname">
        <el-input v-model="teachplanActive.pname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程类型" >
        <el-radio-group v-model="teachplanActive.ptype">
          <el-radio class="radio" label='1'>视频</el-radio>
          <el-radio class="radio" label='2'>文档</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学习时长（分钟）  请输入数字" >
        <el-input type="number" v-model="teachplanActive.timelength" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="排序字段" >
        <el-input v-model="teachplanActive.orderby" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="章节/课时介绍" prop="description">
        <el-input type="textarea" v-model="teachplanActive.description" ></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="teachplanActive.status" >
          <el-radio class="radio" label="0" >未发布</el-radio>
          <el-radio class="radio" label='1'>已发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item  >
        <el-button type="primary" v-on:click="addTeachplan">提交</el-button>
      </el-form-item>

    </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  let id = 1000;
  export default {
    data() {
      return {
        teachplayFormVisible:false,
        mediaFormVisible:false,
        courseid:'',
        teachplanRules: {
          pname: [
            {required: true, message: '请输入课程计划名称', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ]
         },
        teachChapterList:[],
        teachplanActive:{},
        teachplanList: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'pname'
        }
      }
    },
    methods: {
      edit(data){
          //alert();

      },
      addTeachplan(){
        this.$refs.teachplayForm.validate((valid) => {
          if (valid) {
            //添加课程计划时带上课程id
            this.teachplanActive.courseid = this.courseid;
            courseApi.addTeachplan(this.teachplanActive).then((res) => {
              if(res.success){
                this.$message.success('提交成功');
                //清空表单
                this.teachplanActive = {}
                //刷新整个树
                this.findTeachplan();
              }else{
                this.$message.error('提交失败');
              }
            });
          }
        })

      },
      remove(node, data) {

      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.edit(data) }>修改</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      },
      findTeachplan(){
        courseApi.findTeachplanList(this.courseid).then((res) => {

          if(res){
           this.teachplanList = [];
            this.teachplanList.push(res);
//            console.log(this.teachplanList);
            //取出章节列表显示在添加页面的下拉框
            this.teachChapterList = res.children
//            this.teachChapterList.push({id:'',pname:'根结点'})
          }

        });
      }
    },
    mounted(){
      //课程id
      this.courseid = this.$route.params.courseid;
      //课程计划
      this.findTeachplan();
    }
  }
</script>
<style scoped>


  .el-main {
    float:right;
    width:500px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
