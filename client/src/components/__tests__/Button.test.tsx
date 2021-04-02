import React from 'react';
import { render } from '@testing-library/react';
import Button from '../Button';

test('Matches snapshot', () => {
  const shallow = render(<Button onClick={() => {}} />);
  expect(shallow.asFragment()).toMatchSnapshot();
});
