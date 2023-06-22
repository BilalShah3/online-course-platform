export default defineNuxtRouteMiddleware(async (to, from) => {
  const snackbar = useSnackbar();
  const user = useSupabaseUser()
  const check = ref(true)
  const { data: hasAccess } = await useFetch(
    '/api/user/hasAccess',
    {
      headers: useRequestHeaders(['cookie']),
    }
  )
  if (user.value||to.params.chapterSlug === '1-chapter-1') {
       check.value=false
  } 
  if(!user.value && to.params.chapterSlug !== '1-chapter-1'){
      snackbar.add({
        title:'Login with Github',
        type: 'error',
        text: 'So We can verify that you acctually have access to the course'
    })
      check.value=true
  }
  if (user.value && !hasAccess.value && to.params.chapterSlug !== '1-chapter-1') {
    // Prevent logging in with Github if user has not purchased course
    snackbar.add({
      title:'Buy The Course',
      type: 'error',
      text: 'You don,t have access to these recourses. Go to Buy page or First Chapter'
  })
    const client = useSupabaseClient()
    await client.auth.signOut()
    check.value=true
  }
  if(check.value){
    return navigateTo(`/login?redirectTo=${to.path}`)
 }

})