export const Skeleton = () => {
  return (
    <>
      <div>
        <div className="flex space-x-4 p-3">
          <div className="bg-slate-200 rounded-full w-10 h-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 col-span-1 bg-slate-200 rounded-full "></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 col-span-2 bg-slate-200 rounded-full"></div>
                <div className="h-4 col-span-1 bg-slate-200 rounded-full"></div>
              </div>
              <div>
                <div className="h-4 col-span-1 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
