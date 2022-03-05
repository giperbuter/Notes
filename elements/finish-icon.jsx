import * as React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg
  viewBox="0 0 24 24"
  fill="#000000ff"
>
  <path
    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
  />
</svg>
`;

let PlusIcon = () => {
  return (
    <SvgCss xml={xml} width="100%" height="100%" />
  )
}

export default PlusIcon;