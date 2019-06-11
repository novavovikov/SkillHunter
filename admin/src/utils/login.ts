export const redirectToLogin = () => {
  window.location.href = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/login'
    : 'http://app.skillhunter.io/login'
}
