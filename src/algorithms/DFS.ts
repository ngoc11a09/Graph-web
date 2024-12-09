export class DFS {
  maxInt = 999999;

  private n: number;
  private start: number;
  private arr: number[][];
  private num: number[];
  private par: number[];
  private cnt: number;

  constructor(n: number, start: number, arr: number[][]) {
    this.n = n;
    this.start = start;
    this.arr = arr;
    this.num = Array(this.n).fill(0);
    this.par = Array(this.n).fill(-1);
    this.cnt = 0;
  }

  dfs = (u: number, pre: number) => {
    this.par[u] = pre;
    this.num[u] = ++this.cnt;
    for (let v = 0; v < this.n; v++) {
      if (this.arr[u][v] && v !== pre) {
        if (this.num[v] === 0) {
          this.dfs(v, u);
        }
      }
    }
  };

  solve = () => {
    this.dfs(this.start, -1);
    return { path: this.par, num: this.num };
  };
}
/*
9 0
0 1 0 0 0 1 0 1 0
0 0 1 0 0 0 0 0 0 
0 0 0 1 1 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 1 0 0 
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0
*/
