export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

export type Lesson = {
  id: string;
  courseSlug: string;
  slug: string;
  title: string;
  goal: string;
  explanation: string;
  exampleCode?: string;
  classworkId?: string;
};

export type Assignment = {
  id: string;
  courseSlug: string;
  title: string;
};

export const mockCourses: Course[] = [
  {
    id: "course_html",
    title: "HTML Beginner",
    slug: "html-beginner",
    description: "Learn the building blocks of webpages using HTML.",
  },
  {
    id: "course_css",
    title: "CSS Beginner",
    slug: "css-beginner",
    description: "Make your pages colorful and stylish with CSS.",
  },
];

export const mockLessons: Lesson[] = [
  {
    id: "lesson_html_1",
    courseSlug: "html-beginner",
    slug: "what-is-html",
    title: "What Is HTML?",
    goal: "Learn what HTML is and what a webpage is.",
    explanation:
      "HTML is a language that tells a browser what to show on a webpage. It uses tags like html, head, title, and body.",
    exampleCode: "<!doctype html>\\n<html>\\n  <head>\\n    <title>My Page</title>\\n  </head>\\n  <body>Hi!</body>\\n</html>",
    classworkId: "cw_html_1",
  },
  {
    id: "lesson_html_2",
    courseSlug: "html-beginner",
    slug: "headings-and-paragraphs",
    title: "Headings and Paragraphs",
    goal: "Use headings and paragraphs to organize content.",
    explanation: "Headings help organize. Paragraphs hold your sentences.",
    classworkId: "cw_html_2",
  },
  {
    id: "lesson_css_1",
    courseSlug: "css-beginner",
    slug: "what-is-css",
    title: "What Is CSS?",
    goal: "Learn how CSS styles HTML.",
    explanation: "CSS controls colors, spacing, and fonts. It makes pages look fun!",
    classworkId: "cw_css_1",
  },
];

export const mockAssignments: Assignment[] = [
  { id: "as_html_1", courseSlug: "html-beginner", title: "My Favorite Animal Page" },
  { id: "as_html_2", courseSlug: "html-beginner", title: "All About Me Page" },
  { id: "as_css_1", courseSlug: "css-beginner", title: "Superhero Profile Page" },
  { id: "as_css_2", courseSlug: "css-beginner", title: "My Dream Bedroom" },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return mockCourses.find((c) => c.slug === slug);
}

export function getLessonsForCourse(courseSlug: string): Lesson[] {
  return mockLessons.filter((l) => l.courseSlug === courseSlug);
}

export function getLesson(courseSlug: string, lessonSlug: string): Lesson | undefined {
  return mockLessons.find((l) => l.courseSlug === courseSlug && l.slug === lessonSlug);
}

export function getAssignment(id: string): Assignment | undefined {
  return mockAssignments.find((a) => a.id === id);
}

