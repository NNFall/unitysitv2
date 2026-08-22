/**
 * Content model for the UNITY time-cafe landing.
 *
 * Public business facts are wrapped in `Sourced` so a component can show the
 * value without losing its provenance. Editorial concepts are intentionally
 * marked as such and must not be presented as a confirmed event schedule.
 */

export const sources = {
  github: 'https://github.com/NNFall/unitysitv2',
  vk: 'https://vk.ru/unitysmr',
  yandexGallery:
    'https://yandex.ru/maps/51/samara/?ll=50.218803%2C53.203706&mode=poi&poi%5Bpoint%5D=50.218693%2C53.203295&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D223835723975&tab=gallery&z=17',
  yandexShortMap: 'https://yandex.ru/maps/-/CTs~bMp~',
  yandexOrg: 'https://yandex.ru/maps/org/unity/223835723975/',
  directoryReview: 'https://samara.jsprav.ru/igrovyie-klubyi/unity-club/',
} as const

export type SourceKind = 'yandex' | 'vk' | 'github' | 'directory' | 'editorial'

export interface Provenance {
  readonly kind: SourceKind
  readonly label: string
  readonly url?: string
  readonly checkedAt: string
  readonly verified: boolean
  readonly note?: string
}

export interface Sourced<T> {
  readonly value: T
  readonly provenance: readonly Provenance[]
}

export interface LinkItem {
  readonly label: string
  readonly href: string
  readonly provenance?: readonly Provenance[]
}

export interface CallToAction {
  readonly label: string
  readonly href: string
  readonly variant?: 'primary' | 'secondary' | 'text'
}

export interface MediaReference {
  readonly assetKey: string
  readonly alt: string
  readonly provenance?: readonly Provenance[]
}

export type FormatId = 'playstation' | 'billiards' | 'cinema' | 'board-games'

export interface FormatItem {
  readonly id: FormatId
  readonly number: string
  readonly kicker: string
  readonly title: string
  readonly description: string
  readonly detail: string
  readonly media: MediaReference
  readonly cta: CallToAction
  readonly provenance: readonly Provenance[]
}

export interface EventItem {
  readonly id: string
  readonly category: string
  readonly title: string
  readonly dateLabel: string
  readonly description: string
  readonly status: 'concept' | 'published'
  readonly media: MediaReference
  readonly cta: CallToAction
  readonly provenance: readonly Provenance[]
}

export interface ReviewItem {
  readonly id: string
  readonly author: string
  readonly dateLabel: string
  /** A short excerpt or a clearly labelled editorial summary of a public review. */
  readonly quote: string
  readonly attribution: 'excerpt' | 'summary'
  readonly provenance: readonly Provenance[]
}

export interface OpeningHours {
  readonly days: string
  readonly open: string
  readonly close: string
  readonly label: string
}

const yandexOrgProvenance: readonly Provenance[] = Object.freeze([
  {
    kind: 'yandex',
    label: 'Карточка Unity на Яндекс Картах',
    url: sources.yandexOrg,
    checkedAt: '2026-08-22',
    verified: true,
    note: 'Публичная карточка организации; расписание может меняться в праздники.',
  },
])

const yandexGalleryProvenance: readonly Provenance[] = Object.freeze([
  {
    kind: 'yandex',
    label: 'Галерея Unity на Яндекс Картах',
    url: sources.yandexGallery,
    checkedAt: '2026-08-22',
    verified: true,
    note: 'Используется как источник живых кадров пространства после визуальной проверки.',
  },
])

const vkProvenance: readonly Provenance[] = Object.freeze([
  {
    kind: 'vk',
    label: 'Сообщество Unity во ВКонтакте',
    url: sources.vk,
    checkedAt: '2026-08-22',
    verified: true,
    note: 'Официальная ссылка сообщества; публикации и расписание следует проверять перед обновлением афиши.',
  },
])

const directoryReviewProvenance: readonly Provenance[] = Object.freeze([
  {
    kind: 'directory',
    label: 'Публичный отзыв в городском каталоге',
    url: sources.directoryReview,
    checkedAt: '2026-08-22',
    verified: true,
    note: 'Короткий смысловой пересказ отзыва; это не официальное заявление Unity.',
  },
])

const editorialProvenance: readonly Provenance[] = Object.freeze([
  {
    kind: 'editorial',
    label: 'Редакционная концепция лендинга UNITY',
    checkedAt: '2026-08-22',
    verified: false,
    note: 'Сценарий интерфейса, не подтверждение конкретной даты, цены или услуги.',
  },
])

const sourced = <T>(value: T, provenance: readonly Provenance[]): Sourced<T> => ({
  value,
  provenance,
})

const yandexFact = <T>(value: T): Sourced<T> => sourced(value, yandexOrgProvenance)

const conceptMedia = (assetKey: string, alt: string): MediaReference => ({
  assetKey,
  alt,
  provenance: editorialProvenance,
})

export const siteContent = {
  brand: {
    name: 'UNITY',
    descriptor: 'антикафе в Самаре',
    eyebrow: 'место для своих планов',
  },

  navigation: [
    { label: 'Что внутри', href: '#inside' },
    { label: 'Мероприятия', href: '#events' },
    { label: 'Цены и условия', href: '#pricing' },
    { label: 'Бронирование', href: '#booking' },
    { label: 'Контакты', href: '#contacts' },
  ] satisfies readonly LinkItem[],

  hero: {
    eyebrow: 'тайм-кафе · Самара',
    title: 'Ваше место для отдыха, общения и игр',
    accentWord: 'отдыха',
    description:
      'Уютное пространство, где можно работать, отдыхать, играть и проводить время с друзьями.',
    primaryCta: { label: 'Забронировать вечер', href: '#booking', variant: 'primary' },
    secondaryCta: { label: 'Посмотреть форматы', href: '#pricing', variant: 'text' },
    note: 'Платите за время, а не за вход — и оставайтесь столько, сколько хочется.',
  } satisfies {
    readonly eyebrow: string
    readonly title: string
    readonly accentWord: string
    readonly description: string
    readonly primaryCta: CallToAction
    readonly secondaryCta: CallToAction
    readonly note: string
  },

  benefits: [
    {
      id: 'choose-your-evening',
      title: 'Соберите свой вечер',
      description: 'Меняйте сценарий по настроению: игра, фильм, разговор или пауза.',
      icon: 'spark',
      provenance: editorialProvenance,
    },
    {
      id: 'for-any-company',
      title: 'Для любой компании',
      description: 'Тихий стол для двоих, большая встреча друзей или камерный праздник.',
      icon: 'people',
      provenance: editorialProvenance,
    },
    {
      id: 'late-hours',
      title: 'Вечер без спешки',
      description: 'Поздний ритм и гибкий план, который не заканчивается после первого часа.',
      icon: 'moon',
      provenance: yandexOrgProvenance,
    },
  ] satisfies readonly {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly icon: string
    readonly provenance: readonly Provenance[]
  }[],

  formats: [
    {
      id: 'playstation',
      number: '01',
      kicker: 'играть громко',
      title: 'PlayStation',
      description: 'Большой экран, знакомая команда и матч, который хочется взять реваншем.',
      detail: 'Для дуэлей, кооператива и длинных игровых сессий.',
      media: conceptMedia('playstation', 'Игровая зона UNITY с консолью и большим экраном'),
      cta: { label: 'Выбрать игру', href: '#booking', variant: 'text' },
      provenance: editorialProvenance,
    },
    {
      id: 'billiards',
      number: '02',
      kicker: 'держать ритм',
      title: 'Бильярд',
      description: 'Партия без таймера: можно играть, разговаривать и не торопить финальный шар.',
      detail: 'Спокойный формат для вечера вдвоём или дружеского турнира.',
      media: conceptMedia('billiards', 'Бильярдный стол в тёплом вечернем свете'),
      cta: { label: 'Забронировать стол', href: '#booking', variant: 'text' },
      provenance: yandexOrgProvenance,
    },
    {
      id: 'cinema',
      number: '03',
      kicker: 'смотреть вместе',
      title: 'Кинозал',
      description: 'Выберите фильм, устройтесь удобнее и оставьте внешнему миру паузу.',
      detail: 'Для кинопросмотра, тематического вечера или личного саундтрека.',
      media: conceptMedia('cinema', 'Камерный кинозал с мягкими креслами и экраном'),
      cta: { label: 'Собрать кинопросмотр', href: '#booking', variant: 'text' },
      provenance: editorialProvenance,
    },
    {
      id: 'board-games',
      number: '04',
      kicker: 'говорить до ночи',
      title: 'Настольные игры',
      description: 'Колода на столе, несколько правил и разговор, который легко выходит за их пределы.',
      detail: 'Классика, быстрые партии и игры для большой компании.',
      media: conceptMedia('board-games', 'Стол с настольными играми и тёплым светом'),
      cta: { label: 'Найти свой формат', href: '#booking', variant: 'text' },
      provenance: yandexOrgProvenance,
    },
  ] satisfies readonly FormatItem[],

  events: [
    {
      id: 'game-night',
      category: 'сценарий вечера',
      title: 'Игровой вечер',
      dateLabel: 'афиша скоро',
      description: 'Соберите команду для дружеского турнира или оставьте вечер для свободной игры.',
      status: 'concept',
      media: conceptMedia('event-game-night', 'Друзья играют вместе в вечернем пространстве UNITY'),
      cta: { label: 'Узнать о ближайшей дате', href: '#booking', variant: 'secondary' },
      provenance: editorialProvenance,
    },
    {
      id: 'movie-night',
      category: 'сценарий вечера',
      title: 'Киноночь',
      dateLabel: 'афиша скоро',
      description: 'Один фильм, правильный свет и компания, с которой хочется досмотреть титры.',
      status: 'concept',
      media: conceptMedia('event-movie-night', 'Экран и мягкий свет во время кинопросмотра в UNITY'),
      cta: { label: 'Предложить фильм', href: '#booking', variant: 'secondary' },
      provenance: editorialProvenance,
    },
    {
      id: 'board-game-table',
      category: 'сценарий вечера',
      title: 'Большой стол',
      dateLabel: 'афиша скоро',
      description: 'Настольная игра для тех, кто любит знакомиться, спорить о правилах и смеяться громче.',
      status: 'concept',
      media: conceptMedia('event-board-game', 'Большая компания за столом с настольной игрой'),
      cta: { label: 'Собрать компанию', href: '#booking', variant: 'secondary' },
      provenance: editorialProvenance,
    },
  ] satisfies readonly EventItem[],

  reviews: [
    {
      id: 'review-daria',
      author: 'Дарья Ерофеева',
      dateLabel: '5 марта',
      quote: 'Гости отмечают доброжелательных сотрудников, VIP-комнаты, караоке, пинг-понг и бильярд.',
      attribution: 'summary',
      provenance: yandexOrgProvenance,
    },
    {
      id: 'review-ahmed',
      author: 'ахмед ахмед',
      dateLabel: '16 сентября 2025',
      quote: 'Впечатление от PlayStation-кафе: уютная атмосфера, современные консоли и чистые геймпады.',
      attribution: 'summary',
      provenance: yandexOrgProvenance,
    },
    {
      id: 'review-natasha',
      author: 'Наташа',
      dateLabel: 'март 2025',
      quote: 'Автор отзыва рассказывает о спокойном вечере с друзьями, бильярде, настольных играх и приставке.',
      attribution: 'summary',
      provenance: directoryReviewProvenance,
    },
  ] satisfies readonly ReviewItem[],

  contact: {
    city: yandexFact('Самара'),
    address: yandexFact('ул. Гагарина, 118'),
    fullAddress: yandexFact('Самара, ул. Гагарина, 118'),
    metro: yandexFact('Советская'),
    metroDetail: yandexFact('около 4 минут пешком'),
    phone: yandexFact('+7 (987) 950-00-18'),
    phoneHref: 'tel:+79879500018',
    hours: [
      yandexFact({ days: 'Пн', open: '16:00', close: '04:00', label: '16:00 — 04:00' }),
      yandexFact({ days: 'Вт', open: '18:00', close: '04:00', label: '18:00 — 04:00' }),
      yandexFact({ days: 'Ср–Чт', open: '16:00', close: '04:00', label: '16:00 — 04:00' }),
      yandexFact({ days: 'Пт–Сб', open: '16:00', close: '06:00', label: '16:00 — 06:00' }),
      yandexFact({ days: 'Вс', open: '16:00', close: '04:00', label: '16:00 — 04:00' }),
    ] satisfies readonly Sourced<OpeningHours>[],
    hoursNote: 'Время указано по публичной карточке; праздничный график лучше уточнить по телефону.',
    mapUrl: sources.yandexGallery,
    shortMapUrl: sources.yandexShortMap,
    mapLabel: 'Открыть Unity на Яндекс Картах',
  },

  social: {
    vk: {
      label: 'ВКонтакте',
      href: sources.vk,
      provenance: vkProvenance,
    },
  },

  booking: {
    eyebrow: 'выберите свой вечер',
    title: 'Расскажите, как провести время',
    description: 'Оставьте контакт — уточним свободные места, формат и детали визита.',
    form: {
      nameLabel: 'Ваше имя',
      contactLabel: 'Телефон или VK',
      dateLabel: 'Когда планируете прийти?',
      guestsLabel: 'Сколько будет гостей?',
      submitLabel: 'Отправить запрос',
      successMessage: 'Запрос принят — скоро свяжемся с вами.',
      errorMessage: 'Проверьте имя и контакт, чтобы мы могли ответить.',
    },
    demoNote: 'Демо-форма: отправка пока не подключена к серверу. Для быстрого ответа напишите нам во ВКонтакте.',
    vkCta: { label: 'Забронировать во ВКонтакте', href: sources.vk, variant: 'secondary' },
    privacyNote: 'Нажимая кнопку, вы соглашаетесь на обработку сообщения для связи по бронированию.',
    routeSteps: [
      { step: '01', title: 'Выйдите у метро «Советская»', detail: 'До UNITY — около 4 минут пешком.', provenance: yandexOrgProvenance },
      { step: '02', title: 'Идите по улице Гагарина', detail: 'Держитесь прямо примерно 250–300 метров.', provenance: yandexOrgProvenance },
      { step: '03', title: 'Ищите дом 118 и вывеску UNITY', detail: 'Вход отмечен на карте и виден с улицы.', provenance: yandexOrgProvenance },
    ],
    faq: [
      { question: 'Нужно ли бронировать стол заранее?', answer: 'Лучше написать заранее — мы проверим свободные места и подскажем подходящий формат.', provenance: editorialProvenance },
      { question: 'Можно ли прийти со своей едой?', answer: 'Условия зависят от формата вечера. Уточните их при бронировании, чтобы мы всё подготовили.', provenance: editorialProvenance },
      { question: 'Есть ли формат для большой компании?', answer: 'Да, опишите размер компании в заявке — предложим свободную зону и сценарий вечера.', provenance: editorialProvenance },
      { question: 'Как узнать актуальный график?', answer: 'Праздничные часы могут меняться. Самый точный способ — позвонить по номеру в контактах.', provenance: yandexOrgProvenance },
    ],
  },

  footer: {
    line: 'До встречи в UNITY',
    note: 'Контент и расписание обновляются по публичным источникам.',
    links: [
      { label: 'ВКонтакте', href: sources.vk, provenance: vkProvenance },
      { label: 'Яндекс Карты', href: sources.yandexGallery, provenance: yandexGalleryProvenance },
    ] satisfies readonly LinkItem[],
  },
} as const

export type SiteContent = typeof siteContent

export {
  directoryReviewProvenance,
  editorialProvenance,
  vkProvenance,
  yandexGalleryProvenance,
  yandexOrgProvenance,
}
