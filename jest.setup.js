require("@testing-library/jest-dom");
global.setImmediate = (fn) => setTimeout(fn, 0);
beforeAll(() => {
	jest.spyOn(console, "log").mockImplementation(() => {});
	jest.spyOn(console, "error").mockImplementation(() => {});
});
