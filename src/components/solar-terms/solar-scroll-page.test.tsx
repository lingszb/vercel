import { fireEvent, render, screen } from '@testing-library/react'
import { SolarScrollPage } from './solar-scroll-page'

describe('SolarScrollPage', () => {
  it('renders the intro, 24 solar term panels, outro, and click-through navigation copy', () => {
    render(<SolarScrollPage />)

    expect(screen.getByRole('heading', { name: '岁时纪事图卷' })).toBeInTheDocument()
    expect(screen.getByText('卷首小引')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '立春' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '大寒' })).toBeInTheDocument()
    expect(screen.getByText('收卷余韵')).toBeInTheDocument()
    expect(screen.getByText('长卷至此，周而复始。')).toBeInTheDocument()
    expect(screen.getByText(/点击当前画卷左右半侧可前后翻页/)).toBeInTheDocument()
    expect(screen.getByText(/请点当前画卷左右半侧翻页，或点相邻节气页切入/)).toBeInTheDocument()

    expect(screen.queryByText('横向拖拽或滑动展卷')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '上一项' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '下一项' })).not.toBeInTheDocument()
    expect(screen.queryByText('按季节浏览')).not.toBeInTheDocument()
    expect(screen.queryByText('重置筛选')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '展开立春详情' })).not.toBeInTheDocument()

    expect(screen.getAllByRole('article')).toHaveLength(24)
  })

  it('switches from the intro to the adjacent solar term card when clicking the real page item', () => {
    render(<SolarScrollPage />)

    const items = screen.getAllByTestId('solar-scroll-item')

    fireEvent.click(items[1])

    expect(items[0]).toHaveAttribute('data-active', 'false')
    expect(items[1]).toHaveAttribute('data-active', 'true')
    expect(items[1]).toHaveAttribute('data-depth', 'current')
  })
})
