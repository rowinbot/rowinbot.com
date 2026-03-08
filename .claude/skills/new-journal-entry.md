# Skill: Create a New Journal Entry

Use this skill when the user asks to create a new blog/journal post.

## Steps

1. **Create the MDX file** at `content/journal/<slug>/index.mdx`:

```mdx
---
title: "Entry Title"
date: "DD/MM/YYYY"
tags: ["tag1", "tag2"]
imageAlt: "Description of the cover image"
imageCredit: "Artist Name"
---

Content goes here in MDX format.

## Subheading

More content...
```

2. **Add a cover image** (optional): Place it in `content/journal/<slug>/` alongside the MDX file. Reference it in frontmatter with `imageSrc: "./image-filename.jpg"`.

3. **Run the content builder** to generate the JSON output:
   ```sh
   npm run content:watch
   ```
   The builder will:
   - Bundle the MDX
   - Generate blur data URLs for images
   - Generate OG images
   - Update the journal index

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Entry title |
| `date` | Yes | Date in DD/MM/YYYY format |
| `tags` | Yes | Array of tag strings |
| `imageSrc` | No | Relative path to cover image |
| `imageAlt` | No | Alt text for cover image (required if imageSrc set) |
| `imageCredit` | No | Image credit/artist name |

## Notes

- The content builder hashes content to avoid unnecessary rebuilds
- Images are served from `/build/journal/<slug>/` via the Express server
- OG images are auto-generated to `content/build/og/<slug>.png`
- After upgrading React, rebuild content: `rm -rf content/build && npm run content:watch`
