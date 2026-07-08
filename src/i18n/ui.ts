export const languages = {
  uk: 'Українська',
  en: 'English',
  ru: 'Русский',
} as const;

export const defaultLang = 'ru';

export const ui = {
  ru: {
    'nav.home': 'Главная',
    'nav.blog': 'Блог',
    'nav.stories': 'Рассказы',
    'nav.about': 'Обо мне',
    'blog.readMore': 'Читать дальше',
    'blog.empty': 'Пока нет постов.',
    'stories.empty': 'Пока нет рассказов.',
  },
  uk: {
    'nav.home': 'Головна',
    'nav.blog': 'Блог',
    'nav.stories': 'Оповідання',
    'nav.about': 'Про мене',
    'blog.readMore': 'Читати далі',
    'blog.empty': 'Поки що немає постів.',
    'stories.empty': 'Поки що немає оповідань.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.stories': 'Stories',
    'nav.about': 'About',
    'blog.readMore': 'Read more',
    'blog.empty': 'No posts yet.',
    'stories.empty': 'No stories yet.',
  },
} as const;
