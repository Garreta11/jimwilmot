import gsap from 'gsap';

gsap.defaults({
  duration: 2,
  ease: 'expo.inOut',
});

export const videoFullscreen = (videoRef) => {
  gsap.to(videoRef, {
    width: '100%',
    height: '100%',
  });
};
