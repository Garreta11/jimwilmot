import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

gsap.defaults({
  duration: 0.5,
  ease: 'power1.out',
});

export const heroInitAnimation = (media) => {
  const tl = gsap.timeline();
  // Rectangles
  tl.fromTo('.background', { opacity: 0 }, { opacity: 1, duration: 1 });
  tl.fromTo(
    '.background__rect',
    { width: '10px', height: '10px' },
    { width: '70px', height: '70px' }
  );
  tl.fromTo(
    '.background',
    { width: '10vw', height: '10dvh' },
    { width: '100vw', height: '100dvh', duration: 2 },
    '<'
  );

  // First Animation Face
  tl.fromTo(
    media,
    {
      maskSize: '0%',
    },
    {
      maskSize: '50%',
      duration: 2,
    },
    '<'
  );

  // Second Animation Face
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  tl.to(media, {
    maskSize: isDesktop ? '4500%' : '7500%',
    duration: 1,
    ease: 'power1.in',
  });

  tl.to('.header', { opacity: 1 });
  tl.to('.footer', { opacity: 1 }, '<');

  // Selected Projects Animation
  const selectedprojects = document.querySelectorAll('.selectedprojects');
  tl.fromTo(
    selectedprojects,
    { xPercent: 20 },
    { xPercent: 0, duration: 0.5, ease: 'power1.out' }
  );
  const selectedprojects__items = document.querySelectorAll(
    '.selectedprojects__item'
  );
  tl.to(
    selectedprojects__items,
    {
      clipPath: ' inset(0px 0% 0px 0px)',
      stagger: 0.1,
      ease: 'power1.in',
    },
    '<'
  );
  tl.fromTo(
    '.selectedprojects__title',
    {
      opacity: 0,
    },
    { opacity: 1 },
    '<'
  );

  return tl;
};

export const workPageAnimation = () => {
  const tl = gsap.timeline({ delay: 1 });

  const left =
    window.innerWidth < 1024
      ? '-30%'
      : window.innerWidth > window.innerHeight
        ? `calc(-${window.innerHeight / 2}px + 150px)`
        : `calc(-${window.innerWidth / 2}px + 150px)`;

  tl.fromTo('.work__wrapper', { left: '-100vw' }, { left: left, duration: 1 });
  tl.fromTo(
    '.work__categories',
    { right: '-100vw' },
    { right: 20, duration: 1 },
    '<'
  );

  tl.fromTo('.work__video', { scale: 0 }, { scale: 1 });

  tl.fromTo('.work__count', { opacity: 0, y: 100 }, { opacity: 1, y: 0 });

  return tl;
};

export const projectSelectedFromWork = (wrapper, video, count) => {
  const duration = 0.5;
  const tl = gsap.timeline();

  const projects = document.querySelectorAll('.workItems');

  projects.forEach((project) => {
    if (!project.classList.contains('currentItem')) {
      tl.to(
        project,
        {
          x: '-50%',
          opacity: 0,
          duration: duration,
        },
        '<'
      );
    }
  });

  tl.to(wrapper.current, { left: 0, duration: duration }, '<');

  tl.to(count.current, { opacity: 0, duration: duration }, '<');

  // Video Fullscreen
  tl.to(
    video.current,
    {
      width: '100%',
      height: '100%',
      duration: duration,
    },
    '<'
  );

  return tl;
};

export const projectSelectedProject = (title, items, itemSelected) => {
  const tl = gsap.timeline();

  tl.to(title, { autoAlpha: 0 });

  /* tl.to(wrapper, {
    padding: 0,
    gap: 0,
  });

  items.forEach((item, index) => {
    if (item !== itemSelected) {
      tl.to(
        item,
        {
          width: 0,
          height: 0,
          overflow: 'hidden',
          opacity: 0,
        },
        '<'
      );
    }
  });

  tl.to(container, {
    bottom: 0,
    padding: 0,
  });

  items.forEach((item, index) => {
    if (item === itemSelected) {
      tl.to(item, {
        width: '100vw',
        height: '100vh',
      });
    }
  }); */
  /* tl.fromTo(
    '.selectedprojects__title',
    {
      opacity: 1,
    },
    { opacity: 0 },
    '<'
  ); */
  items.forEach((item, index) => {
    if (item !== itemSelected) {
      tl.to(
        item,
        {
          clipPath: ' inset(0px 100% 0px 0px)',
          stagger: 0.2,
          ease: 'power1.in',
        },
        '<'
      );
    }
  });
  items.forEach((item, index) => {
    if (item === itemSelected) {
      tl.to(item, {
        clipPath: ' inset(0px 0px 100% 0px)',
        delay: 0.5,
        ease: 'power1.in',
      });
    }
  });

  return tl;
};

export const projectNextPrev = (project, other, page) => {
  const tl = gsap.timeline();
  tl.to(other, {
    clipPath: ' inset(0px 100% 0px 0px)',
    ease: 'power1.in',
  });
  tl.to(project, {
    clipPath: ' inset(0px 0px 100% 0px)',
    ease: 'power1.in',
    delay: 0.5,
  });
  tl.to(page, { opacity: 0 });

  return tl;
};

export const studioFadeOut = () => {
  const tl = gsap.timeline();

  tl.to('.studio__wrapper', { opacity: 0 });

  return tl;
};
