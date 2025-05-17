export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('user_token');

  // If the user is not logged in and trying to access a protected route
  if (!token && to.path !== '/login') {
    return navigateTo('/login');
  }

  // If the user is logged in and trying to access the login page, redirect to index
  if (token && to.path === '/login') {
    return navigateTo('/');
  }
});