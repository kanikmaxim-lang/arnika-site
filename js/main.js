const projects = [
  {
    id: 'zhk-kislorod',
    title: 'Жилой комплекс «Кислород»',
    tags: '8 корпусов, МОП, парковка, щитовое оборудование',
    cover: 'img/projects/zhk-kislorod/cover.jpg',
    pdf: 'files/projects/zhk-kislorod.pdf',
  },
  {
    id: 'polyana-pik',
    title: 'Гостиничный комплекс «Поляна Пик»',
    tags: 'ВУ, ВРУ, АВР, пусконаладка',
    cover: 'img/projects/polyana-pik/cover.jpg',
    pdf: 'files/projects/polyana-pik.pdf',
  },
  {
    id: 'apartments-moscow',
    title: 'Квартиры Москва',
    tags: 'Жилые помещения, электромонтаж, освещение',
    cover: 'img/projects/apartments-moscow/cover.jpg',
    pdf: 'files/projects/apartments-moscow.pdf',
  },
  {
    id: 'production-warehouse-class',
    title: 'Производственный цех со складом',
    tags: '200 кв. м, госзаказ, быстрый срок',
    cover: 'img/projects/production-warehouse-class/cover.jpg',
    pdf: 'files/projects/production-warehouse-class.pdf',
  },
  {
    id: 'araks-office',
    title: 'Офис продаж «Аракс»',
    tags: '500 кв. м, проектирование, дизайнерское освещение',
    cover: 'img/projects/araks-office/cover.jpg',
    pdf: 'files/projects/araks-office.pdf',
  },
  {
    id: 'hotel-adagio',
    title: 'Отель «Адажио»',
    tags: 'Номерной фонд, МОП, архитектурное освещение',
    cover: 'img/projects/hotel-adagio/cover.jpg',
    pdf: 'files/projects/hotel-adagio.pdf',
  },
  {
    id: 'cafe-surfer',
    title: 'Кафе «Сёрфер»',
    tags: 'Электромонтаж, интерьерное освещение, подключение оборудования',
    cover: 'img/projects/cafe-surfer/cover.jpg',
    pdf: 'files/projects/cafe-surfer.pdf',
  },
  {
    id: 'abkhazia-house',
    title: 'Дом в Абхазии',
    tags: 'Частный объект, электромонтаж, щитовое оборудование',
    cover: 'img/projects/abkhazia-house/cover.jpg',
    pdf: 'files/projects/abkhazia-house.pdf',
  },
  {
    id: 'timiryazeva',
    title: 'Объект на Тимирязева',
    tags: 'Электромонтаж, щитовое оборудование, подключение линий',
    cover: 'img/projects/timiryazeva/cover.jpg',
    pdf: 'files/projects/timiryazeva.pdf',
  },
  {
    id: 'bugatti-showroom',
    title: 'Шоурум Bugatti',
    tags: 'Шоурум, освещение, электромонтаж',
    cover: 'img/projects/bugatti-showroom/cover.jpg',
    pdf: 'files/projects/bugatti-showroom.pdf',
  },
  {
    id: 'sto-vag-sochi',
    title: 'СТО VAG Сочи',
    tags: 'Автосервис, электромонтаж, освещение',
    cover: 'img/projects/sto-vag-sochi/cover.jpg',
    pdf: 'files/projects/sto-vag-sochi.pdf',
  },
];

/* Заглушка, если обложка ещё не загружена в папку img/ */
const PHOTO_STUB =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420">
      <rect width="100%" height="100%" fill="#121828"/>
      <path d="M330 150 l-70 96 h48 l-8 64 70-96 h-48 z" fill="#ff7a1a" opacity="0.85"/>
      <text x="320" y="360" font-family="Arial" font-size="20" fill="#98a0b5" text-anchor="middle">Фото скоро появится</text>
    </svg>`
  );

/* Если картинка не найдена — подставляем заглушку */
function guardImg(img) {
  img.onerror = () => {
    img.onerror = null; // чтобы не уйти в цикл, если заглушка вдруг не сработает
    img.src = PHOTO_STUB;
  };
}

/* ---------- Рендер карточек и открытие PDF ---------- */

const projectsGrid = document.getElementById('projectsGrid');

projects.forEach((project) => {
  const card = document.createElement('button');
  card.className = 'project-card';
  card.type = 'button';

  card.innerHTML = `
    <img class="project-card__img" src="${project.cover}" alt="${project.title}" loading="lazy">
    <span class="project-card__body">
      <span>
        <span class="project-card__title">${project.title}</span><br>
        <span class="project-card__tags">${project.tags}</span>
      </span>
      <span class="project-card__arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14m-6-6 6 6-6 6"/>
        </svg>
      </span>
    </span>
  `;

  guardImg(card.querySelector('img'));

  /* Клик по карточке открывает PDF-портфолио в новой вкладке */
  card.addEventListener('click', () => {
    window.open(project.pdf, '_blank', 'noopener');
  });

  projectsGrid.appendChild(card);
});

/* ---------- 3. Меню, шапка, подсветка пункта навигации ---------- */

const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav--open');
  burger.classList.toggle('burger--open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

/* Клик по пункту мобильного меню закрывает его */
nav.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav--open');
    burger.classList.remove('burger--open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 10);
});

/* Подсветка активного раздела в меню */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = nav.querySelectorAll('.nav__link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          'nav__link--active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => observer.observe(section));


const WEB3FORMS_KEY = '';


const TG_BOT_TOKEN = '';
const TG_CHAT_ID = '';

const orderForm = document.getElementById('orderForm');
const formSuccess = document.getElementById('formSuccess');

orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = orderForm.name.value.trim();
  const phone = orderForm.phone.value.trim();
  if (phone.length < 6) {
    orderForm.phone.focus();
    return;
  }

  try {
    if (WEB3FORMS_KEY) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Новая заявка с сайта ARNIKA',
          name: name || '—',
          phone,
        }),
      });
    } else if (TG_BOT_TOKEN && TG_CHAT_ID) {
      const text = `Новая заявка с сайта!\nИмя: ${name || '—'}\nТелефон: ${phone}`;
      await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text }),
      });
    }
  } catch (error) {
    console.error('Не удалось отправить заявку:', error);
  }

  formSuccess.classList.add('form__success--visible');
  orderForm.reset();
});
