export default class KruskalMST {
  private parent: number[];
  private rank: number[];
  private edges: number[][];
  private n: number;
  private start: number;
  private arr: number[][];
  private path: number[][];

  constructor(n: number, start: number, arr: number[][]) {
    this.n = n;
    this.start = start;
    this.arr = arr;
    this.edges = [];
    this.path = [];
    this.parent = [];
    this.rank = [];
  }

  convertToEdges(): number[][] {
    this.edges = [];
    for (let i = 0; i < this.n; i++) {
      for (let j = i + 1; j < this.n; j++) {
        if (this.arr[i][j] !== 0) {
          this.edges.push([i, j, this.arr[i][j]]);
        }
      }
    }
    return this.edges;
  }

  init(): void {
    for (let i = 0; i < this.n; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  findParent(u: number): number {
    if (this.parent[u] === u) {
      return u;
    }
    return (this.parent[u] = this.findParent(this.parent[u]));
  }

  unionSet(u: number, v: number): void {
    u = this.findParent(u);
    v = this.findParent(v);

    if (this.rank[u] < this.rank[v]) {
      this.parent[u] = v;
    } else if (this.rank[u] > this.rank[v]) {
      this.parent[v] = u;
    } else {
      this.parent[v] = u;
      this.rank[u]++;
    }
  }

  kruskal() {
    this.edges = this.convertToEdges();

    this.edges.sort((a, b) => a[2] - b[2]);

    this.init();

    let minCost = 0;

    for (let i = 0; i < this.edges.length; i++) {
      const [u, v, wt] = this.edges[i];
      const v1 = this.findParent(u);
      const v2 = this.findParent(v);

      if (v1 !== v2) {
        this.unionSet(v1, v2);
        minCost += wt;
        this.path.push([u, v]);
      }
    }

    return { totalCost: minCost, path: this.path };
  }
}

/*
5 0
0 10 6 5 0
10 0 0 15 0
6 0 0 4 0
5 15 4 0 0
0 0 0 0 0
*/
