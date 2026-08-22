// Grouping card digits into groups of four: "4242 4242 4242 4242"
export const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

// Formats and auto-inserts the slash: "12/27"
export const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

// Luhn checksum + length check so we reject fake card numbers
export const isValidCardNumber = (value: string) => {
  const digits = value.replace(/\s/g, "");
  if (digits.length !== 16) return false;

  let sum = 0;
  let doubled = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (doubled) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    doubled = !doubled;
  }
  return sum % 10 === 0;
};

// Ensures the expiry month/year is in the valid range and not in the past
export const isValidExpiry = (value: string) => {
  const m = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!m) return false;

  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);

  if (month < 1 || month > 12) return false;

  const expiry = new Date(year, month, 0, 23, 59, 59);
  return expiry.getTime() >= new Date().getTime();
};

// Always 2 digits, digits only
export const isValidCvv = (value: string) => /^\d{3,4}$/.test(value);

export const toRupee = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;