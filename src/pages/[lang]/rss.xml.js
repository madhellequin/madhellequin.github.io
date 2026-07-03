import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return ['ru', 'uk', 'en'].map((lang) => ({ params: { lang } }));
}

const siteNames = { ru: 'madhellequin', uk: 'madhellequin', en: 'madhellequin' };

export async function GET(context) {
  const { lang } = context.params;

  const posts = await getCollection('blog', ({ data }) => data.lang === lang && !data.draft);
  const stories = await getCollection('stories', ({ data }) => data.lang === lang && !data.draft);

  const items = [
    ...posts.map((post) => ({ entry: post, section: 'blog' })),
    ...stories.map((story) => ({ entry: story, section: 'stories' })),
  ].sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());

  return rss({
    title: siteNames[lang],
    description: 'Blog and stories feed',
    site: context.site,
    items: items.map(({ entry, section }) => {
      const slug = entry.id.split('/').slice(1).join('/');
      return {
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.pubDate,
        link: `/${lang}/${section}/${slug}/`,
      };
    }),
  });
}
