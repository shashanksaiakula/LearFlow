import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
}

const GoogleIcon = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill="#EA4335"
        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.934 11.934 0 0 0 12 0C7.27 0 3.193 2.582 1.014 6.409l4.252 3.356Z"
      />
      <Path
        fill="#4285F4"
        d="M23.491 12.273c0-.818-.073-1.609-.209-2.373H12v4.509h6.445a5.508 5.508 0 0 1-2.391 3.614l3.718 2.882c2.173-2.005 3.728-4.955 3.728-8.632Z"
      />
      <Path
        fill="#FBBC05"
        d="M1.014 6.409A11.874 11.874 0 0 0 0 12c0 1.99.49 3.864 1.355 5.514l4.227-3.323A7.054 7.054 0 0 1 4.91 12c0-1.014.218-1.986.618-2.873L1.014 6.41Z"
      />
      <Path
        fill="#34A853"
        d="M5.266 14.235 1.014 17.59A11.944 11.944 0 0 0 12 24c2.814 0 5.432-.818 7.518-2.318l-3.718-2.882a7.11 7.11 0 0 1-3.8 1.109 7.074 7.074 0 0 1-6.734-4.674Z"
      />
    </Svg>
  );
};

export default GoogleIcon;
