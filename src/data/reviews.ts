// Client testimonials. `real: true` are genuine, named clients (authorized for
// publication); the rest are demonstration examples until real ones replace
// them. Rendered on the site and exposed as schema.org Review.

export interface Review {
  text: string;
  author: string;
  role: string;
  /** Genuine, authorized testimonial vs. demo placeholder */
  real?: boolean;
}

export const reviews: Review[] = [
  {
    text: 'Ребята сделали нам сайт магазина и занялись продвижением. Раньше про нас знали только местные, а теперь заявки идут и из поиска, и с карт. Сайт удобный, всё показывают по отчётам понятным языком. Очень довольна работой и отношением.',
    author: 'Наталья Боронникова',
    role: 'владелец магазина «Модный дом», Снежинск',
    real: true,
  },
  {
    text: 'Запустили лендинг и таргет за две недели. Заявки пошли с первых дней, стоимость лида получилась ниже, чем мы рассчитывали. Отдельное спасибо за прозрачную аналитику — видно, за что платишь.',
    author: 'Игорь Мельников',
    role: 'руководитель отдела продаж',
  },
  {
    text: 'Вывели карточки на Wildberries в топ категории и переписали описания. Продажи выросли кратно, а главное — стабильно держатся. Работают системно, без лишних обещаний.',
    author: 'Елена Касьянова',
    role: 'основатель бренда одежды',
  },
  {
    text: 'Внедрили ИИ-бота в поддержку интернет-магазина. Большую часть обращений он закрывает сам, операторы разгрузились. Настроили быстро и под наши процессы.',
    author: 'Дмитрий Соколов',
    role: 'операционный директор',
  },
];

export const realReviews = reviews.filter((r) => r.real);
