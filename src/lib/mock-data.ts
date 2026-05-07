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
  instructions?: string;
  requirements?: string[];
  starterCode?: string;
};

export type Classwork = {
  id: string;
  lessonId: string;
  title: string;
  instructions: string;
  requirements: string[];
  starterCode: string;
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
  {
    id: "as_html_1",
    courseSlug: "html-beginner",
    title: "My Favorite Animal Page",
    instructions:
      "Create a webpage about your favorite animal. Add a heading, an image with alt text, and a link to learn more.",
    requirements: [
      "Add a main heading (h1)",
      "Add an image (img) with alt text",
      "Add at least one paragraph (p)",
      "Add a link (a) with href",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title>My Favorite Animal</title>
  </head>
  <body>
  </body>
</html>`,
  },
  {
    id: "as_html_2",
    courseSlug: "html-beginner",
    title: "All About Me Page",
    instructions:
      "Create an About Me page with headings and paragraphs. Keep it clear and friendly!",
    requirements: [
      "Add one main heading (h1)",
      "Add at least one smaller heading (h2)",
      "Add at least two paragraphs (p)",
      "Make sure your text is not empty",
    ],
    starterCode: `<h1>About Me</h1>
<h2>My Story</h2>
<p></p>
<p></p>`,
  },
  {
    id: "as_css_1",
    courseSlug: "css-beginner",
    title: "Superhero Profile Page",
    instructions:
      "Create a superhero profile page and style it with CSS. Make it bold and readable.",
    requirements: [
      "Style the heading (color/size/alignment)",
      "Style a paragraph (color and font-family)",
      "Add a bordered container with padding",
      "Use a background color",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title>Superhero Profile</title>
  </head>
  <body>
    <h1 style=""></h1>
    <p style=""></p>
    <div class="container" style="">
    </div>
  </body>
</html>`,
  },
  {
    id: "as_css_2",
    courseSlug: "css-beginner",
    title: "My Dream Bedroom",
    instructions:
      "Describe your dream bedroom and style it with soft colors, borders, and spacing.",
    requirements: [
      "Add a heading (h1) and paragraph (p)",
      "Use at least one background color",
      "Add a border around content",
      "Add spacing with padding and margin",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title>My Dream Bedroom</title>
  </head>
  <body style="">
    <div class="container" style="">
      <h1 style=""></h1>
      <p style=""></p>
    </div>
  </body>
</html>`,
  },
];

export const mockClassworks: Classwork[] = [
  {
    id: "cw_html_1",
    lessonId: "lesson_html_1",
    title: "Create your first webpage.",
    instructions:
      "Create a basic HTML page with a title and some text in the body.",
    requirements: [
      "Add a page title (title tag)",
      "Add your name inside the body",
      "Add one sentence about yourself",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title></title>
  </head>
  <body>
  </body>
</html>`,
  },
  {
    id: "cw_html_2",
    lessonId: "lesson_html_2",
    title: "Create an About Me page.",
    instructions: "Use headings and paragraphs to write a simple About Me page.",
    requirements: [
      "Add one main heading (h1)",
      "Add one smaller heading (h2)",
      "Add two paragraphs (p) about yourself",
    ],
    starterCode: `<h1></h1>
<h2></h2>
<p></p>
<p></p>`,
  },
  {
    id: "cw_html_3",
    lessonId: "lesson_html_3",
    title: "Create a favorite animal page.",
    instructions: "Add a heading, an image, a paragraph, and a link.",
    requirements: [
      "Add a heading (h1)",
      "Add an image (img)",
      "Add image alt text (alt)",
      "Add a paragraph (p)",
      "Add a link (a) with href",
    ],
    starterCode: `<h1></h1>
<img src="" alt="" />
<p></p>
<a href=""></a>`,
  },
  {
    id: "cw_html_4",
    lessonId: "lesson_html_4",
    title: "Create a My Favorites page.",
    instructions:
      "Create a page with an unordered list and an ordered list.",
    requirements: [
      "Add a heading (h1)",
      "Add an unordered list (ul) of 3 favorite foods",
      "Add an ordered list (ol) of 3 morning steps",
    ],
    starterCode: `<h1></h1>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
<ol>
  <li></li>
  <li></li>
  <li></li>
</ol>`,
  },
  {
    id: "cw_html_5",
    lessonId: "lesson_html_5",
    title: "Build a mini profile page.",
    instructions:
      "Build a mini profile page that combines the HTML elements you learned.",
    requirements: [
      "Add a title (title tag)",
      "Add your name as the main heading (h1)",
      "Add a paragraph (p) about yourself",
      "Add an image (img) with alt text",
      "Add a list (ul or ol) of 3 hobbies",
      "Add a link (a) with href",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <h1></h1>
    <p></p>
    <img src="" alt="" />
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <a href=""></a>
  </body>
</html>`,
  },
  {
    id: "cw_css_1",
    lessonId: "lesson_css_1",
    title: "Create a colorful webpage.",
    instructions:
      "Add inline CSS styles to make your heading and paragraph colorful.",
    requirements: [
      "Add a heading (h1)",
      "Change the heading color",
      "Add a paragraph (p)",
      "Change the paragraph background color",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title>Colorful Page</title>
  </head>
  <body>
    <h1 style=""></h1>
    <p style=""></p>
  </body>
</html>`,
  },
  {
    id: "cw_css_2",
    lessonId: "lesson_css_2",
    title: "Style an About Me page.",
    instructions: "Use CSS text styles to make your page look polished.",
    requirements: [
      "Change the heading font-size",
      "Center the heading (text-align)",
      "Change paragraph text color",
      "Use a different font-family",
    ],
    starterCode: `<h1 style=""></h1>
<p style=""></p>`,
  },
  {
    id: "cw_css_3",
    lessonId: "lesson_css_3",
    title: "Create a profile card.",
    instructions: "Style a card using border, padding, margin, and width.",
    requirements: ["Add a border", "Add padding", "Add margin", "Set a width"],
    starterCode: `<div class="card" style="">
  <h1></h1>
  <p></p>
</div>`,
  },
  {
    id: "cw_css_4",
    lessonId: "lesson_css_4",
    title: "Style a favorite animal page.",
    instructions: "Add a background color and style an image.",
    requirements: [
      "Add a background color",
      "Change image width",
      "Add rounded corners (border-radius)",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title>Favorite Animal</title>
  </head>
  <body style="">
    <h1></h1>
    <img src="" alt="" style="" />
    <p></p>
  </body>
</html>`,
  },
  {
    id: "cw_css_5",
    lessonId: "lesson_css_5",
    title: "Build a mini profile webpage.",
    instructions:
      "Build a mini profile webpage with a border, background, and spacing.",
    requirements: [
      "Styled heading",
      "Styled paragraph",
      "Styled image",
      "Border around content",
      "Background color",
      "Proper spacing (padding/margin)",
    ],
    starterCode: `<!doctype html>
<html>
  <head>
    <title>Mini Profile</title>
  </head>
  <body style="">
    <div class="container" style="">
      <h1 style=""></h1>
      <p style=""></p>
      <img src="" alt="" style="" />
    </div>
  </body>
</html>`,
  },
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

export function getClasswork(id: string): Classwork | undefined {
  return mockClassworks.find((c) => c.id === id);
}

