import { Button } from "antd";

const PrimaryBtn = ({data,icon}) => {
    return (
      <div className="group relative overflow-hidden bg-light-teal focus:ring-4 focus:ring-teal inline-flex items-center px-3 py-2 rounded-3xl text-black justify-center cursor-pointer">
      <Button type="" className="z-40 font-medium text-base" icon={icon}>{data}</Button>
      <div className="absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-80%] transition-all group-hover:scale-100 bg-white/30 group-hover:translate-x-[50%] z-20 duration-1000">
      </div>
    </div>
    )}
export default PrimaryBtn;