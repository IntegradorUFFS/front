import { useAppDispatch } from "@/hooks";
import React, { useEffect } from "react";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "layout/setBreadcrumb", payload: "Recursos" });
  }, [dispatch]);
  return (
    <>
      <div className="max-h-screen overflow-y-auto">
        <div className="px-6 pb-8">
          <div className="flex flex-col">
            <div className="w-full h-60 bg-white rounded-2xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
