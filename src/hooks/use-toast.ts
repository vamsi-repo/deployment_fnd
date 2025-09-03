import { useState } from 'react'

interface ToastProps {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

// Simple toast implementation
let toastContainer: HTMLDivElement | null = null

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

const showToast = ({ title, description, variant = 'default' }: ToastProps) => {
  const container = createToastContainer()
  
  const toast = document.createElement('div')
  toast.className = `min-w-[300px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 transform translate-x-full ${
    variant === 'destructive' ? 'border-red-200 bg-red-50' : ''
  }`
  
  toast.innerHTML = `
    <div class="flex">
      <div class="flex-1">
        <h4 class="text-sm font-semibold ${variant === 'destructive' ? 'text-red-800' : 'text-gray-900'}">${title}</h4>
        <p class="text-sm ${variant === 'destructive' ? 'text-red-700' : 'text-gray-600'} mt-1">${description}</p>
      </div>
      <button class="ml-4 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `
  
  container.appendChild(toast)
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full')
  }, 10)
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('translate-x-full')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 5000)
}

export const toast = showToast

export const useToast = () => {
  return { toast: showToast }
}