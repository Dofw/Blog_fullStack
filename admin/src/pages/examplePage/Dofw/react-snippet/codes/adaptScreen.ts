export const code = `
<script>

import { useCallback, useEffect } from 'react';

export default function useScreenAdapt(isScreen) {
  const adaptIt = useCallback(() => {
    const winW = isScreen ? 3840 : 1920 || window.screen.width;
    // const winW = false ? 3840 : 1920 || window.screen.width;
    const winH = 1080 || window.screen.height;
    const ratioX = (document.documentElement.clientWidth / winW).toFixed(5);
    const ratioY = (document.documentElement.clientHeight / winH).toFixed(5);

    // const ratio = Math.max(ratioX, ratioY);

    const stylessss = \`
      width: \${winW}px!important;
      height: \${winH}px!important;
      transform: scale(\${ratioX}, \${ratioY})!important;
      overflow:hidden!important;
      transform-origin: left top 0px!important;
      user-select: none;
    \`;

    document.getElementsByTagName('body')[0].setAttribute('style', stylessss);
  }, []);
  
  useEffect(() => {
    adaptIt();
    window.addEventListener('resize', adaptIt, false);
    return () => {
      document.getElementsByTagName('body')[0].removeAttribute('style');
      window.removeEventListener('resize', adaptIt, false);
    };
  }, []);
}

</script>
`
