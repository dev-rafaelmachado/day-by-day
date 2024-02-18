// import React from 'react'

// type TimeBlock = {
//   startTime: string
//   endTime: string
//   event: string
// }

// type Props = {
//   timeBlocks: TimeBlock[]
// }

// export const Agenda = ({ timeBlocks }: Props) => {
//   const hours = Array.from(Array(24).keys())

//   return (
//     <div className="flex flex-col">
//       {hours.map((hour) => {
//         const hourString = `${hour < 10 ? '0' : ''}${hour}:00`
//         const eventBlock = timeBlocks.find(
//           (block) =>
//             block.startTime <= hourString && block.endTime > hourString,
//         )

//         return (
//           <div
//             key={hour}
//             className="flex items-center border-b border-gray-200 py-2"
//           >
//             <div className="w-16 text-center">{hourString}</div>
//             <div className="ml-4 flex-1">
//               {eventBlock ? (
//                 <div className="rounded bg-blue-200 px-2 py-1">
//                   {eventBlock.event}
//                 </div>
//               ) : (
//                 <div className="text-gray-500">Disponível</div>
//               )}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
