import React from "react";

/**
 * A functional component for rendering form fields based on given properties.
 * @param props The properties for the form component.
 * @returns The JSX representation of the form component.
 */
export const FormComponent: React.FC<{ field: any }> = (props) => {
  const { field } = props;

  /**
   * Handles key down event.
   * @param e The key down event object.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (field.onKeyDownRegex) {
      const regex = new RegExp(field.onKeyDownRegex);
      if (regex.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    field.onChange(e);

  /**
   * Creates the appropriate form component based on field type.
   * @returns The JSX representation of the form component.
   */
  const createFormComponent = (): JSX.Element => {
    if (field.type === "select") {
      return (
        <>
          <label
            htmlFor={field.id}
            className="block text-xs text-gray-600 uppercase"
          >
            {field.label ?? field.name}
          </label>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={field.id}
            name={field.name}
          >
            <option value={field.initialOption.value}>
              {field.initialOption.label}
            </option>
            {field.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      );
    }
    if (field.type === "checkbox") {
      return (
        <label
          htmlFor={field.id}
          className="md:w-2/3 block text-gray-500 font-bold"
        >
          <input
            id={field.id}
            name={field.name}
            className="mr-2 leading-tight"
            type="checkbox"
            onChange={(e) => handleChange(e)}
          />
          <span className="text-sm">{field.label ?? field.name}</span>
        </label>
      );
    }
    if (field.type === "textarea") {
      return (
        <>
          <label
            htmlFor={field.id}
            className="block text-xs text-gray-600 uppercase"
          >
            {field.label ?? field.name}
          </label>
          <textarea id={field.id} name={field.name} rows={4} cols={50} />
        </>
      );
    }
    return (
      <>
        <label
          htmlFor={field.id}
          className="block text-xs text-gray-600 uppercase"
        >
          {field.label ?? field.name}
        </label>
        <input
          id={field.id}
          type="text"
          name={field.name}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          onKeyDown={handleKeyDown}
        />
      </>
    );
  };

  return createFormComponent();
};
