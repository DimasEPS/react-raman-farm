import bg from "../assets/landing-bg.png"

export default function LandingPage() {
  return (
    <div 
      className="w-full min-h-[384px] max-h-[600px] relative bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${bg})`
      }}
    >
      <div 
        className="w-full bg-bg absolute top-[90%]"
        style={{
          // adjust first param (h radius) based on its content height
          clipPath: "ellipse(120% 100% at 50% 100%)"
        }}
      >
        <div className="flex flex-col gap-6 pt-6 items-center w-[90%] mx-auto">
          <b className="text-2xl sm:text-3xl">Misi Kami</b>
          <span className="text-center">
            Data kambing - domba yang jelas akan meningkatkan kredibilitas peternakan anda
          </span>
          <div className="flex flex-col gap-4 w-full">
            {missions.map((d, i) => (
              <Mission 
                number={i + 1}
                title={d.title}
                desc={d.desc}
              />
            ))}
          </div>
        </div>  
      </div>
    </div>
  )
}

const missions: Array<MissionData> = [
  {
    title: "Sanad",
  },
  {
    title: "Pertumbuhan",
  },
  {
    title: "Kesehatan",
  },
]

function Mission({
  number,
  title,
  desc
}: MissionData) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <div
          // bg size = text size * 2 
          className={`
            text-xl font-medium rounded-full size-[2.5rem] bg-secondary text-[rgba(0,0,0,60)]
            flex items-center justify-center  
          `}
        >
          {number}
        </div>
        {title}
      </div>
      {desc}
    </div>
  )
}

type MissionData = {
  number?: number
  title: string
  desc?: string
}