import { getUser } from "@/app/actions/profile";
import UpdateUser from "@/app/_components/UpdateUser";
import UserClient from "@/app/_components/UserClient";

export default async function ProfilePage() {
  const data = await getUser();
  return (
    <main className="flex w-full flex-col gap-8 row-start-2 items-center sm:items-start">
      <UserClient user={data} />
      <UpdateUser />
    </main>
  );
}
