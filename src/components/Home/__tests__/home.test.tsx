import { shallow, ShallowWrapper } from 'enzyme';
import Home from '../Home';
import { Provider } from 'react-redux';
import store from '../../../Redux/store';

describe('Home component', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper: ShallowWrapper = shallow(
        <Provider store={store}>
          <Home />
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
