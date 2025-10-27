export const generatePassword = (): string => {
  const lowerDigits = "abcdefghijklmnopqrstuvwxyz0123456789";
  const upperDigits = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const getRandomChars = (length: number, chars: string) =>
    Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");

  const part1 = getRandomChars(12, lowerDigits);
  const part2 = getRandomChars(10, upperDigits);

  return `${part1}.${part2}`;
};
