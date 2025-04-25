import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

export default async function RoutePage() {
  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }

  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await data.json();

  console.log(users);

  return (
    <Card className="p-6 flex flex-col">
      <CardHeader>
        <CardTitle>USERS LIST</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <a
                className=" flex flex-row gap-2 items-center"
                href={`/exercises/m1-fundamentals/3.server-components/code/${user.id}`}
              >
                <p>
                  <Circle size={6} />
                </p>
                <p className="text-indigo-500 hover:underline">{user.name}</p>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
