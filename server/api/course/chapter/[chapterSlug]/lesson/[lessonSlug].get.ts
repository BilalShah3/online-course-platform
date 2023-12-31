import { PrismaClient } from '@prisma/client'
import protectRoute from '~/server/utils/protectRoute'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { chapterSlug, lessonSlug } = event.context.params!

  if (chapterSlug !== '1-chapter-1') {
    protectRoute(event)
  }

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug
      }
    }
  })

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found'
    })
  }

  return{
    ...lesson,
    path:`/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  }
})



// import {Course, Chapter, Lesson, LessonWithPath} from '~/types/course'
// import course from '~/server/courseData'

// course as Course

// export default defineEventHandler((event): LessonWithPath => {
//   const { chapterSlug, lessonSlug } = event.context.params
  
//   const chapter: Maybe<Chapter> = course.chapters.find(
//     (chapter) => chapter.slug === chapterSlug
//   )

//   if (!chapter) {
//     throw createError({
//       statusCode: 404,
//       message: 'Chapter not found',
//     })
//   }

//   const lesson: Maybe<Lesson> = chapter.lessons.find(
//     (lesson) => lesson.slug === lessonSlug
//   )

//   if (!lesson) {
//     throw createError({
//       statusCode: 404,
//       message: 'Lesson not found',
//     })
//   }

//   return {
//     ...lesson,
//     path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
//   }
// })
  