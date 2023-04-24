# @rowinbot Journal

This is a journal of my daily activities. I write about what I did, what I learned, and what I want to do.

I manage every entry in their own file in the `content/journal` directory. I use the title of the entry as the filename in kebab-case.

## Creating a new entry

I'm using MDX to handle my journal entries so it gives me the ability to annotate metadata in the frontmatter, this is the format I'm using for the frontmatter:

```md
---
  title: "Journal Entry Title"
  description: This is an example journal entry
  tags: 
    - Example
  date: 01/01/2023
  imageSrc: /path/to/image.png
  imageAlt: Example image
  imageCredit: "Image Author: Image Credit"
---

Journal entry content directly here.
```
