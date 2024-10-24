import React from "react";
import Print from "./Print";

export default function Table({
  fields,
  items = [],
  hover_stripe,
  body_clicked,
  skeleton,
  active_sort,
  children,
}) {
  const gridTemplateColumns = () => {
    return fields
      .filter((field) => !field.hide)
      .map((field) => {
        if (typeof field.span === "number") return `${field.span}fr`;
        return typeof field.span === "string" ? field.span : "1fr";
      })
      .join(" ");
  };
  const slots = (
    React.Children.map(children, (child) => child.props.slot) || []
  ).filter(Boolean);
  const checkSortable = (field) => field.sortable && field.key === active_sort;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden lg:border border-gray-200 lg:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 hidden lg:block">
                <tr
                  className="grid"
                  style={{ gridTemplateColumns: gridTemplateColumns() }}
                >
                  {fields.map(
                    (field) =>
                      !field.hide && (
                        <th
                          key={field.key}
                          className={`py-3.5 px-4 text-sm text-gray-500 uppercase text-left font-medium flex items-center ${
                            field.title_class
                          } ${field.sortable ? "cursor-pointer" : ""}`}
                        >
                          {field.title_image && (
                            <img
                              loading="lazy"
                              src={field.title_image}
                              alt={field.key}
                            />
                          )}
                          {!field.title_image &&
                            !field.hide_title &&
                            field.label}
                          {checkSortable(field) && (
                            <i
                              className={`fas fa-arrow-down-long ml-2 ${
                                field.rotate_sort ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody className="lg:bg-white divide-y divide-gray-200">
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className={`flex flex-col lg:grid bg-white mb-4 lg:mb-0 rounded-xl lg:rounded-none divide-y lg:divide-y-0 divide-gray-200 ${
                      body_clicked ? "cursor-pointer" : ""
                    } ${hover_stripe ? "hover:bg-gray-50" : ""}`}
                    style={{ gridTemplateColumns: gridTemplateColumns() }}
                  >
                    {fields.map(
                      (field) =>
                        !field.hide && (
                          <td
                            key={field.key}
                            className={`px-4 py-4 text-sm font-medium flex items-center text-gray-700 overflow-hidden ${field.class}`}
                            style={{
                              "--col-span-mobile": field.col_span_mobile || 1,
                            }}
                          >
                            {skeleton ? (
                              <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
                                <p className="w-full h-3 bg-gray-200 rounded-lg"></p>
                              </div>
                            ) : (
                              <div className="flex justify-between flex-1 items-center">
                                <div
                                  className="lg:hidden"
                                  hidden={field.hideSmLabel}
                                >
                                  {field.label}
                                </div>
                                {children
                                  ? React.Children.map(children, (child, k) => {
                                      if (
                                        React.isValidElement(child) &&
                                        child.props.slot === field.key
                                      ) {
                                        return child.props.children({
                                          index,
                                          item: items[index],
                                        });
                                      } else {
                                        return slots.includes(field.key)
                                          ? ""
                                          : k === 0
                                          ? item[field.key]
                                          : "";
                                      }
                                    })
                                  : item[field.key]}
                              </div>
                            )}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden">
        {/* Slot for empty state */}
      </div>
    </div>
  );
}
