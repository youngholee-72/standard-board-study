<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">BP365 Board-Standard</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/about">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/posts">Posts</RouterLink>
            </li>
          </ul>
          <form class="d-flex gap-2" role="search">
            <select v-model="$i18n.locale" id="locale" class="form-select form-select-sm"
              aria-label="Small select example">
              <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">{{ locale }}</option>
            </select>
            <button class="btn btn-outline-primary" to="/login">Login</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
