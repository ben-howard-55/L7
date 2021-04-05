import { Calendar } from '../api/client';
import Centered from './Layout/Centered';

interface GraphProps {
  calendar?: Calendar;
  position?: number;
}

const length = 20;

const Graph: React.FC<GraphProps> = ({ calendar = [], position = 0 }) => {
  const calendarLength = calendar.length;
  console.log(`Length: ${calendarLength}`);
  if (calendarLength === 0) {
    return <p>....</p>;
  }

  // generate previous
  const previous: Calendar = [];

  // generate upcoming
  const upcoming: Calendar = [];

  for (let i = 0; i < length; i++) {
    // console.log((calendarLength - 1 + (position - i - 1) % calendarLength));
    previous.push(calendar[(position + i + (calendarLength - length)) % calendarLength]);
    upcoming.push(calendar[(position + i + 1) % calendarLength]);
  }

  const today = calendar[position];

  return (
    <Centered>
      <div className={'graph'}>
        {previous.map((d, i) =>
          d.map((n) => <div className={`dot dot-${n}-past`} style={{ gridColumnStart: i + 1 }} />)
        )}
        {today.map((n) => (
          <div className={`dot dot-${n}`} style={{ gridColumnStart: length + 1 }} />
        ))}
        {upcoming.map((d, i) =>
          d.map((n) => (
            <div className={`dot dot-${n}-outline`} style={{ gridColumnStart: i + length + 2 }} />
          ))
        )}
      </div>
    </Centered>
  );
};
export default Graph;
