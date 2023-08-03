import React, { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([
    {
      Title: "",
      ResponseType: "text",
      Options: [],
      file: null,
      FileType: "",
      MaxLength: "",
      MaxSize: "",
      Value: "",
    },
  ]);

  const handleChange = (index, event) => {
    const { name, value, type } = event.target;
    const newFields = [...fields];
    if (type === "file") {
      // Handle file uploads for file type fields
      newFields[index][name] = event.target.files[0];
    } else {
      newFields[index][name] = value;
    }
    setFields(newFields);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const { value } = event.target;
    const newFields = [...fields];
    newFields[index].Options[optionIndex] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        Title: "",
        ResponseType: "text",
        Options: [],
        file: null,
        FileType: "",
        MaxLength: "",
        MaxSize: "",
        Value: "",
      },
    ]);
  };

  const handleAddOption = (index) => {
    const newFields = [...fields];
    newFields[index].Options.push("");
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleRemoveOption = (index, optionIndex) => {
    const newFields = [...fields];
    newFields[index].Options.splice(optionIndex, 1);
    setFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle the form submission and process the field values.
    console.log(fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            name="Title"
            placeholder="Field Title"
            value={field.Title}
            onChange={(event) => handleChange(index, event)}
          />
          <select
            name="ResponseType"
            value={field.ResponseType}
            onChange={(event) => handleChange(index, event)}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="option">Option</option>
            <option value="file">File</option>
            {/* Add more field types as needed */}
          </select>
          {field.ResponseType === "option" && (
            <div>
              {field.Options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(event) =>
                      handleOptionChange(index, optionIndex, event)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index, optionIndex)}
                  >
                    Remove Option
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddOption(index)}>
                Add Option
              </button>
            </div>
          )}
          {field.ResponseType === "file" && (
            <div>
              <input
                type="file"
                name="File"
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                name="FileType"
                placeholder="Allowed File Types (e.g., image/*, audio/*, application/pdf)"
                value={field.FileType}
                onChange={(event) => handleChange(index, event)}
              />
              <input
                type="text"
                name="MaxLength"
                placeholder="Maximum File Size (e.g., 2MB)"
                value={field.MaxLength}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          )}
          {field.ResponseType === "text" && (
            <div>
              <input
                type="text"
                name="MaxSize"
                placeholder="Maximum Number of Characters"
                value={field.MaxSize}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          )}
          <button type="button" onClick={() => handleRemoveField(index)}>
            Remove Field
          </button>
          <div>
            <label>Value:</label>
            {field.ResponseType === "option" && field.Options.length > 0 ? (
              <select
                name="Value"
                value={field.Value}
                onChange={(event) => handleChange(index, event)}
              >
                {field.Options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.ResponseType === "file" ? (
              <input
                type={field.ResponseType}
                name={field.ResponseType}
                onChange={(event) => handleChange(index, event)}
              />
            ) : (
              <input
                type={field.ResponseType}
                name={field.ResponseType}
                value={field.Value}
                onChange={(event) => handleChange(index, event)}
              />
            )}
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddField}>
        Add Field
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
