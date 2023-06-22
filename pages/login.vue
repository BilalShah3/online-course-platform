<template>
    <div class="prose w-full max-w-2xl h-9">
      <h1>Log in to {{ course.title }}</h1>
      <div class="flex space-x-4 align-baseline">
      <button
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        @click="login"
      >
        Log in with Github
      </button>
      <NuxtLink
           class="underline font-bold"
           :href="firstLesson.path"
          >
            Go to first chapter (Free)
         </NuxtLink>
         <h1 class="text-xl font-black text-blue-500 m-0 p-0">
                  OR
         </h1>
         <NuxtLink
           class="underline font-bold"
            to="/landing"
          >
            Buy the course
         </NuxtLink>
        </div>
    </div>
</template>
  
<script setup lang="ts">
const firstLesson = await useFirstLesson()
const course = await useCourse()
const { query } = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true,
    })
  }
})

const login = async () => {
  const redirectTo = `${window.location.origin}${query.redirectTo}`
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  })
  if (error) {
    console.error(error)
  }
  
}

</script>