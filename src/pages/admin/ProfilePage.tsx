export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <h2>Profil Admin</h2>
      <div className="flex flex-col gap-4 px-6 py-4 bg-white rounded-2xl items-end">
        <Info 
          label="Username"
          value="Admin1"
        />
        <Info 
          label="Email"
          value="admin@gmail.com"
        />
        <Info 
          label="Password"
          value="rahasia"
        />
        <button 
          className="bg-vivid-red text-white"
          onClick={() => {}}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

function Info({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex justify-between w-full items-center text-md">
      <span>{label}: </span>
      <span>{value}</span>
    </div>
  )
}