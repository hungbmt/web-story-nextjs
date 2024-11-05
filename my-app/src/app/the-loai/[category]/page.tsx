"use client";

import DefaulrLayout from "@/app/layout/defaultLayout/DefaulrLayout";
import "./category.css";

import CategoryPageConponent from "./category";
export default function CategoryPage() {
  return (
    <>
      <DefaulrLayout>
        <div className="category-page-wraper">
          <CategoryPageConponent />
        </div>
      </DefaulrLayout>
    </>
  );
}
