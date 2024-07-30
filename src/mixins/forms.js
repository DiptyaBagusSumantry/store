// We haven't added icon's computed property because it makes this mixin coupled with UI
export const togglePasswordVisibilityCustom = {
  data() {
    return {
      passwordFieldType: 'password',
      oldPasswordFieldType: 'password',
      newPasswordFieldType: 'password',
      confirmationPasswordFieldType: 'password',
    }
  },
  methods: {
    togglePasswordVisibilityCustom(val) {
      if (val === 'old') this.oldPasswordFieldType = this.oldPasswordFieldType === 'password' ? 'text' : 'password'
      else if (val === 'new') this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password'
      else if (val === 'confirmation') this.confirmationPasswordFieldType = this.confirmationPasswordFieldType === 'password' ? 'text' : 'password'
      else this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
  },
}

export const _ = null
