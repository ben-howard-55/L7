import { Spinner } from 'react-bootstrap';
import Centered from './Layout/Centered';

const Loading: React.FC = () => (
  <Centered>
    <Spinner animation={'border'} />
  </Centered>
);
export default Loading;
