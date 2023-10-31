import { z } from "astro:content";

export const StorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  full_slug: z.string(),
  published_at: z.string(),
  content: z.object({
    title: z.string(),
    image: z.object({
      filename: z.string(),
    }),
    description: z.string(),
  }),
});

export const StoryblokDataSchema = z.object({
  stories: z.array(StorySchema),
});

const PostSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
  slug: z.string(),
  image: z.string(),
  navId: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
