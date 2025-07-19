

function Features(props) {
  return (
              <div className="flex flex-col gap-2 min-h-[300px] h-[40%] p-2 min-w-[300px] dark:text-white/70">
                <img src={props.imageUrl} className="object-fit w-full h-auto " alt="..." />
                <div className="flex flex-col gap-1">
                  <h5 className="text-base font-bold ">{props.heading}</h5>
                  <p className="text-xs md:text-sm font-semibold text-gray-500 text-justify">{props.content}</p>
                </div>
              </div>
  )
}

export default Features
