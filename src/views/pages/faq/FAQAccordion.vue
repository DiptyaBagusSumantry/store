<template>
  <app-collapse
    class="card-faq"
    accordion
    type="margin"
    icon-arrow="label"
  >
    <app-collapse-item
      v-for="(item, index) in accordion" :key="index"
      :title="item.title"
      class="mt-1"
    >
      <span>{{ item.description }}</span>
    </app-collapse-item>
  </app-collapse>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'

export default {
  props: ['accordion'],
  components: {
    AppCollapse,
    AppCollapseItem,
  },
}
</script>