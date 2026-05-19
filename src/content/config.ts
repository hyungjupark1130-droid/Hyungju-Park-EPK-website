import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number(),
    type: z.enum(['Original', 'Production', 'Arrangement', 'Engineering', 'Score']),
    role: z.string().optional(),
    cover: z.string().optional(),
    audio: z.string().optional(),
    video_url: z.string().optional(),
    external_links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional().default([]),
    credits: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

const about = defineCollection({
  type: 'data',
  schema: z.object({
    short_bio: z.string(),
    long_bio: z.string(),
    portrait: z.string().optional(),
    currently: z.string(),
    credits_recording: z.array(z.object({
      project: z.string(),
      role: z.string(),
      year: z.number(),
    })).default([]),
    cv: z.array(z.object({
      institution: z.string(),
      program: z.string(),
      years: z.string(),
    })).default([]),
    recent_works: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      url: z.string().optional(),
      year: z.number().optional(),
    })).default([]),
  }),
});

const settings = defineCollection({
  type: 'data',
  schema: z.object({
    contact_email: z.string(),
    socials: z.array(z.object({
      platform: z.string(),
      url: z.string(),
    })).default([]),
    meta_description: z.string().optional(),
    og_image: z.string().optional(),
  }),
});

export const collections = { works, about, settings };
