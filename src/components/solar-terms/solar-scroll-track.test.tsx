import { act, fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { SolarScrollTrack } from './solar-scroll-track'

function StaticPage({ title }: { title: string }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{title}正文</p>
    </article>
  )
}

describe('SolarScrollTrack', () => {
  it('starts at the first item without navigation buttons', () => {
    render(
      <SolarScrollTrack>
        <div>卷首</div>
        <div>立春</div>
        <div>雨水</div>
      </SolarScrollTrack>,
    )

    const items = screen.getAllByTestId('solar-scroll-item')

    expect(screen.queryByRole('button', { name: '上一项' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '下一项' })).not.toBeInTheDocument()
    expect(items[0]).toHaveAttribute('data-active', 'true')
    expect(items[0]).toHaveAttribute('data-depth', 'current')
    expect(items[1]).toHaveAttribute('data-depth', 'near')
    expect(items[1]).toHaveAttribute('data-side', 'after')
  })

  it('moves to the next item when clicking the adjacent solar term border', () => {
    render(
      <SolarScrollTrack>
        <div>卷首</div>
        <div>立春</div>
        <div>雨水</div>
        <div>惊蛰</div>
      </SolarScrollTrack>,
    )

    const items = screen.getAllByTestId('solar-scroll-item')
    fireEvent.click(items[1])

    expect(items[0]).toHaveAttribute('data-depth', 'near')
    expect(items[0]).toHaveAttribute('data-side', 'before')
    expect(items[1]).toHaveAttribute('data-active', 'true')
    expect(items[1]).toHaveAttribute('data-depth', 'current')
    expect(items[2]).toHaveAttribute('data-depth', 'near')
    expect(items[2]).toHaveAttribute('data-side', 'after')
    expect(items[3]).toHaveAttribute('data-depth', 'far')
  })

  it('marks only the immediate neighbors of the active item as edge-adjacent', () => {
    render(
      <SolarScrollTrack>
        <div>卷首</div>
        <div>立春</div>
        <div>雨水</div>
        <div>惊蛰</div>
        <div>春分</div>
      </SolarScrollTrack>,
    )

    const items = screen.getAllByTestId('solar-scroll-item')
    fireEvent.click(items[1])
    fireEvent.click(items[2])

    expect(items[1]).toHaveAttribute('data-edge-neighbor', 'true')
    expect(items[3]).toHaveAttribute('data-edge-neighbor', 'true')
    expect(items[2]).toHaveAttribute('data-edge-neighbor', 'false')
    expect(items[0]).toHaveAttribute('data-edge-neighbor', 'false')
    expect(items[4]).toHaveAttribute('data-edge-neighbor', 'false')
  })

  it('ignores clicks on non-adjacent items and allows clicking the previous border to return', () => {
    render(
      <SolarScrollTrack>
        <div>卷首</div>
        <div>立春</div>
        <div>雨水</div>
        <div>惊蛰</div>
      </SolarScrollTrack>,
    )

    const items = screen.getAllByTestId('solar-scroll-item')

    fireEvent.click(items[3])
    expect(items[0]).toHaveAttribute('data-active', 'true')

    fireEvent.click(items[1])
    fireEvent.click(items[0])
    expect(items[0]).toHaveAttribute('data-active', 'true')
  })

  it('moves backward or forward when clicking the left or right half of the active item', () => {
    render(
      <SolarScrollTrack>
        <div>卷首</div>
        <div>立春</div>
        <div>雨水</div>
        <div>惊蛰</div>
      </SolarScrollTrack>,
    )

    const items = screen.getAllByTestId('solar-scroll-item')

    vi.spyOn(items[1], 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 100,
      right: 200,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    })

    fireEvent.click(items[1])
    expect(items[1]).toHaveAttribute('data-active', 'true')

    fireEvent.click(items[1], { clientX: 20 })
    expect(items[0]).toHaveAttribute('data-active', 'true')

    fireEvent.click(items[1])
    fireEvent.click(items[1], { clientX: 180 })
    expect(items[2]).toHaveAttribute('data-active', 'true')
  })

  it('switches correctly when children are custom components instead of plain divs', () => {
    render(
      <SolarScrollTrack>
        <StaticPage title="卷首" />
        <StaticPage title="立春" />
        <StaticPage title="雨水" />
        <StaticPage title="惊蛰" />
      </SolarScrollTrack>,
    )

    const items = screen.getAllByTestId('solar-scroll-item')

    vi.spyOn(items[1], 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 100,
      right: 200,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    })

    fireEvent.click(screen.getByText('立春正文'))
    expect(items[1]).toHaveAttribute('data-active', 'true')

    fireEvent.click(screen.getByText('立春正文'), { clientX: 180 })
    expect(items[2]).toHaveAttribute('data-active', 'true')
  })

  it('switches to the next item without a second delayed motion phase after the state change', () => {
    vi.useFakeTimers()

    try {
      render(
        <SolarScrollTrack>
          <div>卷首</div>
          <div>立春</div>
          <div>雨水</div>
          <div>惊蛰</div>
        </SolarScrollTrack>,
      )

      const items = screen.getAllByTestId('solar-scroll-item')
      fireEvent.click(items[1])

      expect(items[0]).not.toHaveAttribute('data-motion')
      expect(items[1]).not.toHaveAttribute('data-motion')
      expect(items[2]).not.toHaveAttribute('data-motion')

      act(() => {
        vi.advanceTimersByTime(700)
      })

      expect(items[0]).toHaveAttribute('data-depth', 'near')
      expect(items[1]).toHaveAttribute('data-depth', 'current')
      expect(items[2]).toHaveAttribute('data-depth', 'near')
      expect(items[0]).not.toHaveAttribute('data-motion')
      expect(items[1]).not.toHaveAttribute('data-motion')
      expect(items[2]).not.toHaveAttribute('data-motion')
    } finally {
      vi.useRealTimers()
    }
  })
})
