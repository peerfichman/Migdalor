import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylishPlugins: [prefixer, rtlPlugin],
});

export default function CacheRTL ({children}) {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;

}