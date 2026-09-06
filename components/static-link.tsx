import type {ComponentProps} from 'react';
// Full document navigation works reliably on GitHub Pages static exports.
export default function StaticLink(props:ComponentProps<'a'>){return <a {...props}/>;}
