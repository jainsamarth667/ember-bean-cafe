import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const cinematicEase = 'power3.out'
export const slowEase = 'expo.out'

export { gsap, ScrollTrigger }
