import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  if (!salt) {
    throw new Error('Failed to generate salt for password hashing');
  }
  if (!password) {
    throw new Error('Password is required for hashing');
  }
  return await bcrypt.hash(password, salt);
};


export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  if (!password || !hashedPassword) {
    throw new Error('Both password and hashed password are required for comparison');
  }
  return await bcrypt.compare(password, hashedPassword);
}