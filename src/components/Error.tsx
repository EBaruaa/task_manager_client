export default function Error({children} : {children : React.ReactNode}) {
  return (
    <div className="text-center my-4 bg-red-200 text-red-600 font-bold p-4 uppercase text-xl rounded-lg">{children}</div>
  )
}
