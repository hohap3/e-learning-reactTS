import React from "react";
import CategoryItemSkeleton from "./CategoryItemSkeleton";

const skeletonCategoryList = [1, 2, 3, 4, 5, 6];

function CategoryListSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-2">
      {skeletonCategoryList.map((skeleton, idx) => {
        if (idx < 1)
          return (
            <div key={idx} className="col-span-4 row-span-2">
              <CategoryItemSkeleton />
            </div>
          );
        else if (idx > 0 && idx < 4)
          return (
            <div key={idx} className="col-span-2 row-span-2">
              <CategoryItemSkeleton />
            </div>
          );
        else
          return (
            <div key={idx} className="col-span-1 row-span-2">
              <CategoryItemSkeleton />
            </div>
          );
      })}
    </div>
  );
}

export default CategoryListSkeleton;
