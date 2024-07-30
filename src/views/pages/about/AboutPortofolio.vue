<template>
<div id="portofolio-section">
  <h1 class="font-weight-bolder mx-auto section-title">
    Portofolio
  </h1>
  <about-portofolio-item-1 />
  <about-portofolio-item-2 />
  <about-portofolio-item-3 />
</div>
</template>

<script>
import AboutPortofolioItem1 from './AboutPortofolioItem1.vue'
import AboutPortofolioItem2 from './AboutPortofolioItem2.vue'
import AboutPortofolioItem3 from './AboutPortofolioItem3.vue'

export default {
	components: {
    AboutPortofolioItem1,
    AboutPortofolioItem2,
    AboutPortofolioItem3,
  },
}
</script>