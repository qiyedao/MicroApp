export function render(oldRender: any) {
  console.log('runtime render');

  oldRender();
}
