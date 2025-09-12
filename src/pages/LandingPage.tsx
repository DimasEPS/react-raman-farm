import { useState } from "react";
import bg from "../assets/landing-bg.png";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import GoatService from "../services/GoatService";

export default function LandingPage() {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("token");

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError("Masukkan nomor induk kambing");
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      const goat = await GoatService.getGoatByCodeName(searchValue.trim());
      if (goat) {
        navigate(`/kambing/${goat.id}`);
      } else {
        setError("Kambing dengan kode tersebut tidak ditemukan");
      }
    } catch (err) {
      setError("Kambing dengan kode tersebut tidak ditemukan");
    } finally {
      setIsSearching(false);
    }
  };

  if (isAdmin) return <Navigate to="/admin" />;
  else
    return (
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="w-full min-h-[384px] max-h-[600px] relative bg-cover bg-center"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          >
            <div
              className={`
            flex flex-col gap-4 absolute top-[30%] items-center justify-center
            text-white w-[80%] left-1/2 -translate-x-1/2
          `}
            >
              <b className="italic">CARI DATA KAMBING</b>
              <SearchBar
                placeholder="Masukkan Nomor Induk Kambing"
                value={searchValue}
                setValue={setSearchValue}
                onSearch={handleSearch}
              />
              <button
                className="bg-dark-green px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? "Mencari..." : "Cari Data"}
              </button>
              {error && (
                <div className="text-red-300 text-sm text-center">{error}</div>
              )}
            </div>
            <div
              className="w-full bg-bg absolute top-[90%] pb-16"
              style={{
                // adjust first param (h radius) based on its content height
                clipPath: "ellipse(120% 100% at 50% 100%)",
              }}
            >
              <div className="flex flex-col gap-6 pt-6 items-center w-[90%] mx-auto">
                <b className="text-2xl sm:text-3xl">Visi Kami</b>
                <span className="text-center">
                  "Menjadi koperasi produsen yang mampu memproduksi dan atau
                  menampung hasil produksi anggota yang selanjutnya
                  mendistribusikan ke dalam provinsi maupun luar provinsi"
                </span>
                <b className="text-2xl sm:text-3xl mt-6">Misi Kami</b>
                <div className="flex flex-col gap-12 w-full">
                  {missions.map((d, i) => (
                    <Mission number={i + 1} title={d.title} desc={d.desc} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Header />
      </div>
    );
}

const missions: Array<MissionData> = [
  {
    title: "Memproduksi Barang Yang Bersaing Tinggi Dan Berkualitas",
  },
  {
    title:
      "Menyediakan Peralatan Dan Bahan-Bahan Yang Dibutuhkan Anggota Untuk Memproduksi Barang",
  },
  {
    title:
      "Menampung Hasil Produksi Anggota Yang Selanjutnya Dilakukan Penyempurnaan Dan Mendistribusikannya",
  },
];

function Mission({ number, title, desc }: MissionData) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-3 sm:gap-4 items-center">
        <div
          className={`
            text-xl sm:text-2xl font-medium rounded-full size-[2.5rem] sm:size-[3rem] bg-primary text-[rgba(0,0,0,60)]
            flex items-center justify-center shrink-0
          `}
        >
          {number}
        </div>
        <h4 className="font-medium text-sm sm:text-base md:text-lg">{title}</h4>
      </div>
      <div className="text-xs sm:text-sm md:text-base pl-[2.5rem] sm:pl-[3rem]">
        {desc}
      </div>
    </div>
  );
}

type MissionData = {
  number?: number;
  title: string;
  desc?: string;
};
