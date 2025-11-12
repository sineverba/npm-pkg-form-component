import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Importa user-event
import { FormComponent } from "../index";

describe("FormComponent Tests", () => {
  // Array of field definitions used for testing the FormComponent
  const fields = [
    {
      id: "foo",
      name: "fooName",
      type: "text"
    },
    {
      id: "bar",
      name: "barName",
      type: "text",
      onKeyDownRegex: /[^a-zA-Z0-9]/g
    },
    {
      id: "baz",
      name: "selectBaz",
      label: "Pick a choice",
      type: "select",
      options: [
        {
          value: "alfa",
          label: "First possibility"
        },
        {
          value: "beta",
          label: "Second possibility"
        }
      ],
      initialOption: {
        value: "",
        label: "Make your choice"
      }
    },
    {
      id: "alfa",
      name: "selectAlfa",
      type: "select",
      options: [
        {
          value: "alfa",
          label: "First possibility"
        },
        {
          value: "beta",
          label: "Second possibility"
        }
      ],
      initialOption: {
        value: null,
        label: "Make your choice"
      }
    },
    {
      id: "beta",
      name: "betaCheckbox",
      label: "A checkbox beta labelled",
      type: "checkbox",
      onChange: () => {}
    },
    {
      id: "beta",
      name: "betaCheckbox",
      type: "checkbox",
      onChange: () => {}
    },
    {
      id: "fooWithLabel",
      name: "nameOfFooWithLabel",
      label: "this is a different label",
      type: "text"
    },
    {
      id: "observations",
      name: "observations",
      type: "textarea"
    },
    {
      id: "observationsWithLabel",
      name: "observations",
      label: "write down your observations",
      type: "textarea",
      placeholder: "you can write here everything you want"
    },
    {
      id: "observationsWithRows",
      name: "observations",
      type: "textarea",
      textAreaRows: 10
    },
    {
      id: "observationsWithCols",
      name: "observations",
      type: "textarea",
      textAreaCols: 10
    },
    {
      id: "password",
      name: "password",
      type: "password"
    },
    {
      id: "passwordCustomLabel",
      name: "password",
      label: "your strong password",
      type: "password"
    },
    {
      id: "collection",
      name: "collection",
      label: "collection",
      type: "select",
      options: [
        { value: 1, label: "foo" },
        { value: 2, label: "bar" }
      ],
      onChange: () => {}
    },
    {
      id: "observationsWithDefaultValue",
      name: "observationsWithDefaultValue",
      type: "textarea",
      defaultValue:
        "this is a preset value. We can pass a previous text to use into this box"
    },
    {
      id: "number",
      name: "age",
      label: "your age",
      type: "number"
    },
    {
      id: "alfaSelectWithAValue",
      name: "alfaSelectWithAValue",
      type: "select",
      value: "alfa",
      options: [
        {
          value: "alfa",
          label: "First possibility"
        },
        {
          value: "beta",
          label: "Second possibility"
        }
      ],
      initialOption: {
        value: null,
        label: "Make your choice"
      }
    },
    {
      id: "inputNumberWithDefaultValue",
      name: "inputNumberWithDefaultValue",
      label: "inputNumberWithDefaultValue",
      type: "number",
      defaultValue: 666
    },
    {
      id: "inputNumberWithDefaultValueWithoutLabel",
      name: "inputNumberWithDefaultValueWithoutLabel",
      type: "number",
      defaultValue: 666
    }
  ];

  /**
   * Test if the FormComponent can render a text input field.
   */
  it("should render text input field", () => {
    render(<FormComponent field={fields[0]} />);
    const fooNameInputText = screen.getByLabelText(/fooName/i);
    expect(fooNameInputText).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent handles key down events on a text input with an onKeyDown regex.
   */
  it("should handle key down events with onKeyDown set", () => {
    render(<FormComponent field={fields[1]} />);
    const barNameInputText = screen.getByLabelText(/barName/i);
    expect(barNameInputText).toBeInTheDocument();

    // Simulate key down events.
    fireEvent.keyDown(barNameInputText, { key: "a" });
    fireEvent.keyDown(barNameInputText, { key: "?" });
  });

  /**
   * Test if the FormComponent can render a select input field with options.
   */
  it("should render select input field", () => {
    render(<FormComponent field={fields[2]} />);
    const bazNameSelect = screen.getByLabelText(/pick a choice/i);
    expect(bazNameSelect).toBeInTheDocument();

    const bazSelect = screen.getByRole("combobox", { name: /pick a choice/i });
    expect(bazSelect).toBeInTheDocument();

    // Verify the number of options in the select field.
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  /**
   * Test if the FormComponent can render a select input field without a label.
   */
  it("should render select input field without label", () => {
    render(<FormComponent field={fields[3]} />);
    const alfaSelect = screen.getByLabelText(/selectAlfa/i);
    expect(alfaSelect).toBeInTheDocument();

    const alfaSelectByRole = screen.getByRole("combobox", {
      name: /selectAlfa/i
    });
    expect(alfaSelectByRole).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a checkbox with a label.
   */
  it("should render checkbox with label", () => {
    render(<FormComponent field={fields[4]} />);
    const checkbox = screen.getByRole("checkbox", {
      name: /a checkbox beta labelled/i
    });
    expect(checkbox).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a checkbox without a label.
   */
  it("should render checkbox without label", () => {
    render(<FormComponent field={fields[5]} />);
    const checkbox = screen.getByRole("checkbox", { name: /betaCheckbox/i });
    expect(checkbox).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a text input field with a label.
   */
  it("should render text input field with a label", () => {
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "fooWithLabel")[0]}
      />
    );
    const fooNameInputText = screen.getByLabelText(
      /this is a different label/i
    );
    expect(fooNameInputText).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a textarea without a label.
   */
  it("should render textarea without label", () => {
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "observations")[0]}
      />
    );
    const textArea = screen.getByLabelText(/observations/i);
    expect(textArea).toBeInTheDocument();

    const textAreaByRole = screen.getByRole("textbox", {
      name: /observations/i
    });
    expect(textAreaByRole).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a textarea with a label.
   */
  it("should render textarea with label", () => {
    render(
      <FormComponent
        field={
          fields.filter((field) => field.id === "observationsWithLabel")[0]
        }
      />
    );
    const textArea = screen.getByLabelText(/write down your observations/i);
    expect(textArea).toBeInTheDocument();

    const textAreaByRole = screen.getByRole("textbox", {
      name: /observations/i
    });
    expect(textAreaByRole).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can handle the onChange event for a checkbox.
   */
  it("should handle onChange event on checkbox", () => {
    render(
      <FormComponent field={fields.filter((field) => field.id === "beta")[0]} />
    );
    const checkbox = screen.getByLabelText(/A checkbox beta labelled/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
  });

  /**
   * Test if the FormComponent can render a textarea with specified rows.
   */
  it("should render textarea with specified rows", () => {
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "observationsWithRows")[0]}
      />
    );
    const textArea = screen.getByLabelText(/observations/i);
    expect(textArea).toBeInTheDocument();

    const textAreaByRole = screen.getByRole("textbox", {
      name: /observations/i
    });
    expect(textAreaByRole).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a textarea with specified columns.
   */
  it("should render textarea with specified cols", () => {
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "observationsWithCols")[0]}
      />
    );
    const textArea = screen.getByLabelText(/observations/i);
    expect(textArea).toBeInTheDocument();

    const textAreaByRole = screen.getByRole("textbox", {
      name: /observations/i
    });
    expect(textAreaByRole).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a password input field.
   */
  it("should render password input field and verify its type", () => {
    // Render the FormComponent with the password field configuration
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "password")[0]}
      />
    );

    // Retrieve the password input element by its label
    const passwordInput = screen.getByLabelText(/password/i);

    // Check if the password input element is in the document
    expect(passwordInput).toBeInTheDocument();

    // Verify that the input field's type is 'password'
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  /**
   * Test if the FormComponent can render a password input field.
   */
  it("should render password input field with a custom label and verify its type", () => {
    // Render the FormComponent with the password field configuration
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "passwordCustomLabel")[0]}
      />
    );

    // Retrieve the password input element by its label
    const passwordInput = screen.getByLabelText(/your strong password/i);

    // Check if the password input element is in the document
    expect(passwordInput).toBeInTheDocument();

    // Verify that the input field's type is 'password'
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("Can handle select without options neither initialOptions", () => {
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "collection")[0]}
      />
    );
    const select = screen.getByLabelText(/collection/i);
    expect(select).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can handle the onChange event for a select.
   */
  it("should handle onChange event on select", async () => {
    const handleChange = jest.fn(); // Mock della funzione onChange
    render(
      <FormComponent
        field={{
          ...fields.filter((field) => field.id === "collection")[0],
          onChange: handleChange // Passa la funzione mock
        }}
      />
    );

    const select = screen.getByLabelText(/collection/i);
    expect(select).toBeInTheDocument();

    await userEvent.selectOptions(select, "2"); // Get second value

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  /**
   * Test if the FormComponent can render a password input field.
   */
  it("should render password input field with a custom label and verify its type", () => {
    // Render the FormComponent with the password field configuration
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "number")[0]}
      />
    );

    // Retrieve the number input element by its label
    const ageInput = screen.getByLabelText(/your age/i);

    // Check if the number input element is in the document
    expect(ageInput).toBeInTheDocument();

    // Verify that the input field's type is 'number'
    expect(ageInput).toHaveAttribute("type", "number");
  });

  /**
   * Test if the FormComponent can render a textarea with a label and placeholder.
   */
  it("should render textarea with label and placeholder", () => {
    render(
      <FormComponent
        field={
          fields.filter((field) => field.id === "observationsWithLabel")[0]
        }
      />
    );
    const textArea = screen.getByPlaceholderText(
      /you can write here everything you want/i
    );
    expect(textArea).toBeInTheDocument();
  });

  /**
   * Test if the FormComponent can render a select input field with options.
   */
  it("should render select input field with value", () => {
    render(
      <FormComponent
        field={fields.filter((field) => field.id === "alfaSelectWithAValue")[0]}
      />
    );
    const bazNameSelect = screen.getByLabelText(/alfa/i);
    expect(bazNameSelect).toBeInTheDocument();

    const bazSelect = screen.getByRole("combobox", { name: /alfa/i });
    expect(bazSelect).toBeInTheDocument();

    // Verify the number of options in the select field.
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  /**
   * Test if the FormComponent can render a number input with a previous text.
   */
  it("should render input number with a default value", () => {
    render(
      <FormComponent
        field={
          fields.filter(
            (field) => field.id === "inputNumberWithDefaultValue"
          )[0]
        }
      />
    );
    const inputNumber = screen.getByLabelText(/inputNumberWithDefaultValue/i);
    expect(inputNumber).toBeInTheDocument();
    expect(inputNumber).toHaveValue(666);
  });

  /**
   * Test if the FormComponent can render a number input with a previous text without a label.
   */
  it("should render input number with a default value", () => {
    render(
      <FormComponent
        field={
          fields.filter(
            (field) => field.id === "inputNumberWithDefaultValueWithoutLabel"
          )[0]
        }
      />
    );
    const inputNumber = screen.getByLabelText(
      /inputNumberWithDefaultValueWithoutLabel/i
    );
    expect(inputNumber).toBeInTheDocument();
    expect(inputNumber).toHaveValue(666);
  });

  /**
   * Test if the FormComponent handles key down events when onKeyDownRegex is not set.
   */
  it("should handle key down events without onKeyDown set", () => {
    render(<FormComponent field={fields[0]} />);
    const fooNameInputText = screen.getByLabelText(/fooName/i);
    expect(fooNameInputText).toBeInTheDocument();

    // Simulate key down event without regex validation
    fireEvent.keyDown(fooNameInputText, { key: "a" });
  });

  /**
   * Test if the FormComponent can handle the onChange event for a textarea.
   */
  it("should handle onChange event on textarea", async () => {
    const handleChange = jest.fn();
    render(
      <FormComponent
        field={{
          id: "observations",
          name: "observations",
          type: "textarea",
          onChange: handleChange
        }}
      />
    );

    const textArea = screen.getByLabelText(/observations/i);
    expect(textArea).toBeInTheDocument();

    await userEvent.type(textArea, "test text");
    expect(handleChange).toHaveBeenCalled();
  });

  /**
   * Test if the FormComponent can render a textarea with a controlled value.
   */
  it("should render textarea with controlled value", () => {
    render(
      <FormComponent
        field={{
          id: "controlledTextarea",
          name: "controlledTextarea",
          type: "textarea",
          value: "controlled text value"
        }}
      />
    );

    const textArea = screen.getByLabelText(/controlledTextarea/i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("controlled text value");
  });

  /**
   * Test if the FormComponent handles key down events on a textarea with an onKeyDown regex.
   */
  it("should handle key down events on textarea with onKeyDown set", () => {
    render(
      <FormComponent
        field={{
          id: "restrictedTextarea",
          name: "restrictedTextarea",
          type: "textarea",
          onKeyDownRegex: /[^a-zA-Z0-9]/g
        }}
      />
    );
    const textArea = screen.getByLabelText(/restrictedTextarea/i);
    expect(textArea).toBeInTheDocument();

    // Simulate key down events
    fireEvent.keyDown(textArea, { key: "a" });
    fireEvent.keyDown(textArea, { key: "?" });
  });

  /**
   * Test if the FormComponent handles key down events on a textarea with an onKeyDown regex.
   */
  it("should handle key down events on textarea with onKeyDown set", () => {
    render(
      <FormComponent
        field={{
          id: "restrictedTextarea",
          name: "restrictedTextarea",
          type: "textarea",
          onKeyDownRegex: /[^a-zA-Z0-9]/g
        }}
      />
    );
    const textArea = screen.getByLabelText(/restrictedTextarea/i);
    expect(textArea).toBeInTheDocument();

    fireEvent.keyDown(textArea, { key: "a" });
    fireEvent.keyDown(textArea, { key: "?" });
  });

  /**
   * Test if the FormComponent handles custom onKeyDown handler on textarea.
   */
  it("should handle custom onKeyDown handler on textarea", () => {
    const customHandler = jest.fn();
    render(
      <FormComponent
        field={{
          id: "customTextarea",
          name: "customTextarea",
          type: "textarea",
          onKeyDown: customHandler
        }}
      />
    );
    const textArea = screen.getByLabelText(/customTextarea/i);
    expect(textArea).toBeInTheDocument();

    fireEvent.keyDown(textArea, { key: "Enter" });
    expect(customHandler).toHaveBeenCalledTimes(1);
  });

  /**
   * Test if custom onKeyDown handler takes precedence over onKeyDownRegex on textarea.
   */
  it("should prioritize custom onKeyDown over regex on textarea", () => {
    const customHandler = jest.fn();
    render(
      <FormComponent
        field={{
          id: "priorityTextarea",
          name: "priorityTextarea",
          type: "textarea",
          onKeyDown: customHandler,
          onKeyDownRegex: /[^a-zA-Z0-9]/g
        }}
      />
    );
    const textArea = screen.getByLabelText(/priorityTextarea/i);

    fireEvent.keyDown(textArea, { key: "?" });
    expect(customHandler).toHaveBeenCalledTimes(1);
  });

  /**
   * Test if the FormComponent can render a textarea with defaultValue (uncontrolled).
   */
  it("should render textarea with defaultValue when value is not provided", () => {
    render(
      <FormComponent
        field={{
          id: "uncontrolledTextarea",
          name: "uncontrolledTextarea",
          type: "textarea",
          defaultValue: "initial text from db"
        }}
      />
    );
    const textArea = screen.getByLabelText(/uncontrolledTextarea/i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("initial text from db");
  });

  /**
   * Test if the FormComponent can render a textarea with value (controlled).
   */
  it("should render textarea with value when provided (controlled)", () => {
    render(
      <FormComponent
        field={{
          id: "controlledTextarea",
          name: "controlledTextarea",
          type: "textarea",
          value: "controlled text value"
        }}
      />
    );
    const textArea = screen.getByLabelText(/controlledTextarea/i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("controlled text value");
  });

  /**
   * Test if value takes precedence over defaultValue in textarea.
   */
  it("should use value over defaultValue when both are provided", () => {
    render(
      <FormComponent
        field={{
          id: "precedenceTextarea",
          name: "precedenceTextarea",
          type: "textarea",
          value: "controlled value",
          defaultValue: "default value"
        }}
      />
    );
    const textArea = screen.getByLabelText(/precedenceTextarea/i);
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveValue("controlled value");
  });
});
