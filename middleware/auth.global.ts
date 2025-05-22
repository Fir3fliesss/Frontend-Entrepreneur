export default defineNuxtRouteMiddleware((to, from) => {
  let token = null;
  let userType = null;
  if (process.client) {
    token = localStorage.getItem('token');
    userType = localStorage.getItem('userType');
  }

  const dashboardPages = ['/student-dashboard', '/company-dashboard', '/admin-dashboard'];
  const dashboardRequired = dashboardPages.includes(to.path);

  if (dashboardRequired && !token) {
    return navigateTo('/');
  }

  if (to.path === '/admin-dashboard' && userType !== 'admin') {
    return navigateTo('/login-admin');
  }
  if (to.path === '/company-dashboard' && userType !== 'company') {
    return navigateTo('/login-company');
  }
  if (to.path === '/student-dashboard' && userType !== 'student') {
    return navigateTo('/login-student');
  }

});
