export {};
// +916289356522 becomes "+91 62xxx xx22"
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) return "xxxx";
  const national = digits.slice(-10);                 // last 10 digits
  const cc = digits.slice(0, digits.length - 10);     // country code
  return `${cc ? "+" + cc + " " : ""}${national.slice(0, 2)}xxx xx${national.slice(-2)}`;
}

