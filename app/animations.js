import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

gsap.defaults({
  duration: 0.5,
  ease: 'power1.out',
});

export const heroInitAnimation = (media) => {
  const tl = gsap.timeline();

  tl.fromTo(
    media,
    {
      maskSize: '0%',
    },
    {
      maskSize: '50%',
      duration: 3,
      delay: 1,
    }
  );
  tl.to(media, {
    maskSize: '4500%',
    duration: 1,
    ease: 'power1.in',
  });

  const selectedprojects = document.querySelectorAll('.selectedprojects');
  tl.fromTo(
    selectedprojects,
    { xPercent: -10 },
    { xPercent: 0, duration: 1, ease: 'power1.out' }
  );
  const selectedprojects__items = document.querySelectorAll(
    '.selectedprojects__item'
  );
  tl.to(
    selectedprojects__items,
    {
      clipPath: ' inset(0px 0% 0px 0px)',
      stagger: 0.1,
      duration: 1,
      ease: 'power1.in',
    },
    '<'
  );

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

export const projectSelectedProject = (container, items, itemSelected) => {
  const tl = gsap.timeline();

  items.forEach((item, index) => {
    if (item !== itemSelected) {
      tl.to(
        item,
        {
          width: 0,
          height: 0,
          overflow: 'hidden',
          opacity: 0,
          duration: 1,
        },
        '<'
      );
    }
  });
  items.forEach((item, index) => {
    if (item === itemSelected) {
      tl.to(item, {
        width: '100vw',
        height: '100vh',
        duration: 1,
      });
    }
  });

  tl.to(container, {
    bottom: 0,
    padding: 0,
    gap: 0,
    duration: 1,
  });

  return tl;
};

export const projectNextPrev = (project, other, container) => {
  const tl = gsap.timeline();

  tl.to(other, {
    width: 0,
    opacity: 0,
    overflow: 'hidden',
  });

  // Scroll to the top of the page
  tl.to(window, {
    scrollTo: 0, // Scroll to the top (0px)
    duration: 1, // Adjust the duration as needed
    ease: 'power2.out',
  });

  tl.to(
    container,
    {
      padding: 0,
      top: 0,
    },
    '<'
  );

  tl.to(
    project,
    {
      width: '100vw',
      height: '100vh',
    },
    '<'
  );

  return tl;
};
