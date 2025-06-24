// "use client";

// import type { StampCard } from "@prisma/client";
// import { api } from "stampCollector/trpc/react";
// import { CreateStamp } from "./createStamp";
// import { Button } from "./button";
// import type { Stamp } from "@prisma/client";
// import { StampDetails } from "./stampDetails";

// type StampCardProps = {
//   card: {
//     id: number;
//     customerid: number;
//     stamps?: Stamp[];
//     createdAt: Date;
//     updatedAt: Date;
//   };
// };

// export function CardDetails({ card }: StampCardProps) {
//   const utils = api.useUtils();
//   const { data: stamps, refetch } = api.stamp.getStamps.useQuery(
//     { stampCardId: card.id }, // Skicka customerId som parameter
//     { enabled: !!card.id }, // Se till att queryn endast körs om customer.id är tillgänglig
//   );

//   const handleClick = () => {};

//   return (
//     <div className="m-2 flex max-w-lg transform flex-wrap rounded-lg bg-gradient-to-r from-green-600 via-green-500 to-green-900 p-3 drop-shadow-xl/25">
//       <div className="flex grow flex-row justify-between">
//         <p className="truncat">StämpelkortNr: {card.id}</p>
//         <p className="truncat">Kund: {card.customerid}</p>
//         {card.stamps!.length > 0 ? (
//           <ul className="cursor-pointer list-disc pl-5">
//             {card.stamps!.map((stamps) => (
//               <>
//                 <StampDetails />
//                 <li key={stamps.id}>Stämpelkort ID: {stamps.id}</li>
//               </>
//             ))}
//           </ul>
//         ) : (
//           <p>Inga stämplar hittades..</p>
//         )}
//         <p>
//           <strong>Skapad: </strong>
//           {new Date(card.createdAt).toLocaleDateString()}
//         </p>
//       </div>
//       {/* <div>
//         <Button title={"Ny stämpel"} onClickEvent={handleClick}>
//           <h1>smt</h1>
//         </Button>
//       </div> */}
//       {/* <Stamp /> */}
//       {/* <CreateStamp stampCardId={card.id} /> */}
//     </div>
//   );
// }
