import InvalidFieldsError from '../../errors/InvalidFieldsError';

export default class ValidateLoginField {
  public static email(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = emailRegex.test(email);
    if (!validateEmail) {
      throw new InvalidFieldsError('Invalid email or password');
    }
  }

  public static password(password: string): void {
    const passwordRegex = /^[a-zA-Z0-9_@$!%*#?&]{6,}$/;
    const validatePassword = passwordRegex.test(password);
    if (!validatePassword) {
      throw new InvalidFieldsError('Invalid email or password');
    }
  }
}
