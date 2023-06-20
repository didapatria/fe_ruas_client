import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Ruas (Ruang Pengawas) Ujian - Client", () => {
  test("Renders Title", () => {
    render(<App />);

    const title = screen.getByText("Ruas (Ruang Pengawas) Ujian - Client");
    expect(title).toBeInTheDocument();
  });
});
