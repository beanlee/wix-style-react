const formFieldDriverFactory = async (component, page) => {
  return {
    element: () => component,
    getLabelValue: async () => {
      const label = await component.$('[data-hook="formfield-label"]');
      return page.evaluate(_label => _label.innerText, label);
    },
    isRequired: async () =>
      Boolean(await component.$('[data-hook="formfield-asterisk"]')),
  };
};

export default formFieldDriverFactory;
