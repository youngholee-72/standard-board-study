<template>
  <div class="container">
    <h2>수정</h2>
    <AppLoading v-if="isLoading" />
    <AppError v-else-if="error" :message="error.message"></AppError>
    <div v-else>
      <form @submit.prevent="edit">

        <div class="row mb-3">
          <label for="author" class="col-sm-2 col-form-label">{{ $t(`form.author`) }}</label>
          <div class="col-sm-4">
            <input type="text" v-model="item.head.author" readonly class="form-control-plaintext" id="author">
          </div>
        </div>

        <div class="row mb-3">
          <label for="title" class="col-sm-2 col-form-label">{{ $t(`form.subject`) }}</label>
          <div class="col-sm-10">
            <input type="text" v-model="item.head.title" class="form-control" id="title">
          </div>
        </div>

        <!-- 동적인 필드 영역 -->
        <div v-if="item.body.length > 0" class="row mb-3 g-3">
          <template v-for="field in item.body" :key="field">
            <label :for="field.name" class="col-sm-2 col-form-label">{{ $t(`custom.${field.name}`) }}</label>
            <div class="col-sm-4">
              <input :type="field.type" v-model="field.value" class="form-control" :id="field.name">
            </div>
          </template>
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">내용</label>
          <textarea v-model="item.head.description" placeholder="enter" class="form-control" id="description"
            rows="3"></textarea>
        </div>

        <hr class="my-4" />
        <div class="row g-2">
          <div class="col-auto">
            <button class="btn btn-outline-dark" @click="goDetailPage">취소</button>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">수정</button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@vueuse/integrations/useAxios';
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

const goDetailPage = () => {
  router.push({
    name: 'Detail',
    data: { id: `${props.id}` }
  })
}
const { vAlert, vSuccess } = useAlert()
const { execute } = useAxios(`/api/board/v1/posts`,
  {
    method: 'put'
  }, undefined,
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'List' })
      vSuccess('수정에 성공!')
    },
    onFailure: (e) => {
      vAlert(e.message)
      error.value = e
    }
  }
)
const edit = async () => {
  const submitData = {
    id: `${props.id}`,
    meta: item.value.meta,
    head: item.value.head,
    body: item.value.body,
  }
  // 객체를 JSON 문자열로 변환
  const jsonString = JSON.stringify(submitData);

  // 결과 출력
  console.log(jsonString);
  // POST 데이터 형식 주의 : { data: { ...submitData } }
  execute({ data: { ...submitData } })
}

</script>

<style scoped></style>
