export class ValidationError {
  message: string;
  type: string;
  path: string;
  value?: any;
}
