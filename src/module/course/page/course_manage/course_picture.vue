<template>
  <div>
    <el-upload
      action="/filesystem/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :before-upload="setbusinesskey"
      :before-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :limit="picmax"
      :on-exceed="rejectupload"
      :data="uploadval">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>
</template>
<script>
  import * as sysConfig from '@/../config/sysConfig';
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  import * as systemApi from '../../../../base/api/system';
  import courseSteps from '../../components/course_steps.vue';
  export default {
    data() {
      return {
        active: 1,
        picmax:1,
        courseid:'',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        uploadval:{},
        imgUrl:sysConfig.imgUrl
//        fileList:[{name: 'food.jpg', url: 'http://192.168.101.64/group1/M00/00/01/wKhlQVp5r3WAJlBmAAFEl8syKxg506.jpg'}]
      }
    },
    methods: {
      next() {
          this.$router.push({ path: '/course/add/marketinfo/2/1/'+this.courseid})
      },
      rejectupload(){
        this.$message.error("最多上传"+this.picmax+"个图片");
      },
      setbusinesskey(){
          this.uploadval.businesskey = this.courseid
          let metadata = {}
         metadata.width='44'//test
         metadata.height='44'//test
          let metadataString  = JSON.stringify(metadata);;
          this.uploadval.metedata = metadataString
      },
      handleRemove(file, fileList) {
        console.log(file)
        //删除图片
        courseApi.deleteCoursePic(this.courseid).then((res) => {
          if(res.success){
            this.$message.success('删除成功');
            list()
          }else{
            this.$message.error(res.message);
          }
        });

      },
      //上传成功的钩子方法
      handleSuccess(response, file, fileList){
          console.log(response)
        if(!(response && response.fileSystem && response.fileSystem.filePath)){
          this.$message.error('保存图片信息失败，请重新上传');
          this.list()
          return ;
        }
          let pic = response.fileSystem.filePath
          //保存课程图片信息
        courseApi.addCoursePic(this.courseid,pic).then((res) => {
          if(res.success){
            this.$message.success('上传成功');
            this.list()
          }else{
            this.$message.error('保存图片信息失败，请重新上传');
            this.list()
          }
        }).catch(() => {
          this.$message.error('保存图片信息失败，请重新上传');
          this.list()
        });;

      },
      //预览图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      list(){
        this.fileList = []
        courseApi.findCoursePicList(this.courseid).then((res) => {
          console.log(res)
          if(res.pic){
              let name = '图片';
              let url = this.imgUrl+res.pic;
              let fileId = res.courseid;
              this.fileList.push({name:name,url:url,fileId:fileId});
          }
          console.log(this.fileList);
        });
      }
    },
    mounted(){
      //课程id
      this.courseid = this.$route.params.courseid;
      //取图片列表
      this.list()
   }
  }
</script>
<style scoped>


</style>
