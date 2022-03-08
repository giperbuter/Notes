import * as React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg
  viewBox="0 0 24 24"
  fill="#000000ff"
>
  <path
    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
  />
</svg>
`;

let Icon = () => {
  return (
    <SvgCss xml={xml} width="100%" height="100%" fillOpacity={1} />
  )
}

export default Icon;