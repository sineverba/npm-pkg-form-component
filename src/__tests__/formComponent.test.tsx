import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
      type: "textarea"
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
      type: "select"
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
  it("should render password input field with a custom labeo and verify its type", () => {
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
});
