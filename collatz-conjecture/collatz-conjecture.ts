class CollatzConjecture {
  static steps(n: number, count: number = 0): number {
    if (n <= 0) {
      throw new Error('Only positive numbers are allowed');
    }

    if (n === 1) {
      return count;
    }

    // Divide by 2 if even
    // (n1) = n0 / 2
    // 3n + 1 if odd
    // n1 = 3n0 + 1
    if (n % 2 === 0) {
      return this.steps(n / 2, ++count);
    }

    return this.steps(3 * n + 1, ++count);
  }
}

export default CollatzConjecture;
