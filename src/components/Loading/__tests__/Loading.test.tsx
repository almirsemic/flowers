import Loading from '../Loading'
import { fireEvent, render } from '@testing-library/react'

describe('<Loading />', () => {
  test('Should call onNavigate successfully', () => {
    const spy = jest.fn()

    const { getByText } = render(
      <Loading error="Error placeholder" onNavigate={spy} />,
    )

    fireEvent.click(getByText(/Home/))

    expect(spy).toHaveBeenCalled()
  })
})
