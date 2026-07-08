import rss from '@astrojs/rss';
import { allLangs } from '../../i18n/utils';
import { getSlugGroups, resolveGroupEntry } from '../../lib/posts';

export function getStaticPaths() {
  return allLangs.map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
  const { lang } = context.params;

  const blogGroups = await getSlugGroups('blog');
  const storyGroups = await getSlugGroups('stories');

  const items = [
    ...blogGroups.map((group) => ({ group, section: 'blog', ...resolveGroupEntry(group, lang) })),
    ...storyGroups.map((group) => ({ group, section: 'stories', ...resolveGroupEntry(group, lang) })),
  ].sort((a, b) => b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf());

  return rss({
    title: 'madhellequin',
    description: 'Blog and stories feed',
    site: context.site,
    items: items.map(({ group, section, contentLang, entry }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `/${lang}/${section}/${group.slug}/${contentLang}/`,
    })),
  });
}
