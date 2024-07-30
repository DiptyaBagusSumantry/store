<template>
  <div>
    <div id="pdf-ticket-2">
      <layout-pdf pageTitle="e-Ticket">
        <template #content>
          <div class="title-event font-weight-bolder text-black mb-2">
            Tata cara mengikuti event
          </div>
          <div>
            <ul>
              <li>
                Peserta akan mendapatkan konfirmasi dan akses link menuju online event melalui e-ticket yang dikirimkan ke email terdaftar dan pada menu Ticket Event di akun Widya milik peserta.
              </li>
              <li>
                Pastikan device dan koneksi internet yang dimiliki stabil dan sesuai dengan ketentuan penyelenggara
              </li>
              <li>
                Pastikan Anda telah mengunduh aplikasi yang akan digunakan sebagai media online event oleh penyelenggara
              </li>
              <li>
                Untuk online event yang bersifat interaktif dengan penyelenggara, pastikan kamera dan mikrofon device berfungsi dengan baik
              </li>
              <li>
                Peserta diharapkan memasuki online event dalam kondisi mikrofon dimatikan (mute) agar acara berjalan kondusif, kecuali saat diperlukan.
              </li>
              <li>
                Peserta diminta untuk mematuhi aturan penyelenggara dalam mengikuti online event.
              </li>
              <li>
                Jangan pernah memberikan link online event yang ada di e-ticket Anda kepada siapapun.
              </li>
            </ul>
          </div>
        </template>
      </layout-pdf>
    </div>
  </div>
</template>

<script>
import { BImg } from 'bootstrap-vue'

import LayoutPdf from '@/layouts/LayoutPDF.vue'

export default {
  components: {
    BImg,

    LayoutPdf,
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

#pdf-ticket-2 {
  li {
    color: black;
    font-size: 18px;
  }
}
</style>