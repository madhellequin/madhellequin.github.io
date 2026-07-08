import { getCollection, type CollectionEntry } from 'astro:content';
import { resolveContentLang, allLangs, type Lang } from '../i18n/utils';

type TranslatableCollection = 'blog' | 'stories';

export interface SlugGroup<C extends TranslatableCollection> {
  slug: string;
  availableLangs: Lang[];
  entries: Map<Lang, CollectionEntry<C>>;
}

// Groups a collection's entries by their language-less slug, so a single
// post/story can be resolved across whichever locales it was actually
// translated into. Draft entries are excluded entirely.
export async function getSlugGroups<C extends TranslatableCollection>(
  collection: C,
): Promise<SlugGroup<C>[]> {
  const entries = await getCollection(collection, ({ data }) => !data.draft);

  const bySlug = new Map<string, SlugGroup<C>>();
  for (const entry of entries) {
    const [lang, ...rest] = entry.id.split('/');
    const slug = rest.join('/');
    let group = bySlug.get(slug);
    if (!group) {
      group = { slug, availableLangs: [], entries: new Map() };
      bySlug.set(slug, group);
    }
    group.availableLangs.push(lang as Lang);
    group.entries.set(lang as Lang, entry);
  }

  // Order pills consistently with the site language switcher (uk, en, ru),
  // regardless of the filesystem glob order the entries were discovered in.
  for (const group of bySlug.values()) {
    group.availableLangs.sort((a, b) => allLangs.indexOf(a) - allLangs.indexOf(b));
  }

  return [...bySlug.values()];
}

export function resolveGroupEntry<C extends TranslatableCollection>(
  group: SlugGroup<C>,
  siteLang: Lang,
): { contentLang: Lang; entry: CollectionEntry<C> } {
  const contentLang = resolveContentLang(siteLang, group.availableLangs);
  return { contentLang, entry: group.entries.get(contentLang)! };
}
