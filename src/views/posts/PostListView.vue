<template>
  <div>
    <h2>게시글 목록</h2>
    {{ totalCount }}
    <!-- {{ isLoading }} {{ isFinished }} {{ items }} -->
    <AppLoading v-if="isLoading" />
    <AppError v-else-if="error" :message="error.message"></AppError>
    <div v-else class="row g-3">
      <table class="table table-striped table-bordered">
        <colgroup>
          <col>
          <col>
          <col>
          <col>
        </colgroup>
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>{{ $t("list.subject") }}</th><!--제목-->
            <th>{{ $t("list.author") }}</th><!--작성자-->
            <th>{{ $t("list.created") }}</th><!--작성일-->
          </tr>
        </thead>
        <tbody v-if="items">
          <tr v-for="item in items" :key="item">
            <td><span role="button" @click="goPage(item.id)">{{ item.id }}</span></td>
            <td>{{ item.title }}</td>
            <td>{{ item.author }}</td>
            <td>{{ $dayjs(item.created_at).format('YYYY.MM.DD HH:mm') }}</td>
          </tr>
        </tbody>
      </table>
      <div class="row g-2">
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="create">Write</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useRouter } from 'vue-router';
import { axiosInstance } from '@/api'
const router = useRouter()

const { data, isLoading, error } = useAxios(`/api/board/v1/posts/list`,
  {
    method: 'post',
    data: { search_term: '' },
  }, axiosInstance, { immediate: true }
)

const items = computed(() => data.value.body.items ? data.value.body.items : null)
const totalCount = computed(() => data.value.body.total_count)

const create = () => {
  router.push({
    name: 'Create'
  })
}

const goPage = (id) => {
  router.push({
    name: 'Detail',
    params: { id },
    // query: {
    //   searchText: 'hello'
    // },
    // hash: '#world!'
  })
}
</script>

<style scoped>
table {
  width: 100%;
  /* 테이블 전체 너비를 100%로 설정 */
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dee2e6;
  /* 테두리 */
  padding: 10px;
  text-align: center;
}

th:nth-child(2),
td:nth-child(2) {
  text-align: left;
}

colgroup col:nth-child(1) {
  width: 5%;
  /* 첫 번째 컬럼: 5% */
}

colgroup col:nth-child(2) {
  width: 70%;
  /* 두 번째 컬럼: 70% */
}

colgroup col:nth-child(3) {
  width: 10%;
  /* 세 번째 컬럼: 10% */
}

colgroup col:nth-child(4) {
  width: 15%;
  /* 네 번째 컬럼: 15% */
}
</style>
