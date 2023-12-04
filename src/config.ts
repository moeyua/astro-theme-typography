
export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
};

export type SocialObjects = {
  name: string;
  href: string;
  linkTitle: string;
}[];



export const SITE: Site = {
  website: "https://astro-theme-typography.vercel.app/", // replace this with your deployed domain
  author: "Moeyua",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Typography",
};

export const LOCALE = ["en-EN"];

export const SOCIALS: SocialObjects = [
  {
    name: "github",
    href: "https://github.com/moeyua/astro-theme-typography",
    linkTitle: ` ${SITE.title} on Github`,
  },
  {
    name: "rss",
    href: "https://github.com/moeyua/astro-theme-typography",
    linkTitle: `${SITE.title} on RSS`,
  },
  {
    name: "twitter",
    href: "https://github.com/moeyua/astro-theme-typography",
    linkTitle: `${SITE.title} on Twitter`,
  },
  {
    name: "mastodon",
    href: "https://github.com/moeyua/astro-theme-typography",
    linkTitle: `${SITE.title} on Mastodon`,
  }
];

export const NAVS = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Archive",
    href: "/archive",
  },
  {
    name: "Categories",
    href: "/categories"
  },
  {
    name: "About",
    href: "/about",
  },
];

// Used in uno.config.ts
export const ICON_SAFE_LIST = SOCIALS.map((social) => `i-mdi-${social.name}`);

export const HOME_PAGE_SIZE = 10;
