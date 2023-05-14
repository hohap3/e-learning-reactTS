import { useAppSelector } from "app/hooks";
import React from "react";
import {
  selectCategoryList,
  selectCategoryMapList,
} from "redux/Course/courseSlice";
import CategoryItem from "./CategoryItem";
import CategoryListSkeleton from "./CategoryListSkeleton";
import clsx from "clsx";

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
                <div
                  key={idx}
                  className={clsx(`row-span-2`, {
                    ["col-span-2"]: idx < 3,
                    ["col-span-4 lg:col-span-2"]: idx === 3,
                  })}
                >
                  <CategoryItem category={category} />
                </div>
              );
            else
              return (
                <div
                  key={idx}
                  className="col-span-3 lg:col-span-1 lg:row-span-2"
                >
                  <CategoryItem category={category} />
                </div>
              );
          })}
      </section>
    </section>
  );
}

export default CategoryList;
