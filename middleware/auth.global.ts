export default defineNuxtRouteMiddleware((to, from) => {
  let token = null;
  let userType = null;
  if (process.client) {
    token = localStorage.getItem('token');
    userType = localStorage.getItem('userType');
  }

  // protected routes
  const publicPages = ['/', '/index', '/login-student', '/login-company', '/login-admin'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !token) {
    return navigateTo('/login-student');
  }

  if (token && publicPages.includes(to.path)) {
    if (userType === 'student') {
      return navigateTo('/student-dashboard');
    } else if (userType === 'company') {
      return navigateTo('/company-dashboard');
    } else if (userType === 'admin') {
      return navigateTo('/admin-dashboard');
    } else {
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
      }
      return navigateTo('/login-student');
    }
  }

  if (token && authRequired) {
    return;
  }
});
