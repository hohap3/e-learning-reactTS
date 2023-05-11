import { useAppSelector } from "app/hooks";
import React from "react";
import {
  selectCategoryList,
  selectCategoryMapList,
} from "redux/Course/courseSlice";
import CategoryItem from "./CategoryItem";
import CategoryListSkeleton from "./CategoryListSkeleton";

function CategoryList() {
  const categoryList = useAppSelector(selectCategoryList);
  const categoryMapList = useAppSelector(selectCategoryMapList);

  if (categoryList.length < 1) return <CategoryListSkeleton />;
  return (
    <section className="my-4">
      <section className="grid grid-cols-6 gap-2">
        {categoryMapList.length > 0 &&
          categoryMapList.map((category, idx) => {
            if (idx < 1)
              return (
                <div key={idx} className="col-span-4 row-span-2">
                  <CategoryItem category={category} />
                </div>
              );
            else if (idx > 0 && idx < 4)
              return (
                <div key={idx} className="col-span-2 row-span-2">
                  <CategoryItem category={category} />
                </div>
              );
            else
              return (
                <div key={idx} className="col-span-1 row-span-2">
                  <CategoryItem category={category} />
                </div>
              );
          })}
      </section>
    </section>
  );
}

export default CategoryList;
