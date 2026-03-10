import "@testing-library/jest-dom";

// jsdom stubs
Element.prototype.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
