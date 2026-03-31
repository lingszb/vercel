import { render, within } from '@testing-library/react'
import { solarTerms } from '@/data/solar-terms'
import { getSolarTermAnchorId } from '@/lib/solar-terms/anchors'
import { SolarTermPanel } from './solar-term-panel'

describe('SolarTermPanel', () => {
  it('renders a full scroll panel for a solar term', () => {
    const item = solarTerms[0]
    const { container } = render(<SolarTermPanel item={item} />)

    const article = container.querySelector(`#${getSolarTermAnchorId(item.id)}`)
    const panel = within(article as HTMLElement)

    expect(article).toBeInTheDocument()
    expect(panel.getByRole('heading', { name: '立春' })).toBeInTheDocument()
    expect(panel.getByText('Lichun')).toBeInTheDocument()
    expect(panel.getByText(/2月3日-5日/)).toBeInTheDocument()
    expect(panel.getByText(item.summary)).toBeInTheDocument()
    expect(panel.getByText(item.sceneLine)).toBeInTheDocument()
    expect(panel.getByText('东风解冻')).toBeInTheDocument()
    expect(panel.getByText('迎春')).toBeInTheDocument()
    expect(panel.getByText('停杯不饮待春来，和气先春动六街。')).toBeInTheDocument()
    expect(panel.getByText('农事')).toBeInTheDocument()
  })

  it('renders the visual scroll sections for painting, marginalia, and inscription', () => {
    const item = solarTerms[0]
    const { container } = render(<SolarTermPanel item={item} />)

    const article = container.querySelector(`#${getSolarTermAnchorId(item.id)}`)
    const panel = within(article as HTMLElement)

    expect(panel.getByText('岁时画境')).toBeInTheDocument()
    expect(panel.getByText('物候边注')).toBeInTheDocument()
    expect(panel.getByText('节令题跋')).toBeInTheDocument()
  })

  it('renders the image brief for narrative illustration preparation', () => {
    const item = solarTerms[0]
    const { container } = render(<SolarTermPanel item={item} />)

    const article = container.querySelector(`#${getSolarTermAnchorId(item.id)}`)
    const panel = within(article as HTMLElement)

    expect(panel.getByText('叙事画稿')).toBeInTheDocument()
    expect(panel.getByText(item.imageBrief.narrative)).toBeInTheDocument()
    expect(panel.getByText(item.imageBrief.mood)).toBeInTheDocument()

    item.imageBrief.visualElements.forEach((entry) => {
      expect(panel.getByText(entry)).toBeInTheDocument()
    })
  })

  it('renders the generated illustration when image source exists', () => {
    const item = solarTerms[0]
    const { container } = render(<SolarTermPanel item={item} />)

    const article = container.querySelector(`#${getSolarTermAnchorId(item.id)}`)
    const panel = within(article as HTMLElement)
    const image = panel.getByAltText('立春节气插画')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(item.imageSrc as string)))
  })
})
