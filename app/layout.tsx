import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title:'Dr. Althea | O essencial para sua pele',
 description:'Conheça o 345 Relief Cream. Hidratação leve e um ritual de cuidado diário com a pele.',
 icons:{icon:'/favicon.png',shortcut:'/favicon.png',apple:'/favicon.png'}
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
