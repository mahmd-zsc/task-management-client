import React from "react";

interface Props {
  categories: string[];
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Component to render a select input for sorting tasks by category.
 * @param categories List of available categories.
 * @param sort Current selected sort category.
 * @param setSort Function to update the selected sort category.
 */
function SortCategory({ categories, sort, setSort }: Props): JSX.Element {
  return (
    <div className="mt-6">
      <label htmlFor="categorySelect">Sort by Category:</label>
      <select
        id="categorySelect"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortCategory;
