import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata: Metadata = {
 title:'Dr. Althea | O essencial para sua pele',
 description:'Conheça o 345 Relief Cream. Hidratação leve e um ritual de cuidado diário com a pele.',
 icons:{icon:'/favicon.png',shortcut:'/favicon.png',apple:'/favicon.png'}
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){
 return <html lang="pt-BR"><body>
  {children}
  <Script id="meta-pixel" strategy="afterInteractive">{`
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
   n.queue=[];t=b.createElement(e);t.async=!0;
   t.src=v;s=b.getElementsByTagName(e)[0];
   s.parentNode.insertBefore(t,s)}(window, document,'script',
   'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', '1318051010297653');
   fbq('track', 'PageView');
  `}</Script>
  <noscript><img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1318051010297653&ev=PageView&noscript=1" alt=""/></noscript>
 </body></html>;
}
