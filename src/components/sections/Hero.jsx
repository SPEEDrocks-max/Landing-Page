import React, { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef(null)
  const splineRef = useRef(null)
  const titleWordsRef = useRef([])
  const heroLineRef = useRef(null)
  const cardsRef = useRef([])
  const titleWords = ['WELCOME', 'ITZFIZZ']

  const setWordRef = (index) => (element) => {
    titleWordsRef.current[index] = element
  }

  const setCardRef = (index) => (element) => {
    cardsRef.current[index] = element
  }

  useGSAP(() => {
    gsap.set(splineRef.current, { autoAlpha: 0, y: 24, scale: 1.02 })
    gsap.set(titleWordsRef.current, { y: 14, opacity: 0 })
    gsap.set(heroLineRef.current, { scaleX: 0, transformOrigin: 'left' })

    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    gsap.to(splineRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=35%',
        scrub: 1,
      },
    })

    gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=90%',
        scrub: 1.1,
      },
    })
      .to(titleWordsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.28,
      })
      .to(
        heroLineRef.current,
        {
          scaleX: 1,
          duration: 0.6,
        },
        '-=0.2',
      )
      .to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      }, '-=0.05')

    gsap.to(splineRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative h-[165vh] w-full">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div ref={splineRef} className="spline-bg absolute inset-x-0 -top-[28%] -bottom-[12%] z-0 pointer-events-none">
          <Spline scene="https://prod.spline.design/QE5OQ5o5XPMEjIYp/scene.splinecode" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />

        <div className="absolute z-20 top-[40%] left-8 md:left-24 lg:left-32 pointer-events-none">
          <h1
            className="block w-max text-left text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] tracking-[0.08em] md:tracking-[0.09em] drop-shadow-2xl"
          >
            {titleWords.map((word, index) => (
              <span
                key={word}
                ref={setWordRef(index)}
                className="inline-block mr-[0.32em] text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500"
              >
                {word}
              </span>
            ))}
          </h1>
          <div
            ref={heroLineRef}
            className="mt-8 h-[2px] w-[260px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          />
        </div>

        <div
          ref={setCardRef(0)}
          className="absolute z-30 top-[15%] right-[10%] w-[320px] pointer-events-auto flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-2"
        >
          <span className="text-4xl lg:text-5xl font-bold text-[#d4ff32] mb-2">58%</span>
          <span className="text-sm font-medium text-neutral-400">Increase in pick up point use</span>
        </div>

        <div
          ref={setCardRef(1)}
          className="absolute z-30 bottom-[20%] right-[25%] w-[320px] pointer-events-auto flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-2"
        >
          <span className="text-4xl lg:text-5xl font-bold text-white mb-2">27%</span>
          <span className="text-sm font-medium text-neutral-400">Increase in pick up point use</span>
        </div>

        <div
          ref={setCardRef(2)}
          className="absolute z-30 top-[60%] right-[5%] w-[320px] pointer-events-auto flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-2"
        >
          <span className="text-4xl lg:text-5xl font-bold text-sky-400 mb-2">23%</span>
          <span className="text-sm font-medium text-neutral-400">Decrease in customer phone calls</span>
        </div>

        <div
          ref={setCardRef(3)}
          className="absolute z-30 top-[10%] left-[55%] w-[320px] pointer-events-auto flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-2"
        >
          <span className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">40%</span>
          <span className="text-sm font-medium text-neutral-400">Decrease in customer phone calls</span>
        </div>
      </div>
    </section>
  )
}

export default Hero