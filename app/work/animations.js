import gsap from 'gsap';

gsap.defaults({
  duration: 2,
  ease: 'expo.inOut',
});

export const videoFullscreen = (wrapper, video) => {
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

  return tl;
};
