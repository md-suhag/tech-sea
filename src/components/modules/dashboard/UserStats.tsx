import { myFetch } from "@/utils/myFetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";

export default async function UserStats() {
  const res = await myFetch("/stats/user", {
    method: "GET",
    tags: ["stats/user"],
  });

  const userData = res?.data;

  const totalUser = userData?.totalUser ?? 0;
  const totalBlockedUser = userData?.totalBlockedUser ?? 0;
  const totalActiveUser = totalUser - totalBlockedUser;

  const stats = [
    {
      title: "Total Users",
      value: totalUser,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: totalActiveUser,
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Blocked Users",
      value: totalBlockedUser,
      icon: UserX,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 p-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="shadow-sm hover:shadow-md transition rounded-2xl hover:scale-105 duration-300"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
