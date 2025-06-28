import { useRouter } from "next/router";
import { properties } from "@/src/data/properties";
import Image from "next/image";
import Layout from "@/src/components/layout";
import { Button } from "@/src/components/ui/button";

export default function PropertyDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-xl font-semibold">
          Property Not Found...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-900 to-black text-white pt-24 pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="lg:sticky lg:top-28 self-start">
            <Image
              src={property.image}
              alt={property.title}
              width={1000}
              height={600}
              className="rounded-3xl w-full object-cover shadow-2xl border border-gray-800"
            />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
                {property.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                {property.location}
              </p>
              <p className="text-2xl sm:text-3xl text-yellow-400 font-bold mt-4">
                {property.price}
              </p>
              <p className="text-sm sm:text-base text-gray-400 mt-2">
                {property.area}
              </p>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {property.description}
            </p>

            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <div className="text-sm sm:text-base">
                <span className="font-semibold text-white">Ownership: </span>
                <span className="text-gray-300">{property.ownership}</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="font-semibold text-white">
                  Expected Yield:{" "}
                </span>
                <span className="text-gray-300">{property.yield}</span>
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 text-base w-full sm:w-auto">
                Invest Now
              </Button>
              <Button
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-black font-semibold px-6 py-3 text-base w-full sm:w-auto"
              >
                Download Brochure
              </Button>
            </div> */}

            <div className="flex w-full justify-center">
              <Button
                variant="default"
                className="bg-[#F4B448] hover:bg-[#F4B448]/90 hover:text-black font-semibold text-black w-full"
                onClick={() => router.push("/contact")}
              >
                Join The Privilege
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
