import { Card } from "@/components/ui/card";
import { VEGETABLES } from "../data.const";
import SearchInput from "./search";

export default async function RoutePage(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  const searchParams = await props.searchParams;
  console.log("params server side : ", searchParams);

  const searchQuery = searchParams.search ?? "";

  console.log("searchQuery : ", searchQuery);

  const filteredVeg = VEGETABLES.filter((veg) =>
    veg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6 flex">
      <div className="w-full">
        <SearchInput />
        <ul className="flex flex-col divide-y divide-accent mt-8">
          {filteredVeg.map((item) => (
            <li key={item} className="py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
