<template>
  <div>
    <b-card-title title-tag="h2" class="font-weight-bolder mb-2">
      Masuk
    </b-card-title>

    <!-- form -->
    <validation-observer ref="loginForm" #default="{ invalid }">
      <b-form class="auth-login-form mt-2" @submit.prevent="login">
        <!-- email -->
        <b-form-group label="Email" label-for="login-email">
          <validation-provider
            #default="{ errors }"
            name="email"
            vid="email"
            rules="required|email"
          >
            <b-form-input
              id="login-email"
              v-model="userEmail"
              :state="errors.length > 0 ? false : null"
              name="login-email"
              placeholder="Masukkan email"
              :formatter="(value) => value.toLowerCase()"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- password -->
        <b-form-group
          label="Password"
          label-for="login-password"
          class="mt-lg-2"
        >
          <validation-provider
            #default="{ errors }"
            name="password"
            vid="password"
            rules="required"
          >
            <b-input-group
              class="input-group-merge"
              :class="errors.length > 0 ? 'is-invalid' : null"
            >
              <b-form-input
                id="login-password"
                v-model="password"
                :state="errors.length > 0 ? false : null"
                class="form-control-merge"
                :type="passwordFieldType"
                name="login-password"
                placeholder="Masukkan password"
                autocomplete="off"
              />
              <b-input-group-append is-text>
                <feather-icon
                  class="cursor-pointer"
                  :icon="passwordToggleIcon"
                  @click="togglePasswordVisibility"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-alert
          v-height-fade.appear
          variant="danger"
          :show="dismissCountDown"
          class="auth-login-alert mt-lg-2"
        >
          <div class="alert-body">
            <p>
              Terlalu banyak percobaan masuk. Silakan mencoba kembali dalam
              {{ dismissSecs }} detik.
            </p>
          </div>
        </b-alert>

        <div class="d-flex justify-content-between mt-2 mt-lg-3 mb-1">
          <!-- checkbox -->
          <b-form-checkbox
            id="remember-me"
            v-model="rememberMe"
            name="checkbox-1"
          >
            Ingat saya
          </b-form-checkbox>

          <b-link :to="{ name: 'auth-forgot-password' }">
            <span
              class="text-primary font-weight-bolder"
              style="text-decoration: underline"
              >Lupa Password</span
            >
          </b-link>
        </div>

        <!-- submit buttons and count down -->
        <b-button
          :disabled="dismissCountDown > 0 || invalid"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          :variant="`${dismissCountDown === 0 ? 'gradient' : 'flat'}-primary`"
          block
          class="font-weight-bold mt-lg-2"
          :class="{ active: dismissCountDown > 0 }"
        >
          <span v-if="dismissCountDown"
            >00:{{
              dismissCountDown >= 10 ? dismissCountDown : `0${dismissCountDown}`
            }}</span
          >
          <span v-else-if="!isLoading">Masuk</span>
          <b-spinner v-else small type="grow" variant="white" />
        </b-button>
      </b-form>
    </validation-observer>

    <!-- divider -->
    <div class="divider my-2 my-lg-3">
      <div class="divider-text">atau Masuk dengan</div>
    </div>

    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="outline-secondary"
      block
      @click="loginWithFacebook"
    >
      <b-img
        :src="require('@/assets/images/icons/facebook.svg')"
        alt="facebook-icon"
        width="20"
        class="mr-50"
      />
      <span class="align-middle font-weight-normal">Masuk dengan Facebook</span>
    </b-button>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BLink,
  BImg,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BForm,
  BButton,
  BAlert,
  BSpinner,
} from "bootstrap-vue";
import {
  setCookie,
  initLogin,
  handleRedirectURI,
  isUserVerified,
} from "@/auth/utils";
import useJwt from "@/auth/jwt/useJwt";
import axios from "@axios";
import { heightFade } from "@core/directives/animations";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BLink,
    BImg,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BForm,
    BButton,
    BAlert,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    ToastificationContent,
  },
  directives: {
    "height-fade": heightFade,
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      rememberMe: true,
      password: "",
      userEmail: "",
      // validation rules
      required,
      email,

      dismissSecs: 30,
      dismissCountDown: 0,

      // Loading button
      isLoading: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeOffIcon" : "EyeIcon";
    },
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          useJwt
            .login({
              email: this.userEmail,
              password: this.password,
            })
            .then(async (response) => {
              localStorage.removeItem("authLoginInfo");

              const { user: userData, token: accessToken } = response.data;
              await initLogin(userData, accessToken, this.rememberMe);
              // Navigate User to homepage or redirect to other app
              const { currentRoute } = this.$router;
              if (currentRoute.query.redirect_uri && isUserVerified()) {
              handleRedirectURI(currentRoute);
              } else
              his.$router.push(currentRoute.query.to || { name: "beranda" });
            })
            .catch((error) => {
              const {
                data: errorData,
                statusText: errorStatus,
                headers: responseHeaders,
              } = error.response;
              if (errorData) {
                const { error: validationErrors, code } = errorData;
                if (code === "too_many_login_attempts") {
                  const countdownSecs = parseInt(
                    errorData.message.match(/\d+/)[0]
                  );
                  // Set the date we're counting down to
                  const countDownEndAt = new Date(
                    new Date(responseHeaders.date).getTime() +
                      countdownSecs * 1000
                  );
                  // Store data in localStorage
                  localStorage.setItem(
                    "authLoginInfo",
                    JSON.stringify({
                      countDownEndAt,
                      isResendLinkCooldown: true,
                    })
                  );

                  this.setCountDown(countDownEndAt);
                  return;
                }
                if (validationErrors) {
                  this.$refs.loginForm.setErrors(validationErrors);
                  return;
                }
              }

              this.$toast({
                component: ToastificationContent,
                props: {
                  title: errorStatus,
                  icon: "AlertCircleIcon",
                  variant: "danger",
                  text: errorData.detail || errorData.message || errorData,
                },
              });
            })
            .finally(() => (this.isLoading = false));
        }
      });
    },
    loginWithFacebook() {
      axios
        .get("auth/facebook/", { params: this.$route.query })
        .then((response) => {
          const { redirect_url } = response.data;

          const expDays = this.rememberMe ? 1 : null;
          setCookie("loginstatus", "loggedin", expDays);

          window.location.replace(redirect_url);
        });
    },
    getAuthLoginInfo() {
      const defaultInfo = {
        countDownEndAt: null,
        isLoginAttemptCooldown: false,
      };
      return JSON.parse(localStorage.getItem("authLoginInfo")) || defaultInfo;
    },
    setCountDown(countDownEndAt) {
      if (countDownEndAt) {
        const getDistanceInSecs = () => {
          // Get today's date and time
          const now = new Date().getTime();
          return Math.floor(
            ((new Date(countDownEndAt).getTime() - now) % (1000 * 60)) / 1000
          );
        };

        // Find the distance between now and the count down date
        const distance = getDistanceInSecs();

        // If the count down is finished, remove localStorage (break)
        if (distance < 0) {
          localStorage.removeItem("authLoginInfo");
          return;
        }

        // Update alert message
        this.dismissSecs = distance;

        // Start count down
        this.dismissCountDown = distance;

        // Update the count down every 1 second
        const dismiss = setInterval(() => {
          // Find the distance between now and the count down date
          const distance = getDistanceInSecs();

          // If the count down is finished, remove localStorage and clear count down (break)
          if (this.dismissCountDown <= 0) {
            localStorage.removeItem("authLoginInfo");
            clearInterval(dismiss);
          } else {
            // Time calculations in seconds
            this.dismissCountDown = distance;
          }
        }, 1000);
      }
    },
  },
  created() {
    const { countDownEndAt, isLoginAttemptCooldown } = this.getAuthLoginInfo();
    if (isLoginAttemptCooldown) {
      this.setCountDown(countDownEndAt);
    }
  },
};
</script>
<style lang="scss">
@import "~@core/scss/base//bootstrap-extended/_variables.scss";
.auth-login-alert.alert {
  border: 1px solid;
  border-radius: 6px;
  // For Alert Content
  p {
    font-weight: 400;
    font-size: $small-font-size;
    padding: 0 !important;
  }
}
</style>
