import { PrismaClient } from '@prisma/client'

import protectRoute  from '~/server/utils/protectRoute'

const prisma = new PrismaClient()

// Endpoint that updates the progress of the lesson
export default defineEventHandler(async (event) => {
  // Only allow PUT, PATCH, or POST requests
  assertMethod(event, ['PUT', 'PATCH', 'POST'])
  
  //Throw a 401 if there is no user logged in.
  protectRoute(event)
  
  // Get the route params
  const { chapterSlug, lessonSlug } = event.context.params!
  
  // Get the leson from DB
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug
      }
    }
  })
 
  // If a leson doesnot exists throw a 404 error
  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found'
    })
  }
  
  //Get the completed value from the request body and update progress in DB
  //Select based on the chapter and lesson slugs.
  const { completed } = await readBody(event)
 
  // Get user email from the supabase user if there is one.
  const {user:{email: userEmail} } = event.context

  const progress = await prisma.lessonProgress.upsert({
    where: {
      lessonId_userEmail: {
        lessonId: lesson.id,
        userEmail
      }
    },
    update: {
      completed
    },
    create: {
      completed,
      userEmail,
      Lesson: {
        connect: {
          id: lesson.id
        }
      }
    }
  })
  return progress
})