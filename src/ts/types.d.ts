export {};

declare global {
  interface NodeModule {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hot: any;
  }
}
