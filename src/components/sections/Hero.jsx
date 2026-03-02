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
  const statCards = [
    {
      value: '58%',
      label: 'Increase in pick up point use',
      valueClass: 'text-[#d4ff32]',
      positionClass: 'top-[12%] right-[4%] sm:right-[8%] md:top-[15%] md:right-[10%]',
    },
    {
      value: '27%',
      label: 'Increase in pick up point use',
      valueClass: 'text-white',
      positionClass: 'bottom-[16%] right-[24%] sm:right-[20%] md:bottom-[20%] md:right-[25%]',
    },
    {
      value: '23%',
      label: 'Decrease in customer phone calls',
      valueClass: 'text-sky-400',
      positionClass: 'top-[58%] right-[3%] md:top-[60%] md:right-[5%]',
    },
    {
      value: '40%',
      label: 'Decrease in customer phone calls',
      valueClass: 'text-orange-500',
      positionClass: 'top-[10%] left-[48%] md:top-[15%] md:left-[60%]',
    },
  ]

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
    <section ref={sectionRef} className="relative h-[175svh] w-full md:h-[165vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black @container">
        <div ref={splineRef} className="spline-bg absolute inset-x-0 -top-[28%] -bottom-[12%] z-0 pointer-events-none">
          <Spline scene="https://prod.spline.design/QE5OQ5o5XPMEjIYp/scene.splinecode" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />

        <div className="absolute z-20 top-[38%] left-[6cqw] md:top-[40%] md:left-[6cqw] pointer-events-none">
          <h1
            className="block text-left text-[clamp(2rem,5cqw,5rem)] md:text-[clamp(3rem,6cqw,7.5rem)] font-black uppercase leading-[0.95] tracking-[0.06em] md:tracking-[0.09em] drop-shadow-2xl"
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
            className="mt-6 md:mt-8 h-[2px] w-[clamp(160px,22cqw,260px)] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          />
        </div>

        {statCards.map((card, index) => (
          <div
            key={card.value}
            ref={setCardRef(index)}
            className={`absolute z-30 ${card.positionClass} w-[min(44%,220px)] sm:w-[min(40%,260px)] md:w-[280px] lg:w-[320px] pointer-events-auto flex flex-col justify-center rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-md shadow-2xl transition-transform hover:-translate-y-2`}
          >
            <span className={`mb-1 sm:mb-2 text-3xl sm:text-4xl lg:text-5xl font-bold ${card.valueClass}`}>{card.value}</span>
            <span className="text-[11px] sm:text-xs lg:text-xl font-medium text-white">{card.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero