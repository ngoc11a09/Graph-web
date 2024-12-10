export class Dijkstra {
  maxInt = 999999;

  private n: number;
  private start: number;
  private end: number;
  private arr: number[][];
  private isVisited: boolean[];
  private path: number[];
  private cost: number[];

  constructor(n: number, start: number, end: number, arr: number[][]) {
    this.n = n;
    this.start = start;
    this.end = end;
    this.arr = arr;
    this.isVisited = Array(this.n).fill(false);
    this.path = Array(this.n).fill(-1);
    this.cost = Array(this.n).fill(this.maxInt);
  }

  dijkstra = () => {
    this.cost[this.start] = 0;

    for (let i = 0; i < this.n; i++) {
      let u = -1;
      for (let j = 0; j < this.n; j++) {
        if (!this.isVisited[j] && (u === -1 || this.cost[j] < this.cost[u])) {
          u = j;
        }
      }
      this.isVisited[u] = true;

      for (let v = 0; v < this.n; v++) {
        if (
          !this.isVisited[v] &&
          this.arr[u][v] &&
          this.cost[u] + this.arr[u][v] < this.cost[v]
        ) {
          this.cost[v] = this.cost[u] + this.arr[u][v];
          this.path[v] = u;
        }
      }
    }
    let totalCost = 0;
    for (let i = 0; i < this.n; i++) {
      if (this.path[i] === -1) continue;

      totalCost += this.arr[i][this.path[i]];
    }
    if (totalCost === this.maxInt) {
      this.path = []; // Không có đường đi
    }

    const resultPath = [];
    let current = this.end;
    while (current !== -1) {
      resultPath.unshift(current);
      current = this.path[current];
    }
    const tracePath = Array(this.n).fill(-1);
    for (let i = 1; i < resultPath.length; i++) {
      tracePath[resultPath[i]] = resultPath[i - 1];
    }

    return { totalCost, path: tracePath, cost: this.cost[this.end] };
  };
}
