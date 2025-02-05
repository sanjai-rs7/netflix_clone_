const checkValidData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};

export default checkValidData;

// Here are the password rules in simple, user-friendly terms:

// 1. **Minimum 8 Characters**: The password must be at least 8 characters long.
// 2. **At Least One Uppercase Letter**: Include at least one capital letter (e.g., `A, B, C`).
// 3. **At Least One Lowercase Letter**: Include at least one small letter (e.g., `a, b, c`).
// 4. **At Least One Number**: Include at least one digit (e.g., `0-9`).
// 5. **Can Contain Special Characters**: You can use symbols like `@, $, !, %, *, ?` (optional).

// For example:
// ✅ **Valid Passwords**: `StrongPass1`, `HelloWorld9!`
// ❌ **Invalid Passwords**: `password` (no uppercase, no digit), `12345678` (no letters).
