import { OptionalInputType } from "../types/InputType";
const MAX_N = 10;

const isSymmetricMatrix = (arr: Array<Array<number>>, n: number): boolean => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] !== arr[j][i]) {
        return false;
      }
    }
  }
  return true;
};

export const transformInput = (
  text: string,
  setTextValue: (value: string) => void,
  isDigraph: boolean,
  startNode: boolean
): OptionalInputType => {
  const validateInput = (
    n: number,
    start: number,
    input: Array<Array<number>>
  ) => {
    if (input.length !== n) throw new Error("Số hàng không khớp với số đỉnh");

    if (n > MAX_N) throw new Error("Ma trận quá lớn");
    if (n < 1) throw new Error("Ma trận quá nhỏ");

    if (startNode) {
      if (typeof start !== "number" || start < 0 || start >= n)
        throw new Error("Đỉnh bắt đầu không hợp lệ");
    } else {
      if (start || start == 0)
        throw new Error("Dòng đầu tiên chỉ chứa số đỉnh của đồ thị");
      start = 0;
    }
    for (const [index, line] of input.entries()) {
      if (line.length !== n)
        throw new Error(
          `Hàng thứ ${index + 1} của ma trận có ${
            line.length
          } đỉnh, thay vì ${n} đỉnh`
        );

      for (const item of line) {
        if (typeof item !== "number" || isNaN(item))
          throw new Error("Ma trận phải chứa số");
      }
    }
    if (!isDigraph) {
      if (!isSymmetricMatrix(input, n))
        throw new Error("Đồ thị không phải vô hướng");
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
  }
  const arr: number[][] = input
    .split("\n")
    .map((item) => item.split(" "))
    .map((item) => item.map(Number));

  const n: number = arr[0][0];
  const start: number = arr[0][1];

  arr.shift();
  validateInput(n, start, arr);

  return { n, start, arr };
};

export const transformMatrix = (
  n: number,
  start: number,
  text: string,
  setTextValue: (value: string) => void,
  isDigraph: boolean,
  startNode: boolean,
  endNode?: number
): OptionalInputType => {
  const isSymmetricMatrix = (arr: Array<Array<number>>, n: number): boolean => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (arr[i][j] !== arr[j][i]) {
          return false;
        }
      }
    }
    return true;
  };
  const validateInput = (
    n: number,
    start: number,
    input: Array<Array<number>>
  ) => {
    if (input.length !== n) throw new Error("Số hàng không khớp với số đỉnh");

    if (n > MAX_N) throw new Error("Ma trận quá lớn");
    if (n < 1) throw new Error("Ma trận quá nhỏ");

    if (startNode) {
      if (typeof start !== "number" || start < 0 || start >= n)
        throw new Error("Đỉnh bắt đầu không hợp lệ");
    } else {
      if (start || start == 0)
        throw new Error("Dòng đầu tiên chỉ chứa số đỉnh của đồ thị");
      start = 0;
    }
    for (const [index, line] of input.entries()) {
      if (line.length !== n)
        throw new Error(
          `Hàng thứ ${index + 1} của ma trận có ${
            line.length
          } đỉnh, thay vì ${n} đỉnh`
        );

      for (const item of line) {
        if (typeof item !== "number" || isNaN(item))
          throw new Error("Ma trận phải chứa số");
      }
    }
    if (!isDigraph) {
      if (!isSymmetricMatrix(input, n))
        throw new Error("Đồ thị không phải vô hướng");
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
  }
  const arr: number[][] = input
    .split("\n")
    .map((item) => item.split(" "))
    .map((item) => item.map(Number));
  validateInput(n, start, arr);

  return { n, start, endNode, arr };
};

/* 
4 0
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0
*/
