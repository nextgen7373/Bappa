import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 mt-auto bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Logo and Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/assets/face image.jpg" 
                alt="Bappa.ai" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-gray-700">
                Bappa.ai made by NextGen World
              </p>
              <p className="text-xs text-gray-500 mt-1">
                AI-powered spiritual guidance and wisdom
              </p>
            </div>
          </div>
          
          {/* Right: Mantra */}
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="hidden sm:inline">🙏</span>
            <span className="font-medium">Om Gan Ganpataye Namo Namah</span>
            <span className="hidden sm:inline">🙏</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
