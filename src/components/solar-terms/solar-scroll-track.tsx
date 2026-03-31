'use client'

import { Children, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'

type SolarScrollTrackProps = {
  children: ReactNode
}

export function SolarScrollTrack({ children }: SolarScrollTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const totalItems = Children.count(children)
  const [activeIndex, setActiveIndex] = useState(0)

  function getDepth(index: number) {
    const distance = Math.abs(activeIndex - index)

    if (distance === 0) {
      return 'current'
    }

    if (distance === 1) {
      return 'near'
    }

    return 'far'
  }

  function getSide(index: number) {
    if (index === activeIndex) {
      return 'current'
    }

    return index < activeIndex ? 'before' : 'after'
  }

  function isEdgeNeighbor(index: number) {
    return Math.abs(activeIndex - index) === 1
  }

  function goToIndex(index: number) {
    const nextIndex = Math.max(0, Math.min(index, totalItems - 1))

    if (nextIndex === activeIndex) {
      return
    }

    setActiveIndex(nextIndex)
  }

  function handleItemClick(item: HTMLElement, index: number, event: MouseEvent<HTMLElement>) {
    if (index === activeIndex) {
      const bounds = item.getBoundingClientRect()
      const clickOffsetX = event.clientX - bounds.left

      goToIndex(clickOffsetX < bounds.width / 2 ? index - 1 : index + 1)
      return
    }

    if (Math.abs(activeIndex - index) === 1) {
      goToIndex(index)
    }
  }

  function handleTrackClick(event: MouseEvent<HTMLDivElement>) {
    const item = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-testid="solar-scroll-item"]')

    if (!item || !trackRef.current?.contains(item)) {
      return
    }

    const index = Number(item.dataset.scrollIndex)

    if (Number.isNaN(index)) {
      return
    }

    handleItemClick(item, index, event)
  }

  useEffect(() => {
    if (!trackRef.current) {
      return
    }

    const items = trackRef.current.querySelectorAll<HTMLElement>('[data-testid="solar-scroll-item"]')
    const activeItem = items[activeIndex]

    if (!activeItem) {
      return
    }

    if (typeof activeItem.scrollIntoView === 'function') {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeIndex])

  const wrappedChildren = Children.map(children, (child, index) => {
    if (child === null || child === undefined || typeof child === 'boolean') {
      return child
    }

    return (
      <div
        data-testid="solar-scroll-item"
        data-active={activeIndex === index ? 'true' : 'false'}
        data-depth={getDepth(index)}
        data-side={getSide(index)}
        data-edge-neighbor={isEdgeNeighbor(index) ? 'true' : 'false'}
        data-scroll-index={String(index)}
        className="solar-scroll-item shrink-0"
      >
        {child}
      </div>
    )
  })

  return (
    <section className="solar-scroll-shell px-2 pb-6 md:px-4">
      <div
        ref={trackRef}
        data-testid="solar-scroll-track"
        className="solar-scroll-track overflow-x-auto overflow-y-hidden"
        onClick={handleTrackClick}
      >
        <div className="solar-scroll-track__inner flex min-h-[60vh] w-max items-stretch gap-4 md:gap-5">
          {wrappedChildren}
        </div>
      </div>
    </section>
  )
}
