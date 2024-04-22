  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
      },
      duration: 1,
      opacity: 0,
      y: 100,
      stagger: 0.2 * index
    });
  });

