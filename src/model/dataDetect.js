import dataIntro from "./dataIntro";

const dataDetect = dataIntro[2].content.map((data) => ({
  label: data.label,
  name: data.name,
}));

export default dataDetect;
