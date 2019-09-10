export const redirectToLogin = () => {
  const { href } = window.location
  window.location.href = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/login?backUrl=${href}`
    : 'http://app.skillhunter.io/login?backUrl=${href}'
}
