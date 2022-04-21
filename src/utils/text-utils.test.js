import {allWordsToUpper, determineUVSevereness} from './text-utils'

test('allWordsToUpper converts each word\'s first letter to upper case, with words must be separated by space', () => {
  expect(allWordsToUpper("hello world")).toBe("Hello World");
  expect(allWordsToUpper("Hello World")).toBe("Hello World");
  expect(allWordsToUpper("hEllo World")).toBe("HEllo World");
  expect(allWordsToUpper("hEllo,world")).toBe("HEllo,world");
  expect(allWordsToUpper("hello   world   ")).toBe("Hello   World   ");
  expect(allWordsToUpper("h12345")).toBe("H12345");
  expect(allWordsToUpper("12345")).toBe("12345");
  expect(allWordsToUpper("")).toBe("");
  expect(allWordsToUpper(null)).toBe("");
  expect(allWordsToUpper({})).toBe("");
  expect(allWordsToUpper([])).toBe("");
});

test('Translates UV level from integer to its appropriate name (as a string)', () => {
  expect(determineUVSevereness("hello world")).toBe("");
  expect(determineUVSevereness("")).toBe("");
  expect(determineUVSevereness(0)).toBe("Low");
  expect(determineUVSevereness(2)).toBe("Low");
  expect(determineUVSevereness(2.5)).toBe("Medium");
  expect(determineUVSevereness(3)).toBe("Medium");
  expect(determineUVSevereness(3.5)).toBe("Medium");
  expect(determineUVSevereness(6.5)).toBe("High");
  expect(determineUVSevereness(7)).toBe("High");
  expect(determineUVSevereness(8)).toBe("Very High");
  expect(determineUVSevereness(100)).toBe("Extremely High");
  expect(determineUVSevereness(-100)).toBe("Unknown value");
  expect(determineUVSevereness(null)).toBe("");
  expect(determineUVSevereness(undefined)).toBe("");
  expect(determineUVSevereness([])).toBe("");
  expect(determineUVSevereness({})).toBe("");
});

