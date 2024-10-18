import { OptionalInputType } from "../types/InputType";
const MAX_N = 10;

export const transformInput = (
  text: string,
  setTextValue: (value: string) => void
): OptionalInputType => {
  const validateInput = (n: number, input: Array<Array<number>>) => {
    if (n > MAX_N) throw new Error("Ma trận quá lớn");

    for (const [index, line] of input.entries()) {
      if (line.length !== n)
        throw new Error(
          `dòng thứ ${index + 1} dài: ${line.length}, mong đợi ${n}`
        );

      for (const item of line) {
        if (typeof item !== "number" || isNaN(item))
          throw new Error("Ma trận phải chứa số");
      }
    }
  };

  const input = text
    .replace(/[^\d\s\n-]/g, "")
    .replace(/[ ]{2,}/g, " ")
    .replace(/(?<=\d)\n+/g, "\n")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
  setTextValue(input);
  if (!input) {
    throw new Error("Không có dữ liệu");
    return undefined;
  }
  const arr: number[][] = input
    .split("\n")
    .map((item) => item.split(" "))
    .map((item) => item.map(Number));

  const n: number = arr[0][0];
  const start: number = arr[0][1];

  arr.shift();
  validateInput(n, arr);
  return { n, start, arr };
};

/* 
4 0
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0
*/
