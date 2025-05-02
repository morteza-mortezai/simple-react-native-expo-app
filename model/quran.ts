interface Ayah {
  id: number;
  text: string;
}
export interface Surah {
  id: number;
  name: string;
  verses?: Ayah[];
  transliteration: string;
  type: string;
  total_verses: number;
}
