// Progressive enhancement: content, links, and FAQ details work without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
  if (mobileMenu) mobileMenu.hidden = true;
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 810px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-item').forEach(other => { if (other !== item) other.open = false; });
  });
});

document.querySelectorAll('[data-billing]').forEach(button => {
  button.addEventListener('click', () => {
    const period = button.dataset.billing;
    document.querySelectorAll('[data-billing]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelectorAll('[data-monthly]').forEach(price => { price.textContent = price.dataset[period]; });
    const cells = document.querySelector('.comparison-table tbody tr')?.querySelectorAll('td');
    if (cells) {
      cells[0].textContent = period === 'yearly' ? '$450' : '$499';
      cells[1].textContent = period === 'yearly' ? '$1,250' : '$1,499';
    }
  });
});

const slider = document.querySelector('[data-service-slider]');
if (slider) {
  const slides = [...slider.querySelectorAll('[data-slide-index]')];
  let index = 0;
  function changeSlide(delta) {
    index = (index + delta + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    slider.querySelector('[data-slide-number]').textContent = '/' + String(index + 1).padStart(2, '0');
  }
  slider.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => changeSlide(Number(button.dataset.slide))));
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const updateVideo = () => {
    if (reducedMotion.matches) heroVideo.pause();
    else heroVideo.play().catch(() => {});
  };
  updateVideo();
  reducedMotion.addEventListener('change', updateVideo);
}

// Matches the Framer video component: poster with a play button, native controls once playing.
document.querySelectorAll('[data-video]').forEach(frame => {
  const video = frame.querySelector('video');
  const play = frame.querySelector('.video-play');
  play.addEventListener('click', () => {
    video.controls = true;
    play.hidden = true;
    video.play().catch(() => {});
    video.focus();
  });
});

// Counters and progress bars animate once when scrolled into view, like the Framer original.
// Without JavaScript or with reduced motion, final values are shown as rendered.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const counters = [...document.querySelectorAll('[data-count]')];
  const bars = [...document.querySelectorAll('.timeline-bar>div')];
  const format = (value, decimals) => value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      observer.unobserve(target);
      if (target.classList.contains('timeline-bar')) {
        const bar = target.querySelector(':scope>div');
        bar.style.height = bar.dataset.height;
        return;
      }
      const start = Number(target.dataset.start), end = Number(target.dataset.count);
      const decimals = (target.dataset.count.split('.')[1] || '').length;
      // data-speed is the Framer counter's milliseconds per whole-number step.
      const speed = Number(target.dataset.speed);
      const duration = speed ? Math.abs(end - start) * speed : 1600;
      const began = performance.now();
      const step = now => {
        const progress = Math.min((now - began) / duration, 1);
        const eased = speed ? progress : 1 - (1 - progress) ** 3;
        target.textContent = format(start + (end - start) * eased, decimals) + target.dataset.suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => {
    const decimals = (counter.dataset.count.split('.')[1] || '').length;
    counter.textContent = format(Number(counter.dataset.start), decimals) + counter.dataset.suffix;
    observer.observe(counter);
  });
  bars.forEach(bar => {
    bar.dataset.height = bar.style.height;
    bar.style.height = '0';
    observer.observe(bar.parentElement);
  });
}

// Appear effects. The inline head script adds .js so start states apply before first paint;
// data-mount elements reveal on load, the rest when they scroll into view.
const appearing = [...document.querySelectorAll('[data-appear]')];
const reveal = element => element.classList.add('is-visible');
if (reducedMotion.matches || !('IntersectionObserver' in window)) appearing.forEach(reveal);
else {
  const inView = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      reveal(target);
      inView.unobserve(target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    appearing.forEach(element => element.hasAttribute('data-mount') ? reveal(element) : inView.observe(element));
  }));
}

// Framer tickers scroll at 60px/s. Items are duplicated once so the loop is seamless; the copies
// are hidden from assistive technology. With reduced motion the row stays a normal scroller.
if (!reducedMotion.matches) {
  document.querySelectorAll('[data-ticker]').forEach(ticker => {
    const track = ticker.querySelector('.ticker-track');
    [...track.children].forEach(item => {
      const copy = item.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.inert = true;
      track.append(copy);
    });
    const setDuration = () => track.style.setProperty('--ticker-duration', `${track.scrollWidth / 2 / 60}s`);
    setDuration();
    new ResizeObserver(setDuration).observe(track);
    ticker.classList.add('is-running');
  });
}

// Framer text reveal: characters brighten from 20% opacity as the paragraph moves from 90% to 30%
// of the viewport height. Screen readers get the plain sentence instead of single characters.
if (!reducedMotion.matches) {
  document.querySelectorAll('[data-scroll-reveal]').forEach(text => {
    const sentence = text.textContent.trim();
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    const characters = [];
    sentence.split(' ').forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'whitespace-nowrap';
      for (const character of word) {
        const span = document.createElement('span');
        span.textContent = character;
        wordSpan.append(span);
        characters.push(span);
      }
      if (index) visual.append(' ');
      visual.append(wordSpan);
    });
    const label = document.createElement('span');
    label.className = 'sr-only';
    label.textContent = sentence;
    text.replaceChildren(label, visual);
    let lit = -1;
    const update = () => {
      const progress = Math.min(Math.max((innerHeight * 0.9 - text.getBoundingClientRect().top) / (innerHeight * 0.6), 0), 1);
      const next = Math.round(progress * characters.length);
      if (next === lit) return;
      characters.forEach((span, index) => { span.style.opacity = index < next ? '1' : '0.2'; });
      lit = next;
    };
    update();
    addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    addEventListener('resize', update);
  });
}

// Header: always visible; switches to the dark-text frosted state once the page scrolls past 40px.
const header = document.querySelector('[data-header]');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', scrollY > 40);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });
}

// Static forms export the completed request locally. No submission is claimed.
// Set data-endpoint on a form to connect your own JSON POST endpoint.
document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('.form-status') || form.nextElementSibling;
    const data = Object.fromEntries(new FormData(form));
    if (form.dataset.endpoint) {
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      status.textContent = 'Sending…';
      try {
        const response = await fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!response.ok) throw new Error('Submission failed');
        status.textContent = form.dataset.form === 'newsletter' ? 'Thank you for subscribing.' : 'Thank you. Your message has been sent.';
        form.reset();
      } catch {
        status.textContent = 'Your request could not be sent. Please try again.';
      } finally { submit.disabled = false; }
      return;
    }
    const blob = new Blob([Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = form.dataset.form === 'newsletter' ? 'greenvolt-subscription.txt' : 'greenvolt-inquiry.txt';
    download.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Your details were downloaded. This preview does not send submissions.';
  });
});

const calculator = document.querySelector('[data-calculator]');
calculator?.addEventListener('submit', event => {
  event.preventDefault();
  if (!calculator.reportValidity()) return;
  const data = new FormData(calculator);
  const spend = Number(data.get('spend'));
  const output = calculator.querySelector('output');
  const format = value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  output.hidden = false;
  output.textContent = `Illustrative annual savings: $${format(spend * .3)}–$${format(spend * .6)}. This example applies a 30–60% savings range to your annual energy spend. Actual results require a site assessment.`;
});
