import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import GoatIcon from "../assets/goat.svg?react";
// import { isGoat } from "../models/Goat";
import formatDateString from "../utils/formatDateString";
import { useEffect, useState } from "react";
import GoatService from "../services/GoatService";

export default function GoatDetail() {
  const stateData = useLocation().state?.data;
  const [data, setData] = useState(stateData);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await GoatService.getGoatById(Number(id));
        if (res) setData(res);
        else navigate("/");
      })();
    }
  }, [id, navigate]);

  const handleGoatIconClick = () => {
    navigate("/");
  };

  // Update validation - hanya perlu check id dari params
  if (!id) return <Navigate to="/" replace />;

  return (
    <>
      {data && (
        <div className="flex flex-col items-center h-[100dvh] gap-8">
          <div className="flex items-center justify-center w-full bg-dark-green py-6">
            <GoatIcon
              className="scale-110 cursor-pointer hover:scale-125 transition-transform duration-200"
              onClick={handleGoatIconClick}
            />
          </div>
          <div className="text-center">
            <h3 className="font-bold">Detail Informasi</h3>
            Data Kambing
          </div>
          <div className="flex flex-col px-6 gap-6 w-full pb-16">
            <Info
              section="DETAIL PEMILIK"
              data={
                new Map([
                  ["Kode/Nama Kambing", data.codeName],
                  ["Nama Breeder", resolveUndefinedData(data.breeder)],
                  [
                    "Jenis Kelamin",
                    data.gender === "Male"
                      ? "Jantan"
                      : data.gender === "Female"
                      ? "Betina"
                      : "Undefined",
                  ],
                  ["Warna Ear Tag", resolveUndefinedData(data.earTagColor)],
                  ["Ras/Galur", resolveUndefinedData(data.breedLine)],
                ])
              }
            />
            <Info
              section="INFORMASI KESEHATAN"
              data={
                new Map([
                  [
                    "Kambing Dinyatakan",
                    resolveUndefinedData(data.healthStatus),
                  ],
                  [
                    "Tanggal Vaksinasi",
                    resolveUndefinedData(
                      formatDateString(data.vaccinationDate)
                    ),
                  ],
                  ["Jenis Vaksin", resolveUndefinedData(data.vaccineType)],
                  ["Catatan Kesehatan", resolveUndefinedData(data.healthNotes)],
                ])
              }
            />
            <Info
              section="DATA LENGKAP"
              data={
                new Map([
                  ["Bobot Terkini", resolveUndefinedData(data.currentWeight)],
                  [
                    "Tanggal Timbang Terkini",
                    resolveUndefinedData(formatDateString(data.weightDate)),
                  ],
                  ["Grade", resolveUndefinedData(data.grade)],
                  ["Warna", resolveUndefinedData(data.color)],
                  ["Ras Pejantan", resolveUndefinedData(data.sireBreed)],
                  ["Ras Induk", resolveUndefinedData(data.damBreed)],
                  ["Kelahiran", resolveUndefinedData(data.birthType)],
                  ["Bobot Lahir", resolveUndefinedData(data.birthWeight)],
                  [
                    "Tanggal Lahir",
                    resolveUndefinedData(formatDateString(data.birthDate)),
                  ],
                  [
                    "Tanggal Pelepasan",
                    resolveUndefinedData(formatDateString(data.releaseDate)),
                  ],
                  ["Catatan", resolveUndefinedData(data.salesNotes)],
                ])
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

function Info({
  section,
  data,
}: {
  section: string;
  data: Map<string, string>;
}) {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-xl p-6 shadow-md">
      <span className="font-medium">{section}</span>
      <div className="flex flex-col gap-3">
        {[...data.entries()].map(([k, v]) => (
          <div className="flex jusitfy-between w-full gap-2">
            <div className="flex flex-2/5">
              <span className="flex-4/5">{k}</span>
              <span className="flex-1/5">:</span>
            </div>
            <span className="flex-3/5 text-end">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveUndefinedData(data: any | undefined) {
  return data || "-";
}
