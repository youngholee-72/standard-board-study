<template>
  <div class="container">
    <h2>등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <form @submit.prevent="save">

      <div class="row mb-3">
        <label for="author" class="col-sm-2 col-form-label">{{ $t(`form.author`) }}</label>
        <div class="col-sm-4">
          <input type="text" v-model="form.head.author" class="form-control" id="author">
        </div>
      </div>

      <div class="row mb-3">
        <label for="title" class="col-sm-2 col-form-label">{{ $t(`form.subject`) }}</label>
        <div class="col-sm-10">
          <input type="text" v-model="form.head.title" class="form-control" id="title">
        </div>
      </div>

      <!-- 동적인 필드 영역 -->
      <div v-if="form.body.length > 0" class="row mb-3 g-3">
        <template v-for="field in form.body" :key="field">
          <label :for="field.name" class="col-sm-2 col-form-label">{{ $t(`custom.${field.name}`) }}</label>
          <div class="col-sm-4">
            <input :type="field.type" v-model="field.value" class="form-control" :id="field.name">
          </div>
        </template>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">내용</label>
        <textarea v-model="form.head.description" placeholder="enter" class="form-control" id="description"
          rows="3"></textarea>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
        <button type="submit" class="btn btn-outline-primary">Post</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const { vAlert, vSuccess } = useAlert()
const router = useRouter()

const form = ref({
  meta: {
    master_id: 1
  },
  head: {
    title: null,
    author: authStore.userInfo.id,
    description: null,
  },
  body: [{
    type: 'text',
    name: 'dept',
    value: null,
  },
  {
    type: 'text',
    name: 'company',
    value: null,
  },
  {
    type: 'text',
    name: 'manager',
    value: null,
  }
  ]
})

const { error, execute } = useAxios(`/api/board/v1/posts`,
  {
    method: 'post'
  }, undefined,
  {
    immediage: false, // 즉시 실행하지 않는다
    onSuccess: () => {
      router.push({ name: 'List' })
      vSuccess('저장에 성공!')
    },
    onFailure: (e) => {
      vAlert(e.message)
      error.value = e
    }
  }
)

const save = async () => {

  const submitData = {
    meta: form.value.meta,
    head: form.value.head,
    body: form.value.body,
  }
  // 객체를 JSON 문자열로 변환
  const jsonString = JSON.stringify(submitData);

  // 결과 출력
  console.log(jsonString);

  // POST 데이터 형식 주의 : { data: { ...submitData } }
  execute({ data: { ...submitData } })
}

const goListPage = () => {
  router.push({
    name: 'List'
  })
}
</script>

<style scoped></style>
