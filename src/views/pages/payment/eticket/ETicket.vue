<template>
  <div>
    <div v-if="parseInt(page) === 1">
      <e-ticket-page-1 />
      <div class="d-none">
        <vue-html2pdf
          :show-layout="false"
          :float-layout="false"
          :enable-download="true"
          :preview-modal="false"
          :pdf-quality="2"
          :manual-pagination="true"
          pdf-content-width="1440px"
          :html-to-pdf-options="options"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <!-- PDF Content Here -->
            <e-ticket-page-1 />
            <e-ticket-page-2 />
          </section>
        </vue-html2pdf>
      </div>
    </div>
    <e-ticket-page-2 v-else-if="parseInt(page) === 2" />
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import VueHtml2pdf from 'vue-html2pdf'
import ETicketPage1 from './ETicketPage1.vue'
import ETicketPage2 from './ETicketPage2.vue'

export default {
  components: {
    VueHtml2pdf,
    ETicketPage1,
    ETicketPage2,
  },
  data () {
    return {
      options: {
        filename: 'eTicket',
        html2canvas: {
          scale: 2,
          useCORS: true,
          width: 1440,
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          hotfixes: ['px_scaling'],
          orientation: 'portrait'
        }
      }
    }
  },
  methods: {
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    }
  },
  setup(props, context) {
    const { page } = context.root.$route.params

    const generateReport = () => {
      context.refs.html2Pdf.generatePdf()
    }

    onMounted(() => {
      setTimeout(() => generateReport(), 2000)
    })

    return {
      page,
    }
  }
}
</script>

<style lang="scss">
.vue-html2pdf {
  section.content-wrapper {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
