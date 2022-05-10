export const getIdFromTeamSplittingMessage = (
  message: string,
  number: number,
): { attacker: string[]; defender: string[] } => {
  const id = message.match(/@(\d{18})/g).map((message) => message.slice(1, 18));
  return { attacker: id.splice(0, number / 2), defender: id };
};
