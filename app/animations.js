import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

gsap.defaults({
  duration: 2,
  ease: 'power1.inOut',
});

export const projectSelectedFromWork = (wrapper, video, count) => {
  const tl = gsap.timeline();

  const projects = document.querySelectorAll('.workItems');

  projects.forEach((project) => {
    if (!project.classList.contains('currentItem')) {
      tl.to(
        project,
        {
          x: '-50%',
          opacity: 0,
        },
        '<'
      );
    }
  });

  tl.to(wrapper.current, { left: 0 }, '<');

  tl.to(count.current, { opacity: 0 }, '<');

  projects.forEach((project) => {
    if (project.classList.contains('currentItem')) {
      tl.to(
        project,
        {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          scale: 1,
        },
        '<'
      );
    }
  });

  // Video Fullscreen
  tl.to(
    video.current,
    {
      width: '100%',
      height: '100%',
    },
    '<'
  );
  /* tl.to(
    video.current,
    {
      width: '0%',
      height: '0%',
      duration: 0.3,
    },
    '<'
  ); */

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
