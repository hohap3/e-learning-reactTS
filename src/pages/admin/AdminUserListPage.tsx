import AdminUserListTable from "components/admin/AdminUserListTable/AdminUserListTable";
import { GROUP_LIST } from "constants/common";
import { useSearchParams } from "react-router-dom";

function AdminUserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelectGroup(group: string) {
    setSearchParams({ group });
  }

  return (
    <section className="bg-white py-8 px-4 rounded-md">
      <h2 className="capitalize text-2xl text-center">
        {!searchParams.get("group")
          ? "Select one of groups below"
          : "User List"}
      </h2>

      <div className="my-4">
        {!searchParams.get("group") && (
          <div className="grid grid-cols-2 gap-4">
            {GROUP_LIST.map((group) => (
              <div key={group.key} className="col-span-1">
                <button
                  className="h-[4rem] text-[16px] w-full relative border border-[#0868FD] text-black rounded-2xl"
                  onClick={() => handleSelectGroup(group.value)}
                >
                  {group.value}
                </button>
              </div>
            ))}
          </div>
        )}
        {searchParams.get("group") && (
          <>
            <AdminUserListTable group={searchParams.get("group")} />
          </>
        )}
      </div>
    </section>
  );
}

export default AdminUserListPage;
