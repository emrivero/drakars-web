export interface TransformProps {
  children: string;
}

export interface TransformBaseProps extends TransformProps {
  transform: (arg: string) => string;
}
