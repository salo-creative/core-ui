import fluidType from './index';

// Define what we want to test
const tests = {
  no_arguments: () => {
    const output = fluidType();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Fluid type expects arguments for fontSize and linHeight');
    expect(output).toEqual(null);
  },
  missing_font_arguments: () => {
    const output = fluidType({ fontSize: [12], lineHeight: [16, 24] });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith('Fluid type expects a min and max font size');
    expect(output).toBeDefined();
  },
  missing_line_arguments: () => {
    const output = fluidType({ fontSize: [12, 18], lineHeight: [16] });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith('Fluid type expects a min and max line height');
    expect(output).toBeDefined();
  },
  all_arguments: () => {
    const output = fluidType({ fontSize: [12, 18], lineHeight: [16, 24] });
    expect(console.warn).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(0);
    expect(output).toBeDefined();
  }
};

Object.entries(tests).forEach(([name, fn]) => {
  it(name, () => Promise.resolve(fn()));
});