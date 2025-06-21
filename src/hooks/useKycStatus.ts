export const useKycStatusLabel = (status: number | undefined) => {
  switch (status) {
    case 0:
      return "Waiting for approval";
    case 1:
      return "Verified";
    case 2:
      return "Rejected";
    case 3:
      return "Not verified";
    default:
      return "Unknown status";
  }
};
