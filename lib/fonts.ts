// lib/fonts.ts
import { Pacifico, Quicksand, Raleway } from 'next/font/google';

export const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '600'] });
export const pacifico  = Pacifico({ subsets: ['latin'], weight: '400' });
export const raleway   = Raleway({ subsets: ['latin'], weight: ['400', '600', '700'] });