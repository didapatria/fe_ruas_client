import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { fetchData } from "../../slices/dataSlice";
import { updateOrCreate } from "../../slices/postSlice";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import idLocale from "date-fns/locale/id";
import Navbar from "../../components/Navbar";
import Card from "../../components/dashboard/Card";
import ThresholdForm from "../../components/modal/ThresholdForm";
import Filter from "../../components/dashboard/Filter";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.data);
  const [dataCheat, setDataCheat] = useState({});
  const [dataUsers, setDataUsers] = useState({});

  const [thresholdOpen, setThresholdOpen] = useState(false);
  const [threshold, setThreshold] = useState({
    tengok_kiri_kanan: 999,
    lihat_depan: 999,
    lihat_atas: 999,
  });
  const [isSpinning, setIsSpinning] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const cheatData = await dispatch(fetchData("cheat")).unwrap();
        const usersData = await dispatch(fetchData("users")).unwrap();
        let thresholdData = await dispatch(fetchData("threshold")).unwrap();

        setDataCheat(cheatData);
        setDataUsers(usersData);

        // Check if the threshold data exists; if not, use initial values
        if (!thresholdData) {
          thresholdData = {
            tengok_kiri_kanan: 999,
            lihat_depan: 999,
            lihat_atas: 999,
          };
        }
        setThreshold(thresholdData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchDataAsync();
  }, [dispatch]);

  console.log("dataCheat:", dataCheat);

  const dataCheated = dataCheat
    ? Object.values(dataCheat).filter(
        (cheat) =>
          cheat.lihat_atas.count > threshold.lihat_atas ||
          cheat.lihat_depan.count > threshold.lihat_depan ||
          cheat.tengok_kiri_kanan.count > threshold.tengok_kiri_kanan
      )
    : [];
  const dataExaminees = dataCheat;
  const dataInvigilators = dataUsers
    ? Object.values(dataUsers).filter((user) => user.role === "invigilator")
    : [];

  console.log("dataCheated:", dataCheated);

  // Convert object to array and ensure timestamp is valid
  const dataArray = dataCheat
    ? Object.values(dataCheat).map((item) => {
        const getUsers = Object.values(dataUsers).filter(
          (user) => user.userId === item.userId
        );
        const fullName = getUsers[0]?.fullName;
        const validTimestamp = new Date(item.timestamp).getTime() > 0;
        const formattedDate = validTimestamp
          ? format(new Date(item.timestamp), "dd MMMM yyyy", {
              locale: idLocale,
            })
          : "Invalid date";
        const formattedTime = validTimestamp
          ? format(new Date(item.timestamp), "HH:mm 'WIB'", {
              locale: idLocale,
            })
          : "Invalid time";

        let predictCheat = "Normal";

        if (
          item.lihat_atas.count > threshold.lihat_atas ||
          item.lihat_depan.count > threshold.lihat_depan ||
          item.tengok_kiri_kanan.count > threshold.tengok_kiri_kanan
        ) {
          predictCheat = "Menyontek";
        } else {
          predictCheat = "Normal";
        }

        return {
          ...item,
          formattedDate,
          formattedTime,
          predictCheat,
          fullName,
        };
      })
    : [];

  const filteredDataArray = dataArray.filter(
    (item) =>
      item.userId.toLowerCase().includes(filterText.toLowerCase()) ||
      item.fullName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.predictCheat.toLowerCase().includes(filterText.toLowerCase()) ||
      item.formattedDate.toLowerCase().includes(filterText.toLowerCase()) ||
      item.formattedTime.toLowerCase().includes(filterText.toLowerCase())
  );

  const searchFilter = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Filter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: "NRP/NIM",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Nama Lengkap",
      selector: (row) => <div className="truncate">{row.fullName}</div>,
      sortable: true,
    },
    {
      name: "Prediksi",
      selector: (row) =>
        row.predictCheat === "Menyontek" ? (
          <span class="text-red-500">{row.predictCheat}</span>
        ) : (
          row.predictCheat
        ),
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => row.formattedDate,
      sortable: true,
    },
    {
      name: "Waktu",
      selector: (row) => row.formattedTime,
      sortable: true,
    },
    {
      name: "Tengok Kiri-Kanan (Count)",
      selector: (row) => row.tengok_kiri_kanan?.count,
      sortable: true,
    },
    {
      name: "Tengok Kiri-Kanan (Percentage)",
      selector: (row) =>
        `${Number(row.tengok_kiri_kanan?.highest).toFixed(2)}%`,
      sortable: true,
    },
    {
      name: "Lihat Depan (Count)",
      selector: (row) => row.lihat_depan?.count,
      sortable: true,
    },
    {
      name: "Lihat Depan (Percentage)",
      selector: (row) => `${Number(row.lihat_depan?.highest).toFixed(2)}%`,
      sortable: true,
    },
    {
      name: "Lihat Atas (Count)",
      selector: (row) => row.lihat_atas?.count,
      sortable: true,
    },
    {
      name: "Lihat Atas (Percentage)",
      selector: (row) => `${Number(row.lihat_atas?.highest).toFixed(2)}%`,
      sortable: true,
    },
  ];

  const handleThresholdOpen = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setThresholdOpen(true);
    }, 1000);
  };

  const handleThresholdClose = () => {
    setThresholdOpen(false);
  };

  const handleThresholdSave = async (newThreshold) => {
    setThreshold(newThreshold);

    dispatch(
      updateOrCreate({
        path: "threshold",
        data: newThreshold,
      })
    );
  };

  // Convert the 'threshold' object into an array of objects for the DataTable
  const dataThreshold = Object.entries(threshold).map(([key, value]) => ({
    category: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), // Convert snake_case to Title Case
    threshold: value,
  }));

  const columnsThreshold = [
    {
      name: "Kategori Deteksi",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Nilai Batasan",
      selector: (row) => row.threshold,
      sortable: true,
    },
  ];

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <Navbar />
      <div className="p-4 w-full">
        <div className="container mx-auto my-5 space-y-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-8 gap-y-4 pb-10 md:w-full w-1/2">
            <Card
              label="Jumlah peserta ujian yang menyontek"
              value={dataCheated?.length}
              bgColor="md:bg-gradient-to-r bg-gradient-to-b from-red-500 to-blue-300"
            />
            <Card
              label="Jumlah peserta ujian"
              value={dataExaminees ? Object.keys(dataExaminees).length : 0}
              bgColor="md:bg-gradient-to-r bg-gradient-to-b from-blue-500 to-green-300"
            />
            <Card
              label="Jumlah pengawas ujian"
              value={dataInvigilators?.length}
              bgColor="md:bg-gradient-to-r bg-gradient-to-b from-green-500 to-yellow-300"
            />
          </div>

          {/* DataTable */}
          <div className="md:flex md:space-x-8">
            {/* Threshold */}
            <div className="md:w-1/3">
              <div className="relative">
                <DataTable
                  title="Batasan Toleransi"
                  columns={columnsThreshold}
                  data={dataThreshold}
                  defaultSortFieldId={1}
                  defaultSortAsc={false}
                  progressPending={isLoading}
                  highlightOnHover
                  customStyles={{
                    header: {
                      style: {
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        minHeight: "auto",
                      },
                    },
                    rows: {
                      style: {
                        minHeight: "64px",
                      },
                    },
                    headCells: {
                      style: {
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      },
                    },
                    cells: {
                      style: {
                        paddingLeft: "8px",
                        paddingRight: "8px",
                      },
                    },
                  }}
                />
                <button
                  onClick={handleThresholdOpen}
                  className="absolute top-0 right-0 flex items-center justify-center px-4 py-2 bg-yellow-400 text-black text-base font-medium rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 md:space-x-2"
                >
                  <FiSettings
                    className={`text-xl ${isSpinning ? "animate-spin" : ""}`}
                  />
                  <span className="hidden md:block">Pengaturan</span>
                </button>
              </div>
            </div>

            {/* Data Deteksi */}
            <div className="flex-1 overflow-x-hidden">
              <div className="relative">
                {data && (
                  <DataTable
                    title="Data Deteksi"
                    columns={columns}
                    data={filteredDataArray}
                    defaultSortFieldId={1}
                    progressPending={isLoading}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle}
                    highlightOnHover
                    customStyles={{
                      header: {
                        style: {
                          paddingLeft: "8px",
                          paddingRight: "8px",
                          minHeight: "auto",
                        },
                      },
                      rows: {
                        style: {
                          minHeight: "64px",
                        },
                      },
                      headCells: {
                        style: {
                          paddingLeft: "8px",
                          paddingRight: "8px",
                        },
                      },
                      cells: {
                        style: {
                          paddingLeft: "8px",
                          paddingRight: "8px",
                        },
                      },
                    }}
                  />
                )}
                <div className="absolute top-0 right-0">{searchFilter}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThresholdForm
        isOpen={thresholdOpen}
        onClose={handleThresholdClose}
        onSave={handleThresholdSave}
        data={threshold}
      />
    </div>
  );
}
