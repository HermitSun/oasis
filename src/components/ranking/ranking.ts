export function getRankingIcon(rank: number): string {
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
