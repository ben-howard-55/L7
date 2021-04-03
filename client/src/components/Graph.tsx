import { Calendar } from '../api/client';
import Centered from './Layout/Centered';

interface GraphProps {
  calendar?: Calendar;
}

const Graph: React.FC<GraphProps> = ({ calendar = [] }) => (
  <div className={'w-100 bg-light border'} style={{ height: '300px' }}>
    <Centered>
      <div>
        Graph goes here
        <br />
        {calendar.map((d) => (
          <>
            <span>{d}</span>
            <br />
          </>
        ))}
      </div>
    </Centered>
  </div>
);

export default Graph;
