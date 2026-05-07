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
  orderIndex: number;
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
    orderIndex: 1,
    goal: "Learn what HTML is and what a webpage is.",
    explanation:
      "HTML stands for HyperText Markup Language. It’s the language that tells a browser what to show on a webpage. A webpage is a document your browser reads and displays. Most pages use the same basic structure: html, head (with a title), and body (where your content goes).",
    exampleCode:
      "<!doctype html>\\n<html>\\n  <head>\\n    <title>My First Page</title>\\n  </head>\\n  <body>\\n    Hello!\\n  </body>\\n</html>",
    classworkId: "cw_html_1",
  },
  {
    id: "lesson_html_2",
    courseSlug: "html-beginner",
    slug: "headings-and-paragraphs",
    title: "Headings and Paragraphs",
    orderIndex: 2,
    goal: "Use headings and paragraphs to organize content.",
    explanation:
      "Headings help readers understand what your page is about. Use h1 for the main title and h2 for smaller headings. Use p tags for normal sentences. A clear structure makes your page easier to read.",
    exampleCode:
      "<h1>About Me</h1>\\n<h2>My Hobbies</h2>\\n<p>I like learning new things.</p>\\n<p>I enjoy building webpages.</p>",
    classworkId: "cw_html_2",
  },
  {
    id: "lesson_html_3",
    courseSlug: "html-beginner",
    slug: "images-and-links",
    title: "Images and Links",
    orderIndex: 3,
    goal: "Add an image and a link to your page.",
    explanation:
      "Images use the img tag. The src tells the browser where the image is, and alt describes the image (super important!). Links use the a tag with an href.",
    exampleCode:
      '<h1>My Favorite Animal</h1>\\n<img src="animal.jpg" alt="A cute animal" />\\n<p>This is my favorite animal.</p>\\n<a href="https://example.com">Learn more</a>',
    classworkId: "cw_html_3",
  },
  {
    id: "lesson_html_4",
    courseSlug: "html-beginner",
    slug: "lists",
    title: "Lists",
    orderIndex: 4,
    goal: "Create ordered and unordered lists.",
    explanation:
      "Use ul for bullet lists and ol for numbered lists. Each item goes inside an li tag. Lists are perfect for favorites, steps, and checklists.",
    exampleCode:
      "<h1>My Favorites</h1>\\n<ul>\\n  <li>Pizza</li>\\n  <li>Tacos</li>\\n  <li>Ice cream</li>\\n</ul>\\n<ol>\\n  <li>Wake up</li>\\n  <li>Brush teeth</li>\\n  <li>Eat breakfast</li>\\n</ol>",
    classworkId: "cw_html_4",
  },
  {
    id: "lesson_html_5",
    courseSlug: "html-beginner",
    slug: "building-a-simple-webpage",
    title: "Building a Simple Webpage",
    orderIndex: 5,
    goal: "Combine your skills to build a mini profile page.",
    explanation:
      "Real webpages use lots of elements together. You’ll combine a title, heading, paragraph, image, list, and link to create a mini profile page.",
    exampleCode: `<!doctype html>
<html>
  <head>
    <title>Mini Profile</title>
  </head>
  <body>
    <h1>Your Name</h1>
    <p>Something about you.</p>
    <img src="me.jpg" alt="A photo of me" />
    <ul>
      <li>Hobby 1</li>
      <li>Hobby 2</li>
      <li>Hobby 3</li>
    </ul>
    <a href="https://example.com">My favorite website</a>
  </body>
</html>`,
    classworkId: "cw_html_5",
  },
  {
    id: "lesson_css_1",
    courseSlug: "css-beginner",
    slug: "what-is-css",
    title: "What Is CSS?",
    orderIndex: 1,
    goal: "Learn how CSS styles HTML.",
    explanation:
      "CSS stands for Cascading Style Sheets. CSS controls how your HTML looks: colors, fonts, spacing, and more. You can add CSS in a style attribute, a style tag, or a separate file.",
    exampleCode:
      '<h1 style="color: teal;">Hello CSS!</h1>\\n<p style="background-color: #ffeaa7;">This paragraph has a background.</p>',
    classworkId: "cw_css_1",
  },
  {
    id: "lesson_css_2",
    courseSlug: "css-beginner",
    slug: "fonts-and-text-styling",
    title: "Fonts and Text Styling",
    orderIndex: 2,
    goal: "Style text using font-size, alignment, color, and font-family.",
    explanation:
      "You can make text bigger, center it, change its color, and pick a font. Try mixing font-size, text-align, color, and font-family to make your page feel polished.",
    exampleCode:
      '<h1 style="font-size: 40px; text-align: center;">About Me</h1>\\n<p style="color: #2d3436; font-family: Arial, sans-serif;">Text can be styled!</p>',
    classworkId: "cw_css_2",
  },
  {
    id: "lesson_css_3",
    courseSlug: "css-beginner",
    slug: "borders-and-spacing",
    title: "Borders and Spacing",
    orderIndex: 3,
    goal: "Use border, padding, margin, and width to create a card.",
    explanation:
      "Borders outline an element. Padding adds space inside. Margin adds space outside. Width controls how wide it is. These are super useful for making cards and layouts.",
    exampleCode:
      '<div style="border: 2px solid #0984e3; padding: 16px; margin: 16px; width: 300px;">Profile card</div>',
    classworkId: "cw_css_3",
  },
  {
    id: "lesson_css_4",
    courseSlug: "css-beginner",
    slug: "backgrounds-and-images",
    title: "Backgrounds and Images",
    orderIndex: 4,
    goal: "Add a background color and style an image.",
    explanation:
      "Background colors make sections stand out. Images can be styled too—change width and use border-radius to round the corners.",
    exampleCode:
      '<div style="background-color: #dfe6e9; padding: 16px;">\\n  <img src="animal.jpg" alt="Animal" style="width: 200px; border-radius: 12px;" />\\n</div>',
    classworkId: "cw_css_4",
  },
  {
    id: "lesson_css_5",
    courseSlug: "css-beginner",
    slug: "building-a-simple-styled-webpage",
    title: "Building a Simple Styled Webpage",
    orderIndex: 5,
    goal: "Combine CSS basics to build a mini profile webpage.",
    explanation:
      "Now you’ll mix everything together: text styling, spacing, borders, backgrounds, and image styling. This is how real designs come to life!",
    exampleCode: `<!doctype html>
<html>
  <head>
    <title>Styled Profile</title>
  </head>
  <body style="background-color: #f1f2f6;">
    <div style="border: 2px solid #2d3436; padding: 16px; margin: 24px; background-color: white; width: 360px;">
      <h1 style="text-align: center; color: #6c5ce7;">Your Name</h1>
      <p style="color: #2d3436; font-family: Arial, sans-serif;">A little about me.</p>
      <img src="me.jpg" alt="Me" style="width: 200px; border-radius: 12px;" />
    </div>
  </body>
</html>`,
    classworkId: "cw_css_5",
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
  return mockLessons
    .filter((l) => l.courseSlug === courseSlug)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getLesson(courseSlug: string, lessonSlug: string): Lesson | undefined {
  return mockLessons.find((l) => l.courseSlug === courseSlug && l.slug === lessonSlug);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return mockLessons.find((l) => l.id === lessonId);
}

export function getNextLesson(lessonId: string): Lesson | undefined {
  const current = getLessonById(lessonId);
  if (!current) return undefined;
  const lessons = getLessonsForCourse(current.courseSlug);
  const idx = lessons.findIndex((l) => l.id === lessonId);
  return idx >= 0 ? lessons[idx + 1] : undefined;
}

export function getAssignmentsForCourse(courseSlug: string): Assignment[] {
  return mockAssignments.filter((a) => a.courseSlug === courseSlug);
}

export function getAssignment(id: string): Assignment | undefined {
  return mockAssignments.find((a) => a.id === id);
}

