import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Carousel } from './Carousel'
import { assetPath } from '../../App'
import { siteContent } from '../../data/siteContent'

describe('Carousel', () => {
  it('moves to the next scenario from the arrow control', async () => {
    render(<Carousel items={siteContent.events} assetPath={assetPath} />)

    expect(screen.getByRole('heading', { name: siteContent.events[0].title })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Следующее событие' }))
    await waitFor(() => expect(screen.getByRole('heading', { name: siteContent.events[1].title })).toBeInTheDocument())
  })
})
