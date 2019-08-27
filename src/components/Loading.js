import React from 'react';
import { Button } from './index';

const color = getComputedStyle(document.documentElement).getPropertyValue(
  '--blue'
);

const Loading = () => (
  <div>
    <Button size="64px" loading color="color" />
  </div>
);

export default Loading;
