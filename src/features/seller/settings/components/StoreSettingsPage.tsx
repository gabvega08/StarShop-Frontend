'use client';

const StoreSettingsPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen pt-10 pl-6 pr-10">
        <h1
          className="text-3xl font-bold text-white mb-8"
          style={{ textShadow: '0 0 10px rgba(210,204,227, 0.7)' }}
        >
          Store Settings
        </h1>
        <form action="" className="space-y-6 pl-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            General Information
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-white mb-2"
              >
                Store Name
              </label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                className="block w-full p-6 rounded-xl transition-all shadow-[0_0_6px_rgba(100,90,140,1)] bg-transparent text-white"
              />
            </div>
            <div>
              <label
                htmlFor="storeDescription"
                className="block text-sm font-medium text-white mb-2"
              >
                Store Description
              </label>
              <textarea
                id="storeDescription"
                name="storeDescription"
                rows={4}
                className="block w-full p-6 rounded-xl transition-all shadow-[0_0_6px_rgba(100,90,140,1)] bg-transparent text-white"
              />
            </div>
            <div className="pb-3">
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-white mb-2"
              >
                Contact Email
              </label>
              <input
                type="text"
                id="contactEmail"
                name="contactEmail"
                className="block w-full p-6 rounded-xl transition-all shadow-[0_0_6px_rgba(100,90,140,1)] bg-transparent text-white"
              />
            </div>
            <button
              type="submit"
              className="mt-6 rounded-xl bg-purple-500 shadow-[0_0_12px_rgba(70,60,110,1)] px-6 py-3 text-white font-semibold hover:bg-purple-700 bg-opacity-70 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StoreSettingsPage;
