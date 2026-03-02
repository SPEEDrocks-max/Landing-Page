import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SmoothScroller = ({ children }) => {
	useEffect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		const lenis = new Lenis({
			duration: reduceMotion ? 0 : 1.6,
			easing: (t) => 1 - Math.pow(1 - t, 3),
			smoothWheel: true,
			smoothTouch: true,
			syncTouch: true,
			wheelMultiplier: 0.85,
			touchMultiplier: 0.95,
		})

		lenis.on('scroll', ScrollTrigger.update)

		const update = (time) => {
			lenis.raf(time * 1000)
		}

		gsap.ticker.add(update)
		gsap.ticker.lagSmoothing(500, 33)

		return () => {
			gsap.ticker.remove(update)
			lenis.destroy()
		}
	}, [])

	return children
}

export default SmoothScroller
