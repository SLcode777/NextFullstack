import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage(props: { params: { userId: number } }) {
  const params = await props.params;

  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  ).then((res) => res.json());

  console.log("user selected : ", user);

  if (!user || typeof user.id !== "number" || typeof user.name !== "string") {
    notFound(); 
  }

  return (
    <Card className="flex flex-col bg-accent/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-2 ">
            <div className="flex flex-col w-1/2  ">
              <div className="font-semibold ">Personal Info</div>
              <div className="flex flex-row gap-2 ">
                <div>Username: </div>
                <div>{user.username}</div>
              </div>
              <div className="flex flex-row gap-2 ">
                <div>Email: </div>
                <div>{user.email}</div>
              </div>
              <div className="flex flex-row gap-2 ">
                <div>Phone: </div>
                <div>{user.phone}</div>
              </div>

              <div className="flex flex-row gap-2 ">
                <div>Website: </div>
                <div>{user.website}</div>
              </div>
            </div>
            <div className="flex flex-col  w-1/2  ">
              <div className="font-semibold">Address</div>
              <div>
                {user.address.street}, {user.address.suite}
              </div>
              <div>
                {user.address.city}, {user.address.zipcode}
              </div>
              <div>
                Geo: {user.address.geo.lat}, {user.address.geo.lng}
              </div>
            </div>
          </div>
          <div className="flex flex-col   ">
            <div className="font-semibold">Company</div>
            <div className="flex flex-row gap-2 ">
              <div>Name: </div>
              <div>{user.company.name}</div>
            </div>

            <div className="flex flex-row gap-2 ">
              <div>Catch Phrase: </div>
              <div>{user.company.catchPhrase}</div>
            </div>

            <div className="flex flex-row gap-2 ">
              <div>BS: </div>
              <div>{user.company.bs}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full mt-6">
          <Button className="w-full">
            <Link href="/exercises/m1-fundamentals/3.server-components/code/">
              Back
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
