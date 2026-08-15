import { z } from 'zod';
export const schemas = {
  home: z.object({
    "hero": z.object({
      "headline": z.string(),
      "headline2": z.string(),
      "subheading": z.string(),
      "cta1": z.string(),
      "cta2": z.string()
    }),
    "about": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "body": z.string(),
      "link": z.string()
    }),
    "expertise": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "title": z.string(),
        "description": z.string()
      }))
    }),
    "events": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "type": z.string(),
        "description": z.string()
      }))
    }),
    "cuisines": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "description": z.string()
      }))
    }),
    "testimonials": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "quote": z.string(),
        "name": z.string(),
        "event": z.string()
      }))
    }),
    "gallery": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "cta": z.string()
    }),
    "booking": z.object({
      "headline": z.string(),
      "subheading": z.string(),
      "cta": z.string(),
      "whatsapp": z.string()
    })
  }),
  menu: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "subheading": z.string()
    }),
    "filterNote": z.string(),
    "categories": z.array(z.object({
      "id": z.string(),
      "slug": z.string(),
      "label": z.string(),
      "tag": z.string(),
      "description": z.string(),
      "image": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "desc": z.string(),
        "veg": z.boolean()
      }))
    })),
    "cta": z.object({
      "headline": z.string(),
      "subheading": z.string(),
      "button": z.string(),
      "note": z.string()
    })
  }),
  about: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "subheading": z.string()
    }),
    "story": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "paragraphs": z.array(z.string())
    }),
    "values": z.array(z.object({
      "id": z.string(),
      "icon": z.string(),
      "title": z.string(),
      "description": z.string()
    })),
    "stats": z.array(z.object({
      "id": z.string(),
      "number": z.string(),
      "label": z.string()
    })),
    "promise": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "body": z.string(),
      "signature": z.string()
    }),
    "cta": z.object({
      "headline": z.string(),
      "subheading": z.string(),
      "button": z.string()
    })
  }),
  services: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "subheading": z.string()
    }),
    "eventTypes": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "intro": z.string(),
      "events": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "tag": z.string(),
        "image": z.string(),
        "description": z.string(),
        "highlights": z.array(z.string())
      }))
    }),
    "experiences": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "intro": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "image": z.string(),
        "description": z.string(),
        "examples": z.array(z.string())
      }))
    }),
    "cuisines": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "indian": z.object({
        "title": z.string(),
        "description": z.string(),
        "categories": z.array(z.string())
      }),
      "chinese": z.object({
        "title": z.string(),
        "description": z.string(),
        "categories": z.array(z.string())
      })
    }),
    "corporate": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "body": z.string(),
      "features": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "desc": z.string()
      }))
    }),
    "cta": z.object({
      "headline": z.string(),
      "subheading": z.string(),
      "button": z.string()
    })
  }),
  contact: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "headline": z.string(),
      "subheading": z.string()
    }),
    "info": z.object({
      "phone": z.string(),
      "whatsapp": z.string(),
      "email": z.string(),
      "address": z.string(),
      "hours": z.string(),
      "responseTime": z.string()
    }),
    "form": z.object({
      "title": z.string(),
      "subtitle": z.string(),
      "eventTypes": z.array(z.string()),
      "submitLabel": z.string()
    }),
    "social": z.object({
      "label": z.string(),
      "links": z.array(z.object({
        "id": z.string(),
        "platform": z.string(),
        "handle": z.string(),
        "url": z.string()
      }))
    })
  })
};
export type Schemas = typeof schemas;