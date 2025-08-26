import React, { useEffect, useRef } from 'react'

export default function ParallaxBg(){
  const ref = useRef<HTMLDivElement|null>(null)
  
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    
    const onMove = (e: MouseEvent)=>{
      const x = (e.clientX / window.innerWidth - 0.5) * 8
      const y = (e.clientY / window.innerHeight - 0.5) * 8
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    
    const onScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      el.style.transform = `translate3d(0, ${rate}px, 0)`
    }
    
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    
    return ()=>{
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  },[])
  
  return (
    <div aria-hidden ref={ref} className="pointer-events-none fixed inset-0 -z-10">
      {/* SVG Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/assets/ganpati-bg.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cream/80 via-accent-warm/60 to-accent-cream/80" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-brand-primary rounded-full animate-float opacity-30" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-brand-secondary rounded-full animate-float" style={{animationDelay: '-2s'}} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-brand-primary rounded-full animate-float opacity-40" style={{animationDelay: '-4s'}} />
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-brand-secondary rounded-full animate-float" style={{animationDelay: '-1s'}} />
      </div>
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6E19' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </div>
  )
}
