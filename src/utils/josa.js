const lastJong = (word) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  return code >= 0 && code <= 11171 ? code % 28 : 0; // 0 = 받침 없음, 8 = ㄹ
};

export const iGa = (word) => (lastJong(word) ? "이" : "가");

export const euro = (word) => {
  const jong = lastJong(word);
  return jong && jong !== 8 ? "으로" : "로";
};