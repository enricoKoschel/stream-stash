import { BaseError, MediaType, Result } from 'src/models/types';
import { Dialog } from 'quasar';

export function sleep(ms: number): Promise<never> {
  return new Promise((r) => setTimeout(r, ms));
}

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let valueString = '[Unable to stringify the thrown value]';
  try {
    valueString = JSON.stringify(value);
  } catch {
    /* empty */
  }

  return new Error(
    `This value was thrown as is, not through an Error: ${valueString}`,
  );
}

export function resultOk<T, E extends BaseError>(value: T): Result<T, E> {
  return { success: true, value };
}

export function resultErr<T, E extends BaseError>(error: E): Result<T, E> {
  return { success: false, error };
}

export function createErrorDialog(msg: string): void {
  Dialog.create({
    title: 'Error',
    dark: true,
    message: msg,
    persistent: true,
    color: 'white',
    class: 'bg-negative',
  });
}

export function createWaitingDialog(msg: string): () => void {
  const dialog = Dialog.create({
    title: 'Info',
    dark: true,
    message: msg,
    progress: true,
    persistent: true,
    ok: false,
    color: 'white',
    class: 'bg-primary',
  });

  return () => {
    dialog.hide();
  };
}

export function createConfirmDialog(
  msg: string,
  onConfirm: () => void | Promise<void>,
): void {
  Dialog.create({
    title: 'Confirm',
    dark: true,
    message: msg,
    cancel: { label: 'No', flat: true },
    ok: {
      label: 'Yes',
      flat: true,
      class: 'text-negative',
    },
    noBackdropDismiss: true,
    color: 'primary',
    focus: 'none',
  }).onOk(() => {
    Promise.resolve(onConfirm()).catch(console.error);
  });
}

export function safeJsonParse<T>(str: string): T | undefined {
  try {
    return JSON.parse(str) as T;
  } catch {
    return undefined;
  }
}

export function constructMediaKey(mediaType: MediaType, id: number): string {
  return `${mediaType}:${id}`;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
