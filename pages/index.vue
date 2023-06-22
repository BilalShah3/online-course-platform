<template>
    <div>
      <Section class="space-y-6 flex flex-col items-center">
        <h1 class="text-4xl font-black text-blue-500 m-0 p-0">
          {{ course.title }}
        </h1>
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
        <img
          alt="screenshot"
          :src="screenshots[0]"
          class="w-full rounded-lg shadow-lg border-2 border-slate-200"
        />
        <div class="text-2xl font-medium">
          Learn how to use TypeScript in your Vue projects to supercharge your IDE's
          error detection and autocompletion, as well as provide type safe code
          that's easier to reason about and refactor.
        </div>

	   </Section>
  </div>
</template>
  
<script setup lang="ts">
import screen1 from "~/assets/images/screen1.png";

const course = await useCourse()
const firstLesson = await useFirstLesson()
const screenshots = [ screen1]
definePageMeta({
	layout: false,
})
</script>