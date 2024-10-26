export class TSP {
  private n: number;
  private start: number;
  private arr: number[][];
  private final_path: number[];
  private final_res: number;
  private isVisited: boolean[];

  constructor(n: number, start: number, arr: number[][]) {
    this.n = n;
    this.start = start;
    this.arr = arr;
    this.final_path = Array(n + 1).fill(-1);
    this.final_res = Number.MAX_SAFE_INTEGER;
    this.isVisited = Array(n).fill(false);
  }

  copyToFinal(curr_path: number[]): void {
    for (let i = 0; i < this.n; i++) {
      this.final_path[i] = curr_path[i];
    }
    this.final_path[this.n] = curr_path[0];
  }

  firstMin(i: number) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let k = 0; k < this.n; k++) {
      if (this.arr[i][k] < min && i !== k && this.arr[i][k] !== 0) {
        min = this.arr[i][k];
      }
    }
    if (min === Number.MAX_SAFE_INTEGER) {
      throw new Error(
        "Có ít nhất 1 đỉnh không liên thông. Hãy nhập lại đầu vào cho đồ thị."
      );
    }
    return min;
  }

  secondMin(i: number) {
    let first = Number.MAX_SAFE_INTEGER;
    let second = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < this.n; j++) {
      if (i === j || this.arr[i][j] === 0) {
        continue;
      }
      if (this.arr[i][j] <= first) {
        second = first;
        first = this.arr[i][j];
      } else if (this.arr[i][j] <= second && this.arr[i][j] !== first) {
        second = this.arr[i][j];
      }
    }
    if (second === Number.MAX_SAFE_INTEGER) {
      throw new Error("Có ít nhất 1 đỉnh không liên thông");
    }
    return second;
  }

  TSPRec(
    curr_bound: number,
    curr_weight: number,
    level: number,
    curr_path: number[]
  ) {
    if (level == this.n) {
      if (this.arr[curr_path[level - 1]][curr_path[0]] !== this.start) {
        const curr_res =
          curr_weight + this.arr[curr_path[level - 1]][curr_path[0]];
        if (curr_res < this.final_res) {
          this.copyToFinal(curr_path);
          this.final_res = curr_res;
        }
      }
      return;
    }

    for (let i = 0; i < this.n; i++) {
      // Consider next vertex if it is not same (diagonal
      // entry in arracency matrix and not visited
      // already)
      if (this.arr[curr_path[level - 1]][i] !== 0 && !this.isVisited[i]) {
        const temp = curr_bound;
        curr_weight += this.arr[curr_path[level - 1]][i];
        // different computation of curr_bound for
        // level 2 from the other levels
        if (level == 1) {
          curr_bound -=
            (this.firstMin(curr_path[level - 1]) + this.firstMin(i)) / 2;
        } else {
          curr_bound -=
            (this.secondMin(curr_path[level - 1]) + this.firstMin(i)) / 2;
        }

        // curr_bound + curr_weight is the actual lower bound
        // for the node that we have this.arrived on
        // If current lower bound < final_res, we need to explore
        // the node further
        if (curr_bound + curr_weight < this.final_res) {
          curr_path[level] = i;
          this.isVisited[i] = true;
          // call TSPRec for the next level
          this.TSPRec(curr_bound, curr_weight, level + 1, curr_path);
        }

        // Else we have to prune the node by resetting
        // all changes to curr_weight and curr_bound
        curr_weight -= this.arr[curr_path[level - 1]][i];
        curr_bound = temp;

        // Also reset the visited array
        this.isVisited.fill(false);
        for (let j = 0; j <= level - 1; j++)
          this.isVisited[curr_path[j]] = true;
      }
    }
  }
  TSP() {
    const curr_path = Array(this.n + 1).fill(-1);
    // Calculate initial lower bound for the root node
    // using the formula 1/2 * (sum of first min +
    // second min) for all edges.
    // Also initialize the curr_path and visited array
    let curr_bound = 0;
    this.isVisited.fill(false);

    // compute initial bound
    for (let i = 0; i < this.n; i++) {
      curr_bound += this.firstMin(i) + this.secondMin(i);
    }
    // Rounding off the lower bound to an integer
    curr_bound = curr_bound == 1 ? curr_bound / 2 + 1 : curr_bound / 2;

    this.isVisited[this.start] = true;
    curr_path[0] = this.start;

    this.TSPRec(curr_bound, 0, 1, curr_path);
    return { totalCost: this.final_res, path: this.final_path };
  }
}
