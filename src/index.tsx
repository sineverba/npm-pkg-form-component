import React from "react";

/**
 * A functional component for rendering form fields based on given properties.
 * This component dynamically creates form fields such as text inputs, password inputs, checkboxes, select boxes, and text areas based on the `field` prop.
 *
 * @param props The properties for the form component.
 * @returns The JSX representation of the form component.
 */
export const FormComponent: React.FC<{ field: any }> = (props) => {
  const { field } = props;

  /**
   * Handles the key down event for text and password inputs.
   * Prevents the default action if the pressed key matches the specified regular expression in `field.onKeyDownRegex`.
   *
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

  /**
   * Handles the change event for inputs, invoking the `onChange` callback provided in the `field` prop.
   *
   * @param e The change event object.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => field.onChange(e);

  /**
   * Creates and returns the appropriate form component based on the `field.type` property.
   *
   * @returns The JSX representation of the form component.
   */
  const createFormComponent = (): JSX.Element => {
    switch (field.type) {
      case "select":
        return (
          <>
            {/* Label for the select input */}
            <label
              htmlFor={field.id}
              className="block text-xs text-gray-600 uppercase"
            >
              {/* Display label if available, else fallback to field name */}
              {field.label ?? field.name}
            </label>

            {/* Select input field */}
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id={field.id}
              name={field.name}
              onChange={(e) => handleChange(e)}
            >
              {/* Optionally render the initial option if it exists */}
              {field.initialOption && (
                <option value={field.initialOption.value}>
                  {field.initialOption.label}
                </option>
              )}

              {/* Render options if available, mapping through the array */}
              {field.options &&
                field.options.length > 0 &&
                field.options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </>
        );

      case "checkbox":
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
      case "textarea":
        return (
          <>
            <label
              htmlFor={field.id}
              className="block text-xs text-gray-600 uppercase"
            >
              {field.label ?? field.name}
            </label>
            <textarea
              className="textarea-fcta"
              id={field.id}
              name={field.name}
              rows={field.textAreaRows ?? null}
              cols={field.textAreaCols ?? null}
              defaultValue={field.defaultValue ?? null}
            />
          </>
        );
      case "password":
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
              type={field.type}
              name={field.name}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              onKeyDown={handleKeyDown}
            />
          </>
        );
      default:
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
    }
  };

  return createFormComponent();
};
