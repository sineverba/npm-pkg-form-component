import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FormComponent } from "../index";

describe("Test formComponent", () => {
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
  ];

  it("Can render input text", () => {
    render(<FormComponent field={fields[0]} />);
    const fooNameInputText = screen.getByLabelText(/fooName/i);
    expect(fooNameInputText).toBeInTheDocument();
  });

  it("Can handle input text with onKeyDown set", () => {
    render(<FormComponent field={fields[1]} />);
    const barNameInputText = screen.getByLabelText(/barName/i);
    expect(barNameInputText).toBeInTheDocument();

    fireEvent.keyDown(barNameInputText, { key: "a" });
    fireEvent.keyDown(barNameInputText, { key: "?" });
  });

  it("Can render input select", () => {
    render(<FormComponent field={fields[2]} />);
    const bazNameSelect = screen.getByLabelText(/pick a choice/i);
    expect(bazNameSelect).toBeInTheDocument();

    const bazSelect = screen.getByRole("combobox", { name: /pick a choice/i });
    expect(bazSelect).toBeInTheDocument();

    // Options quantity
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  it("Can render input select without label", () => {
    render(<FormComponent field={fields[3]} />);
    const alfaSelect = screen.getByLabelText(/selectAlfa/i);
    expect(alfaSelect).toBeInTheDocument();

    const alfaSelectByRole = screen.getByRole("combobox", {
      name: /selectAlfa/i
    });
    expect(alfaSelectByRole).toBeInTheDocument();
  });

  it("Can render checkbox", () => {
    render(<FormComponent field={fields[4]} />);
    const checkbox = screen.getByRole("checkbox", {
      name: /a checkbox beta labelled/i
    });
    expect(checkbox).toBeInTheDocument();
  });

  it("Can render checkbox without label", () => {
    render(<FormComponent field={fields[5]} />);
    const checkbox = screen.getByRole("checkbox", {
      name: /betaCheckbox/i
    });
    expect(checkbox).toBeInTheDocument();
  });

  it("Can render input text with a label", () => {
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

  it("Can render textarea without label", () => {
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

  it("Can render textarea with label", () => {
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

  it("Can handle onChange on checkbox", () => {
    render(
      <FormComponent field={fields.filter((field) => field.id === "beta")[0]} />
    );
    const checkbox = screen.getByLabelText(/A checkbox beta labelled/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
  });

  it("Can render textarea with specified rows", () => {
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

  it("Can render textarea with specified cols", () => {
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
});
