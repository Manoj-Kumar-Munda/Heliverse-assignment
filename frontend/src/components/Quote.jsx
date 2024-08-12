import React from "react";

const Quote = () => {
  return (
    <div className="hidden md:block grow basis-1/2 bg-gray-200 w-full ">
      <div className="h-full  grid place-content-center w-full">
        <div className="px-4 max-w-lg">
          <q className="text-3xl font-bold">
            Education is the passport to the future, for tomorrow belongs to
            those who prepare for it today.
          </q>

          <div className="mt-6">
            <p className="text-xl font-semibold">Malcolm X</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
