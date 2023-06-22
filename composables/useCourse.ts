import { CourseOutline } from './../server/api/course/meta.get'
import  useFetchWithCache from './useFetchWithCache'


export default async () =>
  useFetchWithCache<CourseOutline>('/api/course/meta')



// export const useCourse = (): Course => {
//   const chapters: Chapter[] = courseData.chapters.map(
//     (chapter: Chapter) => {
//       const lessons: LessonWithPath[] = chapter.lessons.map(
//         (lesson: Lesson) => ({
//           ...lesson,
//           path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
//         })
//       )
//       return {
//         ...chapter,
//         lessons,
//       }
//     }
//   )
//   return {
//     ...courseData,
//     chapters,
//   }
// }


// export const useCourse = () => {
//   return {
//     ...courseData,
//     chapters: courseData.chapters.map((chapter)=>({
//       ...chapter,
//       lessons: chapter.lessons.map((lesson)=>({
//         ...lesson,
//         path:`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
//       }))
//     }))
//   }
// }
