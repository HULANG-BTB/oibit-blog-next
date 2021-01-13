<template>
  <div class="login">
    <div class="login-form">
      <div class="title">Login</div>
      <el-form ref="formRef" :model="form.data" :rules="form.rules" @keyup.enter="onLogin">
        <el-form-item prop="username">
          <el-input v-model="form.data.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.data.password" placeholder="Password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onLogin">login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
// import request from '@/utils/request'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'login',
  components: { ElForm, ElFormItem, ElInput, ElButton },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const formRef = ref(null)

    const form = reactive({
      data: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true }],
        password: [{ required: true }]
      }
    })

    const onLogin = async () => {
      try {
        await formRef.value.validate()
        const data = await store.dispatch('user/login', form.data)
        // const data = await request({
        //   method: 'post',
        //   url: '/api/user/login',
        //   data: form.data
        // })
        if (data.id) {
          store.commit('user/SET_AUTH', true)
          const redirect = route.query.redirect || '/'
          router.push(redirect)
        }
      } catch (e) {
        console.log(e)
      }
    }
    return { formRef, form, onLogin }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/img/background.png');

  .login-form {
    width: 480px;
    min-height: 5rem;
    background-color: rgba($color: #ffffff, $alpha: 0.6);
    padding: 3rem;
    border-radius: 1rem;

    .title {
      margin-bottom: 2rem;
      font-size: 1.2rem;
      text-align: center;
    }
  }
}
</style>
