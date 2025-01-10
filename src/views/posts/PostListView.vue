<template>
  <div>
    <h2>게시글 목록</h2>
    <form @submit.prevent>
      <div class="row g-3">
        <input type="text" v-model="params.search_keyword" class="form-control" />
      </div>
    </form>
    <hr class="my-4" />
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

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: !(params.page_number > 1) }"><a class="page-link" href="#"
              @click.prevent="--params.page_number">Previous</a></li>
          <li v-for="page in pageCount" :key="page" class="page-item" :class="{ active: params.page_number === page }">
            <a class="page-link" href="#" @click.prevent="params.page_number = page">{{ page
              }}</a>
          </li>
          <li class="page-item" :class="{ disabled: !(params.page_number < pageCount) }"><a class="page-link" href="#"
              @click.prevent="++params.page_number">Next</a>
          </li>
        </ul>
      </nav>

      <div class="row g-2">
        <div class="col-auto">
          <button class="btn btn-outline-dark" @click="create">Write</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from '@/api/posts';

const router = useRouter()
const items = ref([])
const totalCount = ref(0)
const pageCount = computed(() => Math.ceil(totalCount.value / params.value.page_size))

const params = ref({
  page_number: 1,
  page_size: 5,
  search_keyword: '',
  search_option: 'ALL'
})

const fetchPosts = async () => {
  try {
    const { data } = await getPosts(params.value);
    items.value = data.body.items
    totalCount.value = data.body.total_count
  } catch (error) {
    console.error(error)
  }
}
watchEffect(fetchPosts)

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
