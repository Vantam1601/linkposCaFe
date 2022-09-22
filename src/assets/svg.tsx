import Svg, {
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
  Image,
  Ellipse,
  Rect,
  LinearGradient,
  Stop,
  Pattern,
  Text,
  TSpan,
  Mask,
  Use,
} from 'react-native-svg';
import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

export function IconLoadPoint(props: any) {
  return (
    <svg id="_x31__px" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m20 24h-3c-.551 0-1-.449-1-1v-5h-2.5c-.202 0-.385-.122-.462-.309-.078-.187-.035-.402.108-.545l5-5c.195-.195.512-.195.707 0l5 5c.143.143.186.358.108.545-.076.187-.259.309-.461.309h-2.5v5c0 .551-.449 1-1 1zm-5.293-7h1.793c.276 0 .5.224.5.5v5.5h3v-5.5c0-.276.224-.5.5-.5h1.793l-3.793-3.793z"></path><path d="m13.5 21h-11c-1.378 0-2.5-1.122-2.5-2.5v-13c0-1.378 1.122-2.5 2.5-2.5h19c1.378 0 2.5 1.122 2.5 2.5v9c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-9c0-.827-.673-1.5-1.5-1.5h-19c-.827 0-1.5.673-1.5 1.5v13c0 .827.673 1.5 1.5 1.5h11c.276 0 .5.224.5.5s-.224.5-.5.5z"></path><path d="m7.5 16h-7c-.276 0-.5-.224-.5-.5v-7c0-.276.224-.5.5-.5h7c1.378 0 2.5 1.122 2.5 2.5v3c0 1.378-1.122 2.5-2.5 2.5zm-6.5-1h6.5c.827 0 1.5-.673 1.5-1.5v-3c0-.827-.673-1.5-1.5-1.5h-6.5z"></path><path d="m5 14c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1z"></path></svg>
  );
}