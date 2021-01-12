<template>
  <panel-layout class="article-admin">
    <template #title>文章管理</template>
    <template #toobar>
      <el-button size="mini" type="success" @click="onAdd()">新增</el-button>
    </template>
    <el-table ref="tableRef" :data="tableData" border style="width: 100%">
      <el-table-column label="序号" width="80" align="center" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
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
  </panel-layout>
</template>

<script>
import PanelLayout from '@/layout/panel-layout'
import { ElTable, ElTableColumn, ElButton, ElPagination, ElMessageBox } from 'element-plus'
import usePagging from './usePagging'
import request from '@/utils/request'
import { ref } from 'vue'

export default {
  name: 'article-admin',
  components: { PanelLayout, ElTable, ElTableColumn, ElButton, ElPagination },
  emits: ['change-view'],
  setup(props, context) {
    const tableData = ref([])
    const tableRef = ref(null)

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

    pagging.pageChange(1)

    const onEdit = row => {
      console.log(row)
    }

    const onAdd = () => {
      context.emit('change-view', 'add')
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
      })
    }

    return {
      pagging,
      tableData,
      tableRef,
      onAdd,
      onEdit,
      onDelete
    }
  }
}
</script>

<style lang="scss" scoped>
.article-admin {
  padding: 0.5rem;

  .pagination {
    margin-top: 1rem;
  }
}
</style>
