import { defineConfig } from 'tinacms';

const articleFields = [
  { type: 'string', name: 'title', label: 'Title', required: true, isTitle: true },
  { type: 'string', name: 'description', label: 'Description', required: true },
  { type: 'datetime', name: 'publishedAt', label: 'Published At', required: true },
  { type: 'datetime', name: 'updatedAt', label: 'Updated At' },
  {
    type: 'string',
    name: 'category',
    label: 'Category',
    required: true,
    options: ['news', 'recipe'],
  },
  { type: 'string', name: 'author', label: 'Author' },
  { type: 'image', name: 'cover', label: 'Cover Image' },
  { type: 'string', name: 'tags', label: 'Tags', list: true },
  { type: 'boolean', name: 'draft', label: 'Draft' },
  { type: 'number', name: 'cookTime', label: 'Cook Time (min) — recipe only' },
  { type: 'number', name: 'servings', label: 'Servings — recipe only' },
  {
    type: 'string',
    name: 'difficulty',
    label: 'Difficulty — recipe only',
    options: ['easy', 'medium', 'hard'],
  },
  { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
] as const;

export default defineConfig({
  branch: 'main',
  clientId: null,
  token: null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'articles_en',
        label: 'Articles (English)',
        path: 'src/content/articles/en',
        format: 'md',
        fields: articleFields as any,
      },
      {
        name: 'articles_ko',
        label: 'Articles (Korean)',
        path: 'src/content/articles/ko',
        format: 'md',
        fields: articleFields as any,
      },
    ],
  },
});
