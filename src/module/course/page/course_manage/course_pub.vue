<template>
  <div>
    <template>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>课程预览</span>
          </div>
          <div class="text item">
            <el-button type="primary"  @click.native="preview" >课程预览</el-button>
            <br/><br/>
            <span v-if="previewurl && previewurl!=''"><a :href="previewurl" target="_blank">点我查看课程预览页面 </a> </span>
          </div>
        </el-card>
      </div>
    </template>
  </div>
</template>
<script>
  import * as sysConfig from '@/../config/sysConfig';
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  import * as systemApi from '../../../../base/api/system';
  export default{

    data() {
      return {
        dotype: '',
        courseid: '',
        course: {"id": "", "name": "", "status": ""},
        previewurl: ''
      }
    },
    methods:{
      //预览
      preview(){
        //调用课程管理服务的预览接口，得到课程预览url
        courseApi.preview(this.courseid).then((res) => {
          if(res.success){
            this.$message.error('预览页面生成成功，请点击下方预览链接');
            if(res.previewUrl){
              //预览url
              this.previewurl = res.previewUrl
            }
          }else{
            this.$message.error(res.message);
          }
        });
      }

    },
    mounted(){
      //课程id
      this.courseid = this.$route.params.courseid;
    }

  }
</script>
<style>

</style>
