import crypto from 'crypto';
import { ActionFormInput } from '@/types/types';

export function generateUniqueId(): string {
  return crypto.randomBytes(12).toString('hex');
}

export function validateInput(input: ActionFormInput): void {
  if (!input.title || !input.description || !input.imageUrl || !input.label) {
    throw new Error("Missing required fields");
  }

  if (!Array.isArray(input.amounts)) {
    throw new Error("Amounts must be an array");
  }
  
  if (input.amounts.some(amount => amount <= 0)) {
    throw new Error("All amounts must be positive");
  }
}