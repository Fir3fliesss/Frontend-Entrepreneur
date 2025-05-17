export default defineNuxtRouteMiddleware((to, from) => {
  let token = null;
  let userType = null;
  if (process.client) {
    token = localStorage.getItem('token');
    userType = localStorage.getItem('userType');
  }

  // protected routes
  const publicPages = ['/login-student', '/login-company'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !token) {
    return navigateTo('/login-student');
  }

  // Redirect authenticated users from login pages to their dashboard
  if (token && publicPages.includes(to.path)) {
    if (userType === 'student') {
      return navigateTo('/student-dashboard');
    } else if (userType === 'company') {
      return navigateTo('/company-dashboard');
    } else {
      // Handle cases where token exists but userType is missing or invalid
      // Maybe clear localStorage and redirect to login
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
      }
      return navigateTo('/login-student');
    }
  }

  // Allow access to protected routes if token exists
  if (token && authRequired) {
    return;
  }
});
