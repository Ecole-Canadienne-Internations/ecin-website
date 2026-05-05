export const openInscription = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ecin:open-inscription"));
  }
};
