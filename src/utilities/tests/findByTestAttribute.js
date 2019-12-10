export default (component, attr) => {
  const item = component.find(`[data-test='${attr}']`);
  return item;
};
