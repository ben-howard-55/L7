import Centered from './Centered';

interface GraphProps {}

const Graph: React.FC<GraphProps> = () => (
  <div className={'w-100 bg-light border'} style={{ height: '300px' }}>
    <Centered>Graph goes here</Centered>
  </div>
);

export default Graph;
