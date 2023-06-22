import { ChapterOutline, LessonOutline } from './../course/meta.get'
import { PrismaClient } from '@prisma/client'
import protectRoute from '~/server/utils/protectRoute'
import { ChapterProgress, CourseProgress } from '~/types/course'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  //Trow a 401 if there is not user logged in 
  protectRoute(event)
 
  //Get the user email from the supabase user if there is one
  const {user:{email: userEmail} } = event.context
  //Get the progress from DB
  const userProgress = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
      //we only wnt to get the progress for the first course right now
      Lesson: {
        Chapter: {
          Course: {
            id: 1
          }
        }
      }
    },
    select: {
      completed: true,
      Lesson: {
        select: {
          slug: true,
          Chapter: {
            select: {
              slug: true
            }
          }
        }
      }
    }
  })
  
  //Get course outline from meta endpoint
  const CourseOutline = await $fetch('/api/course/meta')

  if (!CourseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course metadata not found'
    })
  }
  
  //Use the courseoutline and user progress to create a nested object 
  //with the progress of each lesson
  const progress = CourseOutline.chapters.reduce((courseProgress: CourseProgress, chapter: ChapterOutline) => {
    //Collect the progress for each chapter in the course
    courseProgress[chapter.slug] = chapter.lessons.reduce((chapterProgress: ChapterProgress, lesson: LessonOutline) => {
        // collect the progress for each lesson in the chapter
      chapterProgress[lesson.slug] = userProgress.find(progress => (
        progress.Lesson.slug === lesson.slug && progress.Lesson.Chapter.slug === chapter.slug
      ))?.completed || false

      return chapterProgress
    }, {})

    return courseProgress
  }, {})
   
  return progress
})