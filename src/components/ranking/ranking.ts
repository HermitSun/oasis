// 根据业务规则，只显示前10名
export function getRankingIcon(rank: number): string {
  console.assert(0 <= rank && rank < 10);
  switch (rank) {
    case 0:
      return "🏅️";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return (rank + 1).toString();
  }
}
