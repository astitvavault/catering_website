import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import CookieBanner from '../CookieBanner'

describe('CookieBanner', () => {
  it('renders nothing (GoDaddy analytics removed for Netlify)', () => {
    const { container } = render(<CookieBanner />)
    expect(container).toBeEmptyDOMElement()
  })
})
