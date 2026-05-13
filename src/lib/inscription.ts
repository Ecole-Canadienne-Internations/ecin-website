export type InscriptionFlow =
  | "general"
  | "alc"
  | "alc-anglais"
  | "alc-francais"
  | "alc-allemand"
  | "dte"
  | "ita"
  | "sport"
  | "canada"
  | "france"
  | "elementaire"
  | "secondaire";

export interface OpenInscriptionOptions {
  flow?: InscriptionFlow;
  context?: string; // free text label, e.g. article title
}

export const openInscription = (opts: OpenInscriptionOptions = {}) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ecin:open-inscription", { detail: opts }));
  }
};
