import { fileURLToPath } from 'node:url'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// This file declares the *shape* of every editable content file, and wires
// each collection to its folder under /website-content — the one folder a
// non-coder should ever need to open (see website-content/README.md and the
// root README.md). This file itself lives under website-settings/ with the
// rest of the app code and is not meant to be touched to edit text, images,
// or publications day-to-day.
//
// NOTE: we resolve an absolute path ourselves (rather than using @nuxt/content's
// `~~/` rootDir alias in `cwd`) because that alias substitution drops the path
// separator (it does `rootDir + 'rest'`, not `rootDir + '/' + 'rest'`), which
// silently produced a directory that doesn't exist and made every collection
// resolve to zero files. website-content/ lives one level up from this file
// (a sibling of website-settings/, at the project root).
const websiteContentDir = fileURLToPath(new URL('../website-content', import.meta.url))
const contentDir = (page: string) => `${websiteContentDir}/${page}/text`

export default defineContentConfig({
  collections: {
    // ---------------------------------------------------------------------
    // Homepage — website-content/homepage/text/
    // ---------------------------------------------------------------------
    homepageHero: defineCollection({
      type: 'page',
      source: { include: 'hero.md', cwd: contentDir('homepage') },
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        primaryButtonLabel: z.string(),
        primaryButtonLink: z.string(),
        secondaryButtonLabel: z.string(),
        secondaryButtonLink: z.string(),
      }),
    }),
    homepagePi: defineCollection({
      type: 'page',
      source: { include: 'pi-highlight.md', cwd: contentDir('homepage') },
      schema: z.object({
        badge: z.string().default('Principal Investigator'),
        stats: z.array(z.string()).default([]),
      }),
    }),
    // Curated preview images for the homepage hero carousel. Kept separate
    // from researchTopics because it's a deliberately curated subset/variant
    // (e.g. the Kirigami slide here is a static image, not the animated .gif
    // used on the Research page) rather than a straight derivation from it.
    //
    // NOTE: this whole file is ONE document with an `items` list (rather than
    // one document per item, like researchTopics/team below) because it's a
    // short list that's easiest to edit as a single YAML file.
    homepageHeroCarousel: defineCollection({
      type: 'data',
      source: { include: 'hero-carousel.yml', cwd: contentDir('homepage') },
      schema: z.object({
        items: z.array(z.object({ src: z.string(), alt: z.string() })),
      }),
    }),
    homepageFunding: defineCollection({
      type: 'data',
      source: { include: 'funding.yml', cwd: contentDir('homepage') },
      schema: z.object({
        items: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          // Visual height in px — logos have very different aspect ratios,
          // so each one sets its own max height to look balanced next to
          // the rest.
          maxHeight: z.number().default(56),
        })),
      }),
    }),

    // ---------------------------------------------------------------------
    // Research — website-content/research/text/
    // ---------------------------------------------------------------------
    researchIntro: defineCollection({
      type: 'page',
      source: { include: 'intro.md', cwd: contentDir('research') },
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
      }),
    }),
    researchTopics: defineCollection({
      type: 'page',
      source: { include: 'topics/**/*.md', cwd: contentDir('research') },
      schema: z.object({
        // Used for the in-page anchor (e.g. /research#solar-sails) and to
        // deep-link from the homepage bento cards.
        topicId: z.string(),
        title: z.string(),
        category: z.string(),
        // Must match one of the FILTER_CATEGORIES in app/utils/publications.ts
        // — used to deep-link into the Publications page filter.
        relatedTag: z.string(),
        // Slides for this topic's carousel, in display order.
        images: z.array(z.object({ src: z.string(), alt: z.string() })),
        order: z.number().default(99),
      }),
    }),

    // ---------------------------------------------------------------------
    // Team — website-content/team/text/
    // ---------------------------------------------------------------------
    teamIntro: defineCollection({
      type: 'page',
      source: { include: 'intro.md', cwd: contentDir('team') },
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
      }),
    }),
    team: defineCollection({
      type: 'page',
      source: { include: 'members/**/*.md', cwd: contentDir('team') },
      schema: z.object({
        name: z.string(),
        role: z.enum(['Principal Investigator', 'Postdoctoral Researcher', 'PhD Student', 'Masters Student', 'Undergraduate', 'Visiting Researcher', 'Alumni']),
        title: z.string().optional(),
        // For alumni: their last position in the lab (e.g. "PhD Student", "Postdoc 2022–2024")
        formerRole: z.string().optional(),
        photo: z.string(),
        email: z.string().optional(),
        scholar: z.string().optional(),
        orcid: z.string().optional(),
        github: z.string().optional(),
        research: z.array(z.string()).default([]),
        order: z.number().default(99),
      }),
    }),
    // NOTE: one document with an `items` list (see homepageHeroCarousel note above).
    teamGroupPhotos: defineCollection({
      type: 'data',
      source: { include: 'group-photos.yml', cwd: contentDir('team') },
      schema: z.object({
        items: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })),
      }),
    }),

    // ---------------------------------------------------------------------
    // Publications — website-content/publications/text/
    // ---------------------------------------------------------------------
    // NOTE: one document with an `items` list (see homepageHeroCarousel note above) —
    // this keeps all 60+ papers editable as a single, familiar flat file.
    publications: defineCollection({
      type: 'data',
      source: { include: 'publications.yml', cwd: contentDir('publications') },
      schema: z.object({
        items: z.array(z.object({
          title: z.string(),
          authors: z.array(z.string()),
          journal: z.string(),
          year: z.number(),
          // Full URL to the DOI / preprint / external page
          doi: z.string().optional(),
          // Direct PDF link if available
          pdf: z.string().optional(),
          // Used for client-side filtering on the Publications page
          tags: z.array(z.string()),
          // Show on the home page "Recent Work" section
          featured: z.boolean().default(false),
        })),
      }),
    }),

    // ---------------------------------------------------------------------
    // Contact — website-content/contact/text/
    // ---------------------------------------------------------------------
    contactInfo: defineCollection({
      type: 'page',
      source: { include: 'info.md', cwd: contentDir('contact') },
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        address: z.array(z.string()),
        email: z.string(),
        scholarUrl: z.string(),
        deptName: z.string(),
        deptUrl: z.string(),
        mapEmbedUrl: z.string(),
        prospectiveStudentsTitle: z.string(),
      }),
    }),

    // ---------------------------------------------------------------------
    // Virtual Lab Tour — website-content/virtual-lab-tour/text/
    // ---------------------------------------------------------------------
    vltIntro: defineCollection({
      type: 'page',
      source: { include: 'intro.md', cwd: contentDir('virtual-lab-tour') },
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
      }),
    }),
    // NOTE: one document with an `items` list (see homepageHeroCarousel note above).
    vltPhotos: defineCollection({
      type: 'data',
      source: { include: 'photos.yml', cwd: contentDir('virtual-lab-tour') },
      schema: z.object({
        items: z.array(z.object({
          // Leave blank / omit while waiting on the real photo — the gallery
          // shows a "photo coming soon" placeholder tile until src is set.
          src: z.string().nullable().default(null),
          alt: z.string(),
          caption: z.string().optional(),
        })),
      }),
    }),
  },
})
