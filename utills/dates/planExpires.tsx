import moment from "moment";

export const isPlanExpires = (createdPlan: Date) => {
  const today = moment();
  const expireDate = moment(createdPlan);
  let duration = moment.duration(expireDate.diff(today));
  const days = duration.asDays();

  if (days > 0 && days < 5) return true;

  return false;
};
