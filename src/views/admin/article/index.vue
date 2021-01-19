<template>
  <panel-layout class="article-admin">
    <template #title>
      <div class="title-add" v-if="view === 'add'">新增文章</div>
      <div class="title-edit" v-else-if="view === 'edit'">编辑文章： {{ formData.oldTitle }}</div>
      <div class="title-list" v-else-if="view === 'list'">文章列表</div>
    </template>
    <template #toobar>
      <el-button v-if="view === 'list'" size="mini" type="success" @click="onAdd">新增</el-button>
      <el-button v-if="view !== 'list'" size="mini" type="primary" @click="onQuery">返回</el-button>
      <el-button v-if="view !== 'list'" size="mini" type="success" @click="onSave">保存</el-button>
    </template>
    <div class="page-content">
      <transition name="view">
        <div class="article-list" v-if="view === 'list'">
          <el-table ref="tableRef" :data="tableData" border style="width: 100%" size="small">
            <el-table-column label="序号" width="80" align="center" prop="id"></el-table-column>
            <el-table-column label="标题" prop="title"> </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template #default="scope" fixed="right">
                <el-button size="mini" type="primary" @click="onEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="onDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next, sizes, jumper"
            :current-page="pagging.page"
            :total="pagging.total"
            @size-change="pagging.sizeChange"
            @current-change="pagging.pageChange"
          >
          </el-pagination>
        </div>
        <div class="article-edit" v-else>
          <el-form ref="formRef" :model="formData" size="small" label-width="100px">
            <el-form-item label="缩略图" prop="thumbnail">
              <el-upload class="image-uploader" action="/api/upload/images" :show-file-list="false" :on-success="handleThumbnailSuccess" :before-upload="beforeThumbnailUpload">
                <img v-if="formData.thumbnail" :src="formData.thumbnail" class="image" />
                <i v-else class="el-icon-plus image-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="摘要" prop="abstract">
              <el-input v-model="formData.abstract" type="textarea" :autosize="{ minRows: 5 }" max-length="120"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <el-input v-model="formData.content" type="textarea" :autosize="{ minRows: 10 }"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </div>
  </panel-layout>
</template>

<script>
import PanelLayout from '@/layout/panel-layout'
import { ElTable, ElTableColumn, ElButton, ElPagination, ElMessageBox, ElForm, ElFormItem, ElInput, ElUpload, ElMessage } from 'element-plus'
import usePagging from './usePagging'
import request from '@/utils/request'
import { nextTick, onMounted, ref } from 'vue'

export default {
  name: 'article-admin',
  components: { PanelLayout, ElTable, ElTableColumn, ElButton, ElPagination, ElForm, ElFormItem, ElInput, ElUpload },
  setup() {
    const view = ref('list')

    const tableData = ref([])
    const tableRef = ref(null)
    const formData = ref({
      title: null,
      abstract: null,
      content: null,
      thumbnail: null
    })
    const formRef = ref(null)

    const handleThumbnailSuccess = res => {
      if (res.code !== 200) {
        ElMessage.error(res.error)
      } else {
        console.log(res.data[0]?.url)
        formData.value.thumbnail = res.data[0]?.url
      }
    }

    const beforeThumbnailUpload = file => {
      const isImage = /^image/.test(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isImage) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        ElMessage.error('上传头像图片大小不能超过 5MB!')
      }
      return isImage && isLt5M
    }

    const fetchData = async (page, limit) => {
      const data = await request({
        method: 'get',
        url: '/api/article/list',
        params: {
          page,
          limit
        }
      })
      tableData.value = data.rows
      return { page: data.page, limit: data.limit, total: data.count }
    }

    const deleteData = async row => {
      const { id } = row
      const data = await request({
        method: 'delete',
        url: `/api/article/delete/${id}`
      })
      console.log(data)
    }

    const pagging = usePagging(fetchData)

    pagging.reload()

    onMounted(() => {
      tableRef.value.doLayout()
    })

    const onEdit = async row => {
      const { id, title } = row
      view.value = 'edit'
      const data = await request({
        method: 'get',
        url: `/api/article/detail`,
        params: {
          id
        }
      })
      formData.value = data
      Object.keys(formData.value).forEach(key => {
        formData.value[key] = data[key] || ''
      })
      formData.value.oldTitle = title
    }

    const onAdd = () => {
      view.value = 'add'
    }

    const onSave = async () => {
      const { id, title, abstract, thumbnail, content } = formData.value
      const method = view.value === 'edit' ? 'put' : 'post'
      const url = `/api/article/${view.value === 'edit' ? 'update' : 'insert'}`
      try {
        await request({
          method,
          url,
          data: {
            id,
            title,
            abstract,
            thumbnail,
            content
          }
        })
        ElMessage.success('保存成功!')
        onQuery()
        pagging.reload()
      } catch (e) {
        ElMessage.drror(e.message)
      }
    }

    const onQuery = async () => {
      formRef.value.resetFields()
      await nextTick()
      view.value = 'list'
    }

    const onDelete = row => {
      console.log(row)
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteData(row)
        pagging.reload()
      })
    }

    return {
      view,
      pagging,
      tableData,
      tableRef,
      formData,
      formRef,
      onQuery,
      onAdd,
      onEdit,
      onDelete,
      onSave,
      handleThumbnailSuccess,
      beforeThumbnailUpload
    }
  }
}
</script>

<style lang="scss" scoped>
.article-admin {
  .page-content {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;

    .article-list,
    .article-edit {
      width: 100%;
      min-width: 100%;
      max-width: 100%;

      .image-uploader {
        :deep() {
          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
              border-color: #409eff;
            }
          }
        }

        .image-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .image {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
  }

  .pagination {
    margin-top: 1rem;
  }

  .view-enter-active {
    transition: all 0.7s ease-in;
  }
  .view-leave-active {
    transition: all 0.7s ease-in;
  }

  .view-enter-to,
  .view-leave-from {
    transform: translateX(0%);
  }

  .view-enter-from {
    transform: translateX(100%);
  }
  .view-leave-to {
    transform: translateX(-100%);
  }
}
</style>
