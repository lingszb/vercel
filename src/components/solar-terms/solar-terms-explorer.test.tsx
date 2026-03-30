import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { solarTerms } from '@/data/solar-terms'
import { SolarTermsExplorer } from './solar-terms-explorer'

it('filters by season and toggles the detailed card content', async () => {
  const user = userEvent.setup()

  render(
    <SolarTermsExplorer
      items={solarTerms}
      initialFilters={{}}
      onFiltersChange={() => {}}
    />,
  )

  await user.click(screen.getByRole('button', { name: '春' }))

  expect(screen.getByText('立春')).toBeInTheDocument()
  expect(screen.queryByText('立冬')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: '展开立春详情' }))

  expect(screen.getByText('东风解冻')).toBeInTheDocument()
  expect(screen.getByText('迎春')).toBeInTheDocument()
})

it('syncs visible items when initial filters change from the url', () => {
  const { rerender } = render(
    <SolarTermsExplorer
      key="spring"
      items={solarTerms}
      initialFilters={{ season: 'spring' }}
      onFiltersChange={() => {}}
    />,
  )

  expect(screen.getByText('立春')).toBeInTheDocument()
  expect(screen.queryByText('立冬')).not.toBeInTheDocument()

  rerender(
    <SolarTermsExplorer
      key="winter"
      items={solarTerms}
      initialFilters={{ season: 'winter' }}
      onFiltersChange={() => {}}
    />,
  )

  expect(screen.getByText('立冬')).toBeInTheDocument()
  expect(screen.queryByText('立春')).not.toBeInTheDocument()
})
