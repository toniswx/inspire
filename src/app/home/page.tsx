import ProductsList from "@/components/homePageProducts";

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className=" 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-2  grid grid-cols-1 items-center justify-center gap-2 mx-8 w-10/12  mt-20">
        <ProductsList />
      </div>
    </div>
  );
}
