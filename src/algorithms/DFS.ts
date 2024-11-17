export class DFS {
  maxInt = 999999;

  private n: number;
  private start: number;
  private arr: number[][];
  private low: number[];
  private num: number[];
  private tail: number[];
  private par: number[];
  private cnt: number;

  constructor(n: number, start: number, arr: number[][]) {
    this.n = n;
    this.start = start;
    this.arr = arr;
    this.low = Array(this.n).fill(0);
    this.num = Array(this.n).fill(0);
    this.tail = Array(this.n).fill(-1);
    this.par = Array(this.n).fill(-1);
    this.cnt = 0;
  }

  dfs = (u: number, pre: number) => {
    this.par[u] = pre;
    this.num[u] = this.low[u] = ++this.cnt;
    for (let v = 0; v < this.n; v++) {
      if (this.arr[u][v] && v !== pre) {
        if (this.num[v] === 0) {
          this.dfs(v, u);
          this.low[u] = Math.min(this.low[u], this.low[v]);
        } else {
          this.low[u] = Math.min(this.low[u], this.num[v]);
        }
      }
      this.tail[u] = this.cnt;
    }
    return { path: this.par, num: this.num };
  };

  solve = () => {
    // console.log("par", this.par);
    // console.log("num", this.num);
    // console.log("low", this.low);
    // console.log("tail", this.tail);
    // console.log(this.arr);

    return this.dfs(this.start, -1);
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
