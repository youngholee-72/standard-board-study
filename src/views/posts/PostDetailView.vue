<template>
  <div class="container">
    <h2>조회</h2>
    <AppLoading v-if="isLoading" />
    <AppError v-else-if="error" :message="error.message"></AppError>
    <div v-else>
      <div class="row mb-3">
        <label for="author" class="col-sm-2 col-form-label">{{ $t(`form.author`) }}</label>
        <div class="col-sm-4">
          <input type="text" v-model="item.head.author" readonly class="form-control-plaintext" id="author" disabled>
        </div>
      </div>

      <div class="row mb-3">
        <label for="title" class="col-sm-2 col-form-label">{{ $t(`form.subject`) }}</label>
        <div class="col-sm-10">
          <input type="text" v-model="item.head.title" readonly class="form-control-plaintext" id="title">
        </div>
      </div>

      <!-- 동적인 필드 영역 -->
      <div v-if="item.body.length > 0" class="row mb-3 g-3">
        <template v-for="field in item.body" :key="field">
          <label :for="field.name" class="col-sm-2 col-form-label">{{ $t(`custom.${field.name}`) }}</label>
          <div class="col-sm-4">
            <input :type="field.type" v-model="field.value" readonly class="form-control-plaintext" :id="field.name">
          </div>
        </template>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">내용</label>
        <textarea v-model="item.head.description" placeholder="enter" readonly class="form-control-plaintext"
          id="description" rows="3"></textarea>
      </div>
    </div>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">수정</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="remove">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAxios } from '@vueuse/integrations/useAxios';
import { useAlert } from '@/composables/alert';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
  id: [String, Number]
})

const { data, isLoading, error } = useAxios(`/api/board/v1/posts/item`,
  {
    method: 'post',
    data: { id: `${props.id}` }
  }, undefined
)

const item = computed(() => data.value.body)

const goListPage = () => {
  router.push({
    name: 'List'
  })
}

const goEditPage = () => {
  router.push({
    name: 'Edit',
    data: { id: `${props.id}` }
  })
}

const { vAlert, vSuccess } = useAlert()
const { execute } = useAxios(`/api/board/v1/posts`,
  {
    method: 'delete',
    params: { "id": `${props.id}` }
  }, undefined,
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'List' })
      vSuccess('삭제에 성공!')
    },
    onFailure: (e) => {
      vAlert(e.message)
      error.value = e
    }
  }
)
const remove = () => {
  execute()
}

</script>

<style scoped></style>
